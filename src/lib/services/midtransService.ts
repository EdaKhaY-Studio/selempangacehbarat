import crypto from "crypto";

export interface CreateSnapTransactionParams {
  orderId: string; // Unique Midtrans Order ID
  grossAmount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  itemDescription: string;
}

export interface SnapTransactionResult {
  token: string;
  redirectUrl: string;
}

export class MidtransService {
  private static isProduction(): boolean {
    return (
      process.env.IS_PRODUCTION === "true" ||
      process.env.MIDTRANS_IS_PRODUCTION === "true"
    );
  }

  private static getServerKey(): string {
    return (
      process.env.MIDTRANS_SERVER_KEY ||
      process.env.MIDTRANS_SERVER_KEY_SANDBOX ||
      ""
    );
  }

  public static isConfigured(): boolean {
    return this.getServerKey().length > 0;
  }

  private static getSnapBaseUrl(): string {
    return this.isProduction()
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";
  }

  /**
   * Creates a Snap transaction token for an exact amount (DP or Settlement)
   */
  public static async createSnapTransaction(
    params: CreateSnapTransactionParams
  ): Promise<SnapTransactionResult | null> {
    const serverKey = this.getServerKey();
    if (!serverKey) {
      console.warn("[Midtrans] Server Key belum dikonfigurasi di environment variables.");
      return null;
    }

    const authHeader = "Basic " + Buffer.from(serverKey + ":").toString("base64");

    const payload = {
      transaction_details: {
        order_id: params.orderId,
        gross_amount: Math.round(params.grossAmount),
      },
      customer_details: {
        first_name: params.customerName.slice(0, 50),
        phone: params.customerPhone.slice(0, 20),
        email: params.customerEmail ? params.customerEmail.slice(0, 50) : undefined,
      },
      item_details: [
        {
          id: params.orderId.slice(0, 50),
          price: Math.round(params.grossAmount),
          quantity: 1,
          name: params.itemDescription.slice(0, 50),
        },
      ],
      callbacks: {
        finish: `https://selempangacehbarat.com/pesanan/${encodeURIComponent(params.orderId)}`,
      },
    };

    try {
      const res = await fetch(this.getSnapBaseUrl(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`[Midtrans] Create Snap error ${res.status}:`, errText);
        return null;
      }

      const data = await res.json();
      return {
        token: data.token,
        redirectUrl: data.redirect_url,
      };
    } catch (err) {
      console.error("[Midtrans] Network exception creating Snap transaction:", err);
      return null;
    }
  }

  /**
   * Validates Midtrans webhook notification signature
   */
  public static verifyNotificationSignature(
    orderId: string,
    statusCode: string,
    grossAmount: string,
    signatureKey: string
  ): boolean {
    const serverKey = this.getServerKey();
    if (!serverKey) return false;

    const signatureString = `${orderId}${statusCode}${grossAmount}${serverKey}`;
    const calculated = crypto
      .createHash("sha512")
      .update(signatureString)
      .digest("hex");

    return calculated.toLowerCase() === signatureKey.toLowerCase();
  }
}
