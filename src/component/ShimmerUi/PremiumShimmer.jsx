const PremiumShimmer = () => (
  <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 px-4 sm:px-6 py-12">
    <div className="mx-auto max-w-5xl animate-pulse">
      {/* Header shimmer */}
      <div className="text-center space-y-4 mb-12">
        <div className="h-8 w-40 bg-base-300 rounded-full mx-auto"></div>
        <div className="h-12 w-96 max-w-full bg-base-300 rounded-lg mx-auto"></div>
        <div className="h-6 w-80 max-w-full bg-base-300 rounded-lg mx-auto"></div>
      </div>

      {/* Cards shimmer */}
      <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
        {[1, 2].map((i) => (
          <div key={i} className="card bg-base-100 border border-base-200 shadow-xl">
            <div className="card-body p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <div className="h-8 w-32 bg-base-300 rounded-lg"></div>
                <div className="h-12 w-24 bg-base-300 rounded-lg"></div>
                <div className="h-4 w-full bg-base-300 rounded-lg"></div>
              </div>
              <div className="divider my-2"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-base-300 rounded-lg"></div>
                    <div className="h-4 w-32 bg-base-300 rounded-lg"></div>
                  </div>
                ))}
              </div>
              <div className="h-12 w-full bg-base-300 rounded-lg mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PremiumShimmer;
