import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests === null || requests?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-base-content mb-2">
          No Pending Requests
        </h2>
        <p className="text-base-content/60 text-center max-w-md">
          When developers want to connect with you, their requests will appear
          here!
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Connection Requests
        </h1>
        <p className="text-base-content/60">
          {requests.length} developer{requests.length !== 1 ? "s" : ""} want to connect with you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request, index) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            about,
            age,
            gender,
            skills,
          } = request.fromUserId;
          return (
            <div
              key={_id || index}
              className="group relative bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-base-300 hover:border-primary/50"
            >

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
              
              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-base-200 group-hover:ring-primary/30 transition-all duration-300">
                      <img
                        src={photoUrl || "https://via.placeholder.com/96"}
                        alt={firstName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center ring-2 ring-base-100">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-base-content">
                    {firstName} {lastName}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1">
                    {age && (
                      <span className="text-xs text-base-content/50">{age} years</span>
                    )}
                    {age && gender && <span className="text-base-content/30">•</span>}
                    {gender && (
                      <span className="text-xs text-base-content/50 capitalize">{gender}</span>
                    )}
                  </div>
                </div>

                {about && (
                  <p className="text-sm text-base-content/60 text-center line-clamp-2 mb-4">
                    {about}
                  </p>
                )}

                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                    {skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {skills.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-base-200 text-base-content/60">
                        +{skills.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="flex-1 btn btn-sm btn-primary gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accept
                  </button>
                  <button className="flex-1 btn btn-sm bg-base-200 hover:bg-error hover:text-white border-0 gap-1 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
                        