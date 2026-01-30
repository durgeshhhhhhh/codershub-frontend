import axios from "axios";
import { BASE_URL } from "../utils/constant";
// import { useNavigate } from "react-router";

const plans = [
  // {
  //   name: "Standard",
  //   tag: "Free",
  //   description: "Get started and discover developers.",
  //   highlights: [
  //     "Send requests to other developers",
  //     "No chat access",
  //     "No premium tick",
  //     "See up to 25 users/day",
  //   ],
  //   accent: "bg-base-100",
  //   tickBadge: "badge-ghost",
  //   buttonStyle: "btn-outline",
  //   spotlight: false,
  // },
  {
    name: "Silver",
    tag: "Popular",
    description: "Unlock more reach and real conversations.",
    highlights: [
      "4x users/day",
      "Blue tick",
      "Chat feature enabled",
      "Priority discovery",
    ],
    accent: "bg-base-100",
    tickBadge: "badge-info",
    buttonStyle: "btn-primary",
    spotlight: true,
  },
  {
    name: "Gold",
    tag: "Best Value",
    description: "Maximum visibility and premium presence.",
    highlights: [
      "8x users/day",
      "Gold tick",
      "Chat feature enabled",
      "Top-tier discovery",
    ],
    accent: "bg-base-100",
    tickBadge: "badge-warning",
    buttonStyle: "btn-warning",
    spotlight: false,
  },
];

const Premium = () => {
  // const navigate = useNavigate();

  const handlePlanUpgrade = async (planName) => {
    // if (planName === "Standard") {
    //   return navigate("/");
    // }

    try {
      const res = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: planName,
        },
        { withCredentials: true }
      );

      const { amount, currency, notes, orderId } = res?.data?.data;
      const keyId = res?.data?.keyId;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "CodersHub",
        description: "Upgrade to premium",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
          contact: "9999999999",
        },
        theme: {
          color: "#667eea",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 via-base-100 to-base-200 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center space-y-3">
          <div className="badge badge-outline badge-primary px-4 py-3 text-xs font-semibold tracking-wide">
            CodersHub Premium
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Choose the plan that matches your growth
          </h1>
          <p className="text-base-content/70">
            Connect faster, get noticed, and build meaningful collaborations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card ${
                plan.accent
              } shadow-xl border border-base-200 transition-transform duration-300 hover:-translate-y-1 ${
                plan.spotlight ? "ring-2 ring-primary/60" : ""
              }`}
            >
              <div className="card-body space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="card-title text-2xl font-bold">{plan.name}</h2>
                  <div className="badge badge-outline">{plan.tag}</div>
                </div>

                <p className="text-sm text-base-content/70">
                  {plan.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className={`badge ${plan.tickBadge}`}>
                    Premium Tick
                  </span>
                  {plan.name !== "Standard" && (
                    <span className="text-xs text-base-content/60">
                      Verified badge included
                    </span>
                  )}
                </div>

                <ul className="space-y-2 text-sm text-base-content/80">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary font-semibold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="card-actions pt-2">
                  <button
                    className={`btn ${plan.buttonStyle} w-full`}
                    onClick={() => handlePlanUpgrade(plan.name)}
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Premium;
