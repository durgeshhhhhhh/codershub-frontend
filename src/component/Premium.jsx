import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
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
    currentBadgeStyle: "badge-info",
    tier: 1,
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
    currentBadgeStyle: "badge-warning",
    tier: 2,
  },
];

const getTierByName = (name) => {
  const plan = plans.find((p) => p.name === name);
  return plan ? plan.tier : 0;
};

const Premium = () => {
  const [membershipType, setMembershipType] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [loading, setLoading] = useState(false);

  const currentTier = getTierByName(membershipType);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium && res.data.membershipType) {
        setMembershipType(res.data.membershipType);
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
        description: `Upgrade to ${planName}`,
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

  if (isVerifying) {
    return <PremiumShimmer />;
  }

  const getButtonState = (plan) => {
    const isCurrentPlan = membershipType === plan.name;
    const isLowerTier = plan.tier < currentTier;
    const isHigherTier = plan.tier > currentTier;

    if (isCurrentPlan) {
      return {
        text: "Current Plan",
        disabled: true,
        style: "btn-disabled bg-base-300",
      };
    }
    if (isLowerTier) {
      return {
        text: "Included in your plan",
        disabled: true,
        style: "btn-disabled btn-ghost",
      };
    }
    if (isHigherTier && membershipType) {
      return {
        text: `Upgrade to ${plan.name}`,
        disabled: false,
        style: plan.buttonStyle,
      };
    }
    return {
      text: `Get ${plan.name}`,
      disabled: false,
      style: plan.buttonStyle,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 px-4 sm:px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            <span className="animate-pulse">✨</span>
            CodersHub Premium
            <span className="animate-pulse">✨</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {membershipType ? (
              <>
                Manage Your{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Subscription
                </span>
              </>
            ) : (
              <>
                Supercharge Your{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Developer Network
                </span>
              </>
            )}
          </h1>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            {membershipType
              ? `You're currently on the ${membershipType} plan. Upgrade anytime to unlock more features.`
              : "Connect faster, get noticed, and build meaningful collaborations with fellow developers."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan) => {
            const isCurrentPlan = membershipType === plan.name;
            const buttonState = getButtonState(plan);

            return (
              <div
                key={plan.name}
                className={`relative group card bg-gradient-to-br ${
                  plan.gradient
                } bg-base-100 border-2 shadow-xl ${
                  plan.borderGlow
                } hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  isCurrentPlan
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-base-200"
                }`}
              >
                {isCurrentPlan && (
                  <div className="absolute -top-1 -right-1">
                    <div
                      className={`${plan.currentBadgeStyle} badge text-xs font-bold px-3 py-3 rounded-bl-lg rounded-tr-lg shadow-lg`}
                    >
                      CURRENT PLAN
                    </div>
                  </div>
                )}

                <div className="card-body p-6 sm:p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl sm:text-3xl font-bold">
                        {plan.name}
                      </h2>
                      <span className={`text-2xl ${plan.tickColor}`}>✓</span>
                      {isCurrentPlan && (
                        <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full font-medium">
                          Active
                        </span>
                      )}
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

                  <div className="divider my-2"></div>

                  <ul className="space-y-4">
                    {plan.highlights.map((item) => (
                      <li key={item.text} className="flex items-center gap-3">
                        <span className="text-xl w-8 h-8 flex items-center justify-center bg-base-200 rounded-lg">
                          {item.icon}
                        </span>
                        <span className="text-base-content/80">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <button
                      className={`btn ${
                        buttonState.style
                      } btn-lg w-full gap-2 transition-transform ${
                        !buttonState.disabled ? "group-hover:scale-[1.02]" : ""
                      }`}
                      onClick={() => {
                        if (!buttonState.disabled) {
                          setLoading(true);
                          handlePlanUpgrade(plan.name).finally(() =>
                            setLoading(false)
                          );
                        }
                      }}
                      disabled={buttonState.disabled || loading}
                    >
                      {loading && !buttonState.disabled ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <>
                          {!buttonState.disabled && <span>🚀</span>}
                          {buttonState.text}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
