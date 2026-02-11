const HomeShimmer = () => {
  return (
    <div className="min-h-screen flex flex-col animate-pulse">
      <div className="navbar bg-neutral shadow-sm px-4">
        <div className="flex-1">
          <div className="h-10 w-40 bg-base-300/70 rounded-lg"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-36 bg-base-300/70 rounded-full hidden md:block"></div>
          <div className="h-10 w-10 bg-base-300/70 rounded-full"></div>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center bg-base-200 px-4">
        <div className="card w-96 h-[550px] bg-base-100 shadow-2xl rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-base-300/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          <div className="relative h-full flex flex-col justify-end p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-40 bg-base-100/40 rounded-lg"></div>
              <div className="h-8 w-10 bg-base-100/40 rounded-lg"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-base-100/40 rounded-lg"></div>
              <div className="h-4 w-3/4 bg-base-100/40 rounded-lg"></div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-7 w-16 bg-base-100/40 rounded-full"
                ></div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-6 pt-4">
              <div className="h-14 w-14 bg-base-100/40 rounded-full"></div>
              <div className="h-14 w-14 bg-base-100/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer footer-center bg-base-300 text-base-content p-6">
        <div className="h-4 w-64 bg-base-200/80 rounded"></div>
      </footer>
    </div>
  );
};

export default HomeShimmer;
