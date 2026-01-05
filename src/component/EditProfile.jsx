import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill) && skills.length < 10) {
      setSkills([...skills, trimmedSkill]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(
        error?.response?.data || "Something went wrong. Please try again."
      );
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="flex justify-center py-6 px-4 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full max-w-6xl">
        <div className="card bg-base-100 w-full lg:flex-1 max-w-2xl shadow-2xl border border-base-300 max-h-[80vh] overflow-hidden">
          <div className="card-body overflow-y-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="avatar">
                <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={photoUrl || "https://via.placeholder.com/80"}
                    alt="Profile"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <p className="text-base-content/60 text-sm">
                  Update your information
                </p>
              </div>
            </div>

            {error && (
              <div className="toast toast-top toast-center z-50">
                <div className="alert alert-error shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{error}</span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    onClick={() => setError("")}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {success && (
              <div className="toast toast-top toast-center z-50">
                <div className="alert alert-success shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Profile updated successfully!</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="input input-bordered focus:input-primary transition-all"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="input input-bordered focus:input-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Age</span>
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="input input-bordered focus:input-primary transition-all"
                    min="18"
                    max="100"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Gender</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered focus:select-primary transition-all"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                  className="input input-bordered w-full focus:input-primary transition-all"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/50">
                    Enter a valid image URL
                  </span>
                </label>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">About</span>
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell others about yourself, your skills, what you're looking to build..."
                  className="textarea textarea-bordered w-full focus:textarea-primary transition-all h-28 resize-none"
                  maxLength={300}
                />
                <label className="label justify-end">
                  <span className="label-text-alt text-base-content/50">
                    {about.length}/300 characters
                  </span>
                </label>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Skills</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)}
                    placeholder="Type a skill and press Enter"
                    className="input input-bordered flex-1 focus:input-primary transition-all"
                    maxLength={30}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="btn btn-primary btn-square"
                    disabled={!skillInput.trim() || skills.length >= 10}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="badge badge-primary gap-1 px-3 py-3 text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-error transition-colors"
                        >
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <label className="label">
                  <span className="label-text-alt text-base-content/50">
                    {skills.length}/10 skills (press Enter or click + to add)
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full text-base font-semibold shadow-lg hover:shadow-primary/25 hover:scale-[1.01] transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center self-stretch py-10">
          <div className="w-px flex-1 border-l-2 border-dashed border-primary/40 relative overflow-hidden">
            <div
              className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse"
              style={{
                animation: "moveGradient 2s ease-in-out infinite",
              }}
            ></div>
          </div>
          <style>{`
            @keyframes moveGradient {
              0%, 100% { transform: translateY(-100%); opacity: 0.3; }
              50% { transform: translateY(100%); opacity: 0.8; }
            }
          `}</style>
        </div>

        <div className="w-full lg:w-auto flex flex-col items-center gap-4 sticky top-10">
          <h3 className="text-lg font-semibold text-base-content/80">
            Live Preview
          </h3>
          <UserCard
            user={{
              firstName: firstName || "Your Name",
              lastName,
              age: age || null,
              gender,
              photoUrl:
                photoUrl ||
                "https://via.placeholder.com/400x550?text=Add+Photo",
              about,
              skills,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
