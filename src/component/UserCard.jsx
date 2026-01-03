const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, skills, about } = user;
  return (
    <div className="card w-96 h-[550px] bg-base-100 shadow-2xl rounded-3xl overflow-hidden relative group">
      <figure className="absolute inset-0">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </figure>

      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold">
              {firstName}
              {lastName && ` ${lastName}`}
            </h2>
            {age && <span className="text-2xl font-light">{age}</span>}
          </div>

          {gender && (
            <div className="flex items-center gap-2 text-white/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm">{gender}</span>
            </div>
          )}

          {about && (
            <p className="text-sm text-white/90 line-clamp-2">{about}</p>
          )}

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-primary badge-sm px-3 py-2 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="badge badge-ghost badge-sm px-3 py-2 text-xs bg-white/20 text-white border-none">
                  +{skills.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-6 mt-6">
          <button className="btn btn-circle bg-gray-800/80 border-none hover:scale-110 transition-all duration-300 h-14 w-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button className="btn btn-circle bg-gray-800/80 border-none hover:scale-110 transition-all duration-300 h-14 w-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
