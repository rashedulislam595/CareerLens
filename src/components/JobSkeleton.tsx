export default function JobSkeleton() {
  return (
    <div className="glass-card flex flex-col h-full border border-white/5 animate-pulse overflow-hidden">
      {/* Skeleton Media Image */}
      <div className="h-44 w-full bg-slate-800" />

      {/* Info Container */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Company & Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded-md" />
            <div className="w-20 h-4 bg-slate-800 rounded" />
          </div>
          <div className="w-10 h-4 bg-slate-800 rounded" />
        </div>

        {/* Title */}
        <div className="w-3/4 h-5 bg-slate-800 rounded mb-2" />

        {/* Short Description */}
        <div className="w-full h-4 bg-slate-800 rounded mb-2" />
        <div className="w-5/6 h-4 bg-slate-800 rounded mb-4" />

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-y-3 pt-4 border-t border-white/5 mb-5">
          <div className="w-20 h-3 bg-slate-800 rounded" />
          <div className="w-24 h-3 bg-slate-800 rounded justify-self-end" />
          <div className="w-16 h-3 bg-slate-800 rounded" />
          <div className="w-12 h-3 bg-slate-800 rounded justify-self-end" />
        </div>

        {/* Button */}
        <div className="w-full h-10 bg-slate-800 rounded-xl mt-auto" />
      </div>
    </div>
  );
}
