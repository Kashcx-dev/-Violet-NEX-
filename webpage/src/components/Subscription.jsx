import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import goldfishContext from "../Context/goldFishContext";

function Subscription() {
	const { user, upgradeSubscription } = useContext(goldfishContext);
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);

	const handleUpgrade = async (tier) => {
		setIsProcessing(true);
		try {
			const result = await upgradeSubscription(tier);
			if (result.success) {
				navigate("/");
			} else {
				alert(result.error || "Failed to upgrade subscription");
			}
		} catch (error) {
			alert("An unexpected error occurred.");
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#09090b] text-[#f4f4f5] p-6 selection:bg-white selection:text-black">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<button 
						onClick={() => navigate("/")}
						className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<line x1="19" y1="12" x2="5" y2="12"></line>
							<polyline points="12 19 5 12 12 5"></polyline>
						</svg>
						Back to Dashboard
					</button>
					<div className="text-right">
						<p className="text-sm font-medium text-amber-400">Current Balance</p>
						<p className="text-2xl font-bold text-white">{Math.max(user?.token_count ?? 0, 0).toLocaleString()} Tokens</p>
					</div>
				</div>

				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
					<p className="text-zinc-400 max-w-xl mx-auto">
						Upgrade your token quota to unlock more capabilities and keep the GoldFish assistant running at full power.
					</p>
				</div>

				{/* Pricing Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					
					{/* Free Tier */}
					<div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-8 flex flex-col relative opacity-80">
						<div className="mb-8">
							<h3 className="text-xl font-semibold text-white mb-2">Free Starter</h3>
							<p className="text-zinc-500 text-sm h-10">Standard features for casual users.</p>
							<div className="mt-6 flex items-baseline gap-2">
								<span className="text-4xl font-bold text-white">$0</span>
								<span className="text-zinc-500">/ forever</span>
							</div>
						</div>
						<ul className="space-y-4 mb-8 flex-1">
							<li className="flex items-center gap-3 text-sm text-zinc-300">
								<svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
								1,000 Initial Tokens
							</li>
							<li className="flex items-center gap-3 text-sm text-zinc-300">
								<svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
								Standard Response Time
							</li>
						</ul>
						<button 
							onClick={() => handleUpgrade("free")}
							disabled={isProcessing || (user?.tier || "free") === "free"}
							className={`w-full py-3 px-4 font-semibold rounded-xl text-sm border transition-all duration-200 ${(user?.tier || "free") === "free" ? "bg-zinc-800 text-zinc-400 border-zinc-700 cursor-not-allowed" : "bg-zinc-100 hover:bg-white text-black border-transparent"}`}
						>
							{(user?.tier || "free") === "free" ? "Current Plan" : "Downgrade to Free"}
						</button>
					</div>

					{/* Pro Tier */}
					<div className="bg-[#18181b] border border-amber-500/30 rounded-3xl p-8 flex flex-col relative shadow-[0_0_40px_-15px_rgba(245,158,11,0.2)] transform md:-translate-y-4">
						<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
							Most Popular
						</div>
						<div className="mb-8">
							<h3 className="text-xl font-semibold text-white mb-2">Pro Package</h3>
							<p className="text-zinc-500 text-sm h-10">Perfect for heavy daily users.</p>
							<div className="mt-6 flex items-baseline gap-2">
								<span className="text-4xl font-bold text-white">$9</span>
								<span className="text-zinc-500">/ one-time</span>
							</div>
						</div>
						<ul className="space-y-4 mb-8 flex-1">
							<li className="flex items-center gap-3 text-sm text-zinc-200">
								<svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
								<strong className="text-white">+1,000 Tokens instantly</strong>
							</li>
							<li className="flex items-center gap-3 text-sm text-zinc-300">
								<svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
								Priority Processing
							</li>
						</ul>
						<button 
							onClick={() => handleUpgrade("pro")}
							disabled={isProcessing || user?.tier === "pro"}
							className={`w-full py-3 px-4 font-bold rounded-xl text-sm transition-all duration-200 shadow-lg ${user?.tier === "pro" ? "bg-zinc-800 text-zinc-400 cursor-not-allowed" : "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black"}`}
						>
							{user?.tier === "pro" ? "Current Plan" : (user?.tier === "elite" ? "Downgrade to Pro" : (isProcessing ? "Processing..." : "Upgrade to Pro"))}
						</button>
					</div>

					{/* Elite Tier */}
					<div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-8 flex flex-col relative">
						<div className="mb-8">
							<h3 className="text-xl font-semibold text-white mb-2">Elite Quota</h3>
							<p className="text-zinc-500 text-sm h-10">Maximum limits for power users.</p>
							<div className="mt-6 flex items-baseline gap-2">
								<span className="text-4xl font-bold text-white">$39</span>
								<span className="text-zinc-500">/ one-time</span>
							</div>
						</div>
						<ul className="space-y-4 mb-8 flex-1">
							<li className="flex items-center gap-3 text-sm text-zinc-200">
								<svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
								<strong className="text-white">+5,000 Tokens instantly</strong>
							</li>
							<li className="flex items-center gap-3 text-sm text-zinc-300">
								<svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
								Ultra-fast processing
							</li>
						</ul>
						<button 
							onClick={() => handleUpgrade("elite")}
							disabled={isProcessing || user?.tier === "elite"}
							className={`w-full py-3 px-4 font-bold rounded-xl text-sm transition-all duration-200 ${user?.tier === "elite" ? "bg-zinc-800 text-zinc-400 cursor-not-allowed" : "bg-zinc-100 hover:bg-white text-black"}`}
						>
							{user?.tier === "elite" ? "Current Plan" : (isProcessing ? "Processing..." : "Get Elite Quota")}
						</button>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Subscription;
