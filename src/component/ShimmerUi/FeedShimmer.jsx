const FeedShimmer = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="card w-96 h-[550px] bg-base-200 shadow-2xl rounded-3xl overflow-hidden relative animate-pulse">
        <div className="absolute inset-0 bg-base-300"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="relative h-full flex flex-col justify-end p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-40 bg-base-100/30 rounded-lg"></div>
              <div className="h-8 w-10 bg-base-100/30 rounded-lg"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-base-100/30 rounded"></div>
              <div className="h-4 w-16 bg-base-100/30 rounded-lg"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full bg-base-100/30 rounded-lg"></div>
              <div className="h-4 w-3/4 bg-base-100/30 rounded-lg"></div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-7 w-16 bg-base-100/30 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 mt-6">
            <div className="h-14 w-14 bg-base-100/30 rounded-full"></div>
            <div className="h-14 w-14 bg-base-100/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedShimmer;
