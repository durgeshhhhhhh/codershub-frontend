import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections === null || connections?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-base-content/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-base-content mb-2">
          No Connections Yet
        </h2>
        <p className="text-base-content/60 text-center max-w-md">
          Start connecting with other developers to grow your network and collaborate on projects!
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-base-content">Connections</h1>
          <p className="text-base-content/60 text-sm">
            {connections.length} developer{connections.length !== 1 ? "s" : ""} in your network
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {connections.map((connection, index) => {
          const { _id, firstName, lastName, photoUrl, about, age, gender, skills } =
            connection;
          return (
            <div
              key={_id || index}
              className="card card-side bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300"
            >
              <figure className="pl-6 py-6">
                <div className="avatar">
                  <div className="w-24 h-24 rounded-xl ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                    <img
                      src={photoUrl || "https://via.placeholder.com/96"}
                      alt={firstName}
                      className="object-cover"
                    />
                  </div>
                </div>
              </figure>

              <div className="card-body py-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="card-title text-lg">
                    {firstName} {lastName}
                  </h2>
                  {age && (
                    <span className="badge badge-ghost badge-sm">{age} yrs</span>
                  )}
                  {gender && (
                    <span className="badge badge-outline badge-sm capitalize">
                      {gender}
                    </span>
                  )}
                </div>

                {about && (
                  <p className="text-base-content/70 text-sm line-clamp-2">
                    {about}
                  </p>
                )}

                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="badge badge-primary badge-sm px-2 py-2"
                      >
                        {skill}
                      </span>
                    ))}
                    {skills.length > 4 && (
                      <span className="badge badge-ghost badge-sm px-2 py-2">
                        +{skills.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
