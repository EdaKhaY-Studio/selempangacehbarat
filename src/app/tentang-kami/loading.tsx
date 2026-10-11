export default function TentangKamiLoading() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#0f172a] animate-pulse">
      {/* 1. Header Navigation Skeleton Bar */}
      <div className="h-14 sm:h-16 w-full bg-white/90 border-b border-[#cbd5e1]/60 px-4 sm:px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200" />
          <div className="h-4 w-36 sm:w-48 bg-slate-200 rounded" />
        </div>
        <div className="hidden xl:flex items-center gap-6">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-3 w-24 bg-slate-200 rounded" />
          <div className="h-3 w-20 bg-slate-200 rounded" />
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-3 w-14 bg-slate-200 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-28 bg-slate-200 rounded-lg hidden sm:block" />
          <div className="w-8 h-8 rounded-full bg-slate-200" />
        </div>
      </div>

      {/* 2. Breadcrumb Skeleton Bar */}
      <div className="pt-20 sm:pt-24 bg-white border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-12 bg-slate-200 rounded" />
            <div className="h-3 w-3 bg-slate-200 rounded" />
            <div className="h-3 w-20 bg-slate-200 rounded" />
          </div>
          <div className="h-4 w-40 bg-amber-100 rounded-full hidden sm:block" />
        </div>
      </div>

      {/* 3. Hero Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="h-4 w-28 bg-amber-200/60 rounded mx-auto mb-3" />
          <div className="h-8 sm:h-10 w-3/4 bg-slate-200 rounded mx-auto mb-4" />
          <div className="h-4 w-full bg-slate-100 rounded mb-2" />
          <div className="h-4 w-5/6 bg-slate-100 rounded mx-auto" />
        </div>

        {/* 4. Stat Counter Skeleton Row */}
        <div className="grid grid-cols-3 divide-x divide-neutral-200 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 mb-14 max-w-4xl mx-auto">
          <div className="px-4 py-2 text-center">
            <div className="h-7 w-16 bg-slate-200 rounded mx-auto mb-2" />
            <div className="h-3 w-28 bg-slate-200 rounded mx-auto" />
          </div>
          <div className="px-4 py-2 text-center">
            <div className="h-7 w-12 bg-slate-200 rounded mx-auto mb-2" />
            <div className="h-3 w-28 bg-slate-200 rounded mx-auto" />
          </div>
          <div className="px-4 py-2 text-center">
            <div className="h-7 w-14 bg-amber-200 rounded mx-auto mb-2" />
            <div className="h-3 w-28 bg-slate-200 rounded mx-auto" />
          </div>
        </div>

        {/* 5. 6 Pillar Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#cbd5e1]/60 p-6 shadow-2xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100/70" />
              <div className="h-5 w-3/4 bg-slate-200 rounded" />
              <div className="space-y-1.5 pt-1">
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-5/6 bg-slate-100 rounded" />
                <div className="h-3 w-4/6 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
