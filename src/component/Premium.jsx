import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PremiumShimmer from "./ShimmerUi/PremiumShimmer";

const plans = [
  {
    name: "Silver",
    tag: "Popular",
    price: "₹500",
    period: "/month",
    description: "Unlock more reach and real conversations.",
    highlights: [
      { text: "100 profiles/day", icon: "👥" },
      { text: "Blue verified tick", icon: "✓" },
      { text: "Chat feature enabled", icon: "💬" },
      { text: "Priority in discovery", icon: "🔍" },
    ],
    gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
    borderGlow: "hover:shadow-blue-500/20",
    tickColor: "text-blue-500",
    buttonStyle: "btn-primary",
    spotlight: true,
  },
  {
    name: "Gold",
    tag: "Best Value",
    price: "₹1000",
    period: "/month",
    description: "Maximum visibility and premium presence.",
    highlights: [
      { text: "200 profiles/day", icon: "👥" },
      { text: "Gold verified tick", icon: "✓" },
      { text: "Chat feature enabled", icon: "💬" },
      { text: "Top-tier discovery", icon: "🚀" },
    ],
    gradient: "from-amber-500/10 via-yellow-400/5 to-transparent",
    borderGlow: "hover:shadow-amber-500/20",
    tickColor: "text-amber-500",
    buttonStyle: "btn-warning",
    spotlight: false,
  },
];

const Premium = () => {
  const navigate = useNavigate();
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePlanUpgrade = async (planName) => {
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
        handler: verifyPremiumUser,
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(false);

  if (isVerifying) {
    return <PremiumShimmer />;
  }

  return isUserPremium ? (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-primary/5 to-secondary/10 px-6 py-16 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-lg">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-lg shadow-primary/30 animate-pulse">
            <span className="text-4xl">👑</span>
          </div>
        </div>
        <div className="space-y-2">
          <span className="badge badge-primary badge-lg px-4 py-3 font-semibold">
            Premium Member
          </span>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            You're All Set!
          </h1>
          <p className="text-base-content/70 text-lg">
            Enjoy unlimited access to all premium features. Thank you for being
            part of CodersHub!
          </p>
        </div>
        <div className="flex gap-3 justify-center pt-4">
          <button
            className="btn btn-primary btn-lg gap-2"
            onClick={() => navigate("/")}
          >
            <span>🏠</span> Go to Feed
          </button>
          <button
            className="btn btn-outline btn-lg gap-2"
            onClick={() => navigate("/connections")}
          >
            <span>🤝</span> My Connections
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 px-4 sm:px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            <span className="animate-pulse">✨</span>
            CodersHub Premium
            <span className="animate-pulse">✨</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Supercharge Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Developer Network
            </span>
          </h1>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            Connect faster, get noticed, and build meaningful collaborations
            with fellow developers.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative group card bg-gradient-to-br ${plan.gradient} bg-base-100 border border-base-200 shadow-xl ${plan.borderGlow} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
            >
              {/* Spotlight badge */}
              {plan.spotlight && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-primary text-primary-content text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-lg">
                    RECOMMENDED
                  </div>
                </div>
              )}

              <div className="card-body p-6 sm:p-8 space-y-6">
                {/* Plan header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      {plan.name}
                    </h2>
                    <span className={`text-2xl ${plan.tickColor}`}>✓</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold">
                      {plan.price}
                    </span>
                    <span className="text-base-content/50 text-lg">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-base-content/60">{plan.description}</p>
                </div>

                {/* Divider */}
                <div className="divider my-2"></div>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.highlights.map((item) => (
                    <li key={item.text} className="flex items-center gap-3">
                      <span className="text-xl w-8 h-8 flex items-center justify-center bg-base-200 rounded-lg">
                        {item.icon}
                      </span>
                      <span className="text-base-content/80">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-4">
                  <button
                    className={`btn ${plan.buttonStyle} btn-lg w-full gap-2 group-hover:scale-[1.02] transition-transform`}
                    onClick={() => {
                      setLoading(true);
                      handlePlanUpgrade(plan.name).finally(() =>
                        setLoading(false)
                      );
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <span>🚀</span> Upgrade to {plan.name}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust section */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-base-content/50 text-sm">
            Secure payments powered by Razorpay
          </p>
          <div className="flex items-center justify-center gap-6 text-base-content/30">
            <span className="flex items-center gap-1 text-sm">
              🔒 SSL Encrypted
            </span>
            <span className="flex items-center gap-1 text-sm">
              💳 Safe Checkout
            </span>
            <span className="flex items-center gap-1 text-sm">
              ↩️ Easy Refunds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
