export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#0f172a] animate-pulse">
      {/* 1. Header Navigation Skeleton Bar */}
      <div className="h-14 sm:h-16 w-full bg-white/90 border-b border-[#cbd5e1]/60 px-4 sm:px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200" />
          <div className="h-4 w-40 bg-slate-200 rounded" />
        </div>
        <div className="hidden xl:flex items-center gap-6">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-3 w-20 bg-slate-200 rounded" />
          <div className="h-3 w-24 bg-slate-200 rounded" />
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-3 w-14 bg-slate-200 rounded" />
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200" />
      </div>

      {/* 2. Breadcrumb Bar */}
      <div className="pt-20 sm:pt-24 bg-white border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-12 bg-slate-200 rounded" />
            <div className="h-3 w-3 bg-slate-200 rounded" />
            <div className="h-3 w-28 bg-slate-200 rounded" />
          </div>
          <div className="h-4 w-36 bg-amber-100 rounded-full hidden sm:block" />
        </div>
      </div>

      {/* 3. Section Header Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="h-4 w-36 bg-amber-200/70 rounded mx-auto" />
          <div className="h-8 sm:h-10 w-3/4 bg-slate-200 rounded mx-auto" />
          <div className="h-4 w-full bg-slate-100 rounded" />
        </div>

        {/* 4. Article Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#cbd5e1]/60 overflow-hidden space-y-4 shadow-xs"
            >
              <div className="aspect-[16/9] w-full bg-slate-200" />
              <div className="p-6 space-y-3">
                <div className="flex gap-4">
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                </div>
                <div className="h-6 w-5/6 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-4/5 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
