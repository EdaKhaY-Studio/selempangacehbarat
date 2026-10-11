export default function ProdukLoading() {
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
            <div className="h-3 w-24 bg-slate-200 rounded" />
          </div>
          <div className="h-4 w-36 bg-amber-100 rounded-full hidden sm:block" />
        </div>
      </div>

      {/* 3. Catalog Hero Banner Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="h-4 w-32 bg-amber-200/70 rounded mb-3" />
        <div className="h-8 sm:h-10 w-2/3 bg-slate-200 rounded mb-4" />
        <div className="h-4 w-full max-w-2xl bg-slate-100 rounded mb-2" />
        <div className="h-4 w-4/5 max-w-2xl bg-slate-100 rounded mb-6" />

        {/* Filter Bar Skeleton */}
        <div className="bg-white rounded-2xl border border-[#cbd5e1]/60 p-4 sm:p-6 mb-8 flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <div className="h-9 w-28 bg-slate-200 rounded-xl" />
            <div className="h-9 w-32 bg-slate-100 rounded-xl" />
            <div className="h-9 w-32 bg-slate-100 rounded-xl" />
          </div>
          <div className="h-9 w-64 bg-slate-100 rounded-xl" />
        </div>

        {/* 6 Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#cbd5e1]/60 overflow-hidden space-y-4"
            >
              <div className="aspect-[4/3] w-full bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-slate-200 rounded" />
                <div className="h-5 w-3/4 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-2/3 bg-slate-100 rounded" />
                <div className="h-10 w-full bg-slate-200 rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
