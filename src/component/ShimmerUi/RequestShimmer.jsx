const RequestShimmer = () => {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto animate-pulse">
      <div className="text-center mb-10">
        <div className="h-9 w-64 bg-base-300 rounded-lg mx-auto mb-2"></div>
        <div className="h-5 w-48 bg-base-300 rounded-lg mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-base-100 rounded-2xl overflow-hidden shadow-lg border border-base-300"
          >
            <div className="h-1 bg-base-300"></div>

            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-base-300"></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-base-300 rounded-full"></div>
                </div>

                <div className="h-6 w-32 bg-base-300 rounded-lg mb-2"></div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-16 bg-base-300 rounded-lg"></div>
                  <div className="h-4 w-16 bg-base-300 rounded-lg"></div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-base-300 rounded-lg"></div>
                <div className="h-4 w-3/4 bg-base-300 rounded-lg mx-auto"></div>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="h-6 w-16 bg-base-300 rounded-full"
                  ></div>
                ))}
              </div>

              <div className="flex gap-3">
                <div className="flex-1 h-8 bg-base-300 rounded-lg"></div>
                <div className="flex-1 h-8 bg-base-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestShimmer;
