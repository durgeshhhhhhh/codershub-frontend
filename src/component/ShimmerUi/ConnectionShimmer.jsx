const ConnectionShimmer = () => {
  return (
    <div className="py-8 px-4 max-w-4xl mx-auto animate-pulse">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-base-300"></div>
        <div className="space-y-2">
          <div className="h-6 w-32 bg-base-300 rounded-lg"></div>
          <div className="h-4 w-48 bg-base-300 rounded-lg"></div>
        </div>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="card card-side bg-base-100 shadow-lg border border-base-300"
          >
            <figure className="pl-6 py-6">
              <div className="w-24 h-24 rounded-xl bg-base-300"></div>
            </figure>

            <div className="card-body py-6 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-36 bg-base-300 rounded-lg"></div>
                <div className="h-5 w-14 bg-base-300 rounded-full"></div>
                <div className="h-5 w-16 bg-base-300 rounded-full"></div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full bg-base-300 rounded-lg"></div>
                <div className="h-4 w-3/4 bg-base-300 rounded-lg"></div>
              </div>

              <div className="flex gap-1.5 mt-1">
                {[1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className="h-6 w-16 bg-base-300 rounded-full"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionShimmer;
