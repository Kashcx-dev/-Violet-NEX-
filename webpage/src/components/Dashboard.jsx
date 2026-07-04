import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import goldfishContext from "../Context/goldFishContext";

function Dashboard() {
	const { user, getUser, logout, loading } = useContext(goldfishContext);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
			return;
		}
		getUser();
		//eslint-disable-next-line
	}, []);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	if (!user && !loading) {
		return null;
	}

	const memberSince = user?.created_at
		? new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
		: "—";

	const tokenCount = user?.token_count ?? 0;
	
	// Determine the max token limit based on user tier
	let maxTokens = 1000;
	if (user?.tier === "pro") maxTokens = 2000;
	if (user?.tier === "elite") maxTokens = 6000;
	
	const displayTokens = Math.max(0, tokenCount);
	const tokenPercent = Math.min((tokenCount / maxTokens) * 100, 100);

	return (
		<div className="min-h-screen bg-[#09090b] text-[#f4f4f5] p-6 selection:bg-white selection:text-black">
			{/* Header */}
			<div className="max-w-5xl mx-auto">
				<div className="flex items-center justify-between mb-10">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black font-bold text-sm">
							{user?.name?.charAt(0)?.toUpperCase() || "G"}
						</div>
						<div>
							<h1 className="text-lg font-semibold text-white">
								Welcome back, {user?.name || "User"}
							</h1>
							<p className="text-xs text-zinc-500">Violet Dashboard</p>
						</div>
					</div>
					<button
						onClick={handleLogout}
						className="px-4 py-2 text-sm text-zinc-400 border border-zinc-800 rounded-xl hover:text-white hover:border-zinc-600 transition-all duration-200"
					>
						Sign Out
					</button>
				</div>

				{/* Stats Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
					{/* Account Info */}
					<div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-8 h-8 rounded-lg bg-zinc-800/60 flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
									<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
									<circle cx="12" cy="7" r="4"></circle>
								</svg>
							</div>
							<h3 className="text-sm font-medium text-zinc-400">Account</h3>
						</div>
						<p className="text-white font-semibold text-lg mb-1">{user?.name || "—"}</p>
						<p className="text-zinc-500 text-sm">{user?.email || "—"}</p>
					</div>

					{/* Token Usage */}
					<div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-8 h-8 rounded-lg bg-zinc-800/60 flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
									<circle cx="12" cy="12" r="10"></circle>
									<line x1="12" y1="8" x2="12" y2="16"></line>
									<line x1="8" y1="12" x2="16" y2="12"></line>
								</svg>
							</div>
							<h3 className="text-sm font-medium text-zinc-400">Tokens Remaining</h3>
						</div>
						<p className={`font-bold text-3xl mb-2 ${tokenCount <= 0 ? 'text-red-400' : 'text-white'}`}>
							{displayTokens.toLocaleString()} <span className="text-sm font-normal text-zinc-500">/ {maxTokens.toLocaleString()}</span>
						</p>
						<div className="w-full bg-zinc-800 rounded-full h-2">
							<div
								className={`h-2 rounded-full transition-all duration-500 ${tokenCount <= 0 ? 'bg-red-500' : tokenPercent > 50 ? 'bg-emerald-500' : tokenPercent > 20 ? 'bg-amber-400' : 'bg-red-400'}`}
								style={{ width: `${tokenPercent}%` }}
							></div>
						</div>
					</div>

					{/* Member Since */}
					<div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-8 h-8 rounded-lg bg-zinc-800/60 flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
									<line x1="16" y1="2" x2="16" y2="6"></line>
									<line x1="8" y1="2" x2="8" y2="6"></line>
									<line x1="3" y1="10" x2="21" y2="10"></line>
								</svg>
							</div>
							<h3 className="text-sm font-medium text-zinc-400">Member Since</h3>
						</div>
						<p className="text-white font-semibold text-lg">{memberSince}</p>
						<p className="text-zinc-500 text-sm mt-1 capitalize">{user?.tier || "Free"} Tier</p>
					</div>
				</div>

				{/* Token Analytics Graph */}
				<div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-8 mb-8">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="text-lg font-semibold text-white">Usage Analytics</h3>
							<p className="text-sm text-zinc-500">Tokens consumed over the last 7 days</p>
						</div>
						<div className="text-right">
							<p className="text-2xl font-bold text-amber-400">
								{Math.max(0, maxTokens - tokenCount).toLocaleString()}
							</p>
							<p className="text-xs text-zinc-500">Total Used</p>
						</div>
					</div>

					{/* 7-Day Bar Chart */}
					<div className="h-48 w-full flex items-end justify-between gap-2 pt-4">
						{[...Array(7)].map((_, i) => {
							const isToday = i === 6;
							const tokensUsed = isToday ? Math.max(0, maxTokens - tokenCount) : 0;
							
							// Calculate height percentage (max maxTokens for scale)
							let heightPercent = (tokensUsed / maxTokens) * 100;
							if (heightPercent > 100) heightPercent = 100;
							// Give it a tiny minimum height so it's visible even at 0
							const displayHeight = Math.max(heightPercent, 2);

							return (
								<div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
									{/* Tooltip */}
									<div className="absolute -top-8 bg-zinc-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
										{tokensUsed.toLocaleString()}
									</div>
									
									{/* Bar */}
									<div 
										className={`w-full rounded-t-sm transition-all duration-500 ${isToday && tokensUsed > 0 ? 'bg-gradient-to-t from-orange-600 to-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'bg-zinc-800'}`}
										style={{ height: `${displayHeight}%` }}
									></div>
									
									{/* Label */}
									<div className="text-[10px] text-zinc-500 mt-2">
										{isToday ? 'Today' : `Day ${i+1}`}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Subscription Placeholder */}
				<div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-8 text-center">
					<div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
							<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-white mb-2">Subscription & Billing</h3>
					<p className="text-zinc-500 text-sm max-w-md mx-auto">
						Manage your plan, view invoices, and upgrade your token quota. Coming soon.
					</p>
					<button 
						onClick={() => navigate("/subscription")}
						className="mt-6 px-6 py-2.5 bg-zinc-800 text-white font-medium rounded-xl text-sm hover:bg-zinc-700 transition-all duration-200"
					>
						View Plans
					</button>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
