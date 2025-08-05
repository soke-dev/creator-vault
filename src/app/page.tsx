'use client';
import { useReadContract } from "thirdweb/react";
import { client } from "./client";
import { getContract } from "thirdweb";
import { CampaignCard } from "@/components/CampaignCard";
import { CROWDFUNDING_FACTORY } from "./constants/contracts";
import { chain } from "./constants/chains";
import Link from 'next/link';

export default function Home() {
  // Get CrowdfundingFactory contract
  const contract = getContract({
    client: client,
    chain: chain,
    address: CROWDFUNDING_FACTORY,
  });

  // Get all campaigns deployed with CrowdfundingFactory
  const { data: campaigns, isLoading: isLoadingCampaigns, refetch: refetchCampaigns } = useReadContract({
    contract: contract,
    method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name)[])",
    params: []
  });

  return (
    <main className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 xl:px-8 mt-2 sm:mt-4 transition-colors duration-300">
   {/* Hero Section */}
<div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl mb-6 sm:mb-8 lg:mb-12 transition-colors duration-300">
  {/* Animated background elements */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-gradient-to-br from-purple-700 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-purple-800 to-purple-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>
  
  {/* Grid pattern overlay */}
  <div className="absolute inset-0 opacity-10">
    <div className="w-full h-full" style={{
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
      backgroundSize: '15px 15px'
    }}></div>
  </div>
  
  <div className="relative z-10 text-white py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
    {/* Main heading with mobile-optimized typography */}
    <div className="mb-4 sm:mb-6 lg:mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 sm:mb-3 lg:mb-4 tracking-tight leading-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          Creator
        </span>
        <span className="bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 bg-clip-text text-transparent">
          Vault
        </span>
      </h1>
      <div className="w-12 sm:w-16 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 mx-auto rounded-full"></div>
    </div>
    
    {/* Compact description for mobile */}
    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-3 sm:mb-4 text-gray-100 max-w-4xl mx-auto leading-relaxed font-light px-2">
      The next-generation Web3 platform empowering 
      <span className="text-purple-300 font-semibold"> creators, artists, builders, authors, and innovators</span> to 
      <span className="text-white font-semibold"> own & crowdfund their creative vision</span>
      <span className="block mt-1 sm:mt-2 text-xs sm:text-sm lg:text-lg text-gray-300">
        Powered by <span className="text-purple-300 font-semibold">Camp Network</span>
      </span>
    </p>
    
    {/* Compact feature tags for mobile */}
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3 mb-6 sm:mb-8 lg:mb-10 px-2">
      <span className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/20">
        🔗 <span className="hidden sm:inline">Blockchain </span>Secured
      </span>
      <span className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/20">
        ✅ <span className="hidden sm:inline">Verified </span>Creators
      </span>
      <span className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/20">
        💎 <span className="hidden sm:inline">Zero Platform </span>Fees
      </span>
      <span className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/20">
        🌍 <span className="hidden sm:inline">Global </span>Community
      </span>
    </div>
    
    {/* CTA buttons in one line */}
    <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 max-w-lg mx-auto px-2">
      <Link href="/dashboard/page" className="flex-1">
        <button className="group relative w-full px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 rounded-lg sm:rounded-xl font-bold text-xs sm:text-base shadow-2xl shadow-purple-700/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-700/50 hover:scale-105 transform">
          <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="whitespace-nowrap">Launch Your Project</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </Link>
      
      <Link href="/explore" className="flex-1">
        <button className="group relative w-full px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-white/30 rounded-lg sm:rounded-xl font-bold text-xs sm:text-base backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105 transform">
          <span className="flex items-center justify-center gap-1 sm:gap-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="whitespace-nowrap">Explore Projects</span>
          </span>
        </button>
      </Link>
    </div>
  </div>
</div>

{/* Add this CSS in your global CSS or in a <style> block */}
<style jsx>{`
  @keyframes gradientMoveHero {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`}</style>

{/* How It Works Section */}
<section className="py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
  {/* Background decorative elements */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(244,90,6,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,140,66,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]"></div>
  
  <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 relative z-10">
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 text-center">
      {/* Step 1: Create */}
      <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f45a06]/5 dark:from-purple-600/5 to-transparent rounded-lg sm:rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-br from-purple-700 via-purple-500 to-purple-400 dark:from-purple-600 dark:via-purple-700 dark:to-purple-800 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
            </svg>
          </div>
          <h3 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 lg:mb-3">Create Your Vision</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
            Share your creative project with the world. Set your funding goal and tell your story.
          </p>
        </div>
      </div>

      {/* Step 2: Fund */}
      <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f45a06]/5 dark:from-purple-600/5 to-transparent rounded-lg sm:rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 dark:from-purple-600 dark:via-purple-700 dark:to-purple-800 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
          <h3 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 lg:mb-3">Secure Funding</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
            Supporters fund your project using secure blockchain technology. Every contribution is verified.
          </p>
        </div>
      </div>

      {/* Step 3: Launch */}
      <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f45a06]/5 dark:from-purple-600/5 to-transparent rounded-lg sm:rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-br from-purple-800 via-purple-600 to-purple-400 dark:from-purple-600 dark:via-purple-700 dark:to-purple-800 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 lg:mb-3">Launch & Create</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
            Bring your vision to life! Track progress, engage with your community, and deliver amazing work.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Featured Projects Header */}
<section className="py-4 sm:py-6 lg:py-8">
  <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-center sm:text-left flex-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4">
          Featured Projects
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-100 max-w-2xl mx-auto sm:mx-0 mb-2 lg:mb-2">
          Discover amazing creative projects from talented creators around the world
        </p>
        <div className="w-12 sm:w-14 lg:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 mx-auto sm:mx-0 rounded-full"></div>
      </div>
      
      <div className="w-full sm:w-auto sm:ml-4 lg:ml-8">
        <Link href="/explore" className="block w-full sm:w-auto">
          <button className="group relative w-full sm:w-auto px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
              <span className="sm:hidden">View All</span>
              <span className="hidden sm:inline">View All Projects</span>
            </span>
          </button>
        </Link>
      </div>
    </div>
  </div>
</section>

{/* Creative Projects Section */}
<section className="py-2 sm:py-4 lg:py-6">
  <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
      {!isLoadingCampaigns && campaigns && campaigns.length > 0 ? (
        campaigns
          .slice(0, 3) // Show first 3 campaigns as featured campaigns
          .map((campaign) => (
            <CampaignCard
              key={campaign.campaignAddress}
              campaignAddress={campaign.campaignAddress}
            />
          ))
      ) : (
        <div className="col-span-2 lg:col-span-3 text-center py-6 sm:py-8 lg:py-12">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3">🚀</div>
            <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">
              Loading creative projects...
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Discovering amazing campaigns for you
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
</section>



  {/* Campaign Stats Section
      <section className="py-12 my-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6"></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-600">Total Campaigns</h3>
            <p className="text-3xl font-bold text-gray-800">{campaigns ? campaigns.length : 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-600">Total Funds Donated</h3>
            <p className="text-3xl font-bold text-gray-800">$44,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-600">Total Backers</h3>
            <p className="text-3xl font-bold text-gray-800">21</p>
          </div>
        </div>
      </section> */}


      {/* Success Stories Section */}
      <section className="py-6 sm:py-8 lg:py-12 my-3 sm:my-4 lg:my-6 bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 rounded-lg sm:rounded-xl shadow-lg shadow-purple-700/20">
  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-white mb-4 sm:mb-6 lg:mb-8">Creative Success Stories</h2>
  <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6">
    {/* Story 1 - Musician */}
    <div className="w-72 sm:w-76 lg:w-80 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border border-gray-100">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        {/* Profile Image */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white shadow-lg">
          <span className="text-base sm:text-lg font-bold">🎵</span>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">Maya Rodriguez</h3>
          <p className="text-xs text-gray-600 font-medium">Indie Musician</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-green-600 text-xs">✓</span>
            <span className="text-green-600 text-xs font-medium">@mayamusic</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
        &quot;CreatorVault helped me raise $15,000 for my debut album. The verified creator system gave fans confidence to support my project!&quot;
      </p>
      <div className="mt-2 sm:mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">🎯 Goal: $12,000</span>
        <span className="text-xs font-semibold text-green-600">✅ 100% Funded</span>
      </div>
    </div>
    
    {/* Story 2 - Author */}
    <div className="w-72 sm:w-76 lg:w-80 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border border-gray-100">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        {/* Profile Image */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <span className="text-base sm:text-lg font-bold">📚</span>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">James Chen</h3>
          <p className="text-xs text-gray-600 font-medium">Fantasy Author</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-green-600 text-xs">✓</span>
            <span className="text-green-600 text-xs font-medium">@jameschen_writes</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
        &quot;My graphic novel was fully funded in just 10 days! The blockchain transparency made backers trust my project completely.&quot;
      </p>
      <div className="mt-2 sm:mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">🎯 Goal: $8,500</span>
        <span className="text-xs font-semibold text-green-600">✅ 100% Funded</span>
      </div>
    </div>

    {/* Story 3 - Video Creator */}
    <div className="w-72 sm:w-76 lg:w-80 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border border-gray-100">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        {/* Profile Image */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <span className="text-base sm:text-lg font-bold">🎬</span>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">Alex Thompson</h3>
          <p className="text-xs text-gray-600 font-medium">Documentary Filmmaker</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-green-600 text-xs">✓</span>
            <span className="text-green-600 text-xs font-medium">@alexfilms</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
        &quot;CreatorVault enabled me to fund my documentary about urban art. Raised $22,000 from supporters worldwide!&quot;
      </p>
      <div className="mt-2 sm:mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">🎯 Goal: $20,000</span>
        <span className="text-xs font-semibold text-green-600">✅ 100% Funded</span>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-purple-700 via-purple-500 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-purple-800 to-purple-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 lg:py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center mb-2 sm:mb-3 lg:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Creator</span>
                  <span className="bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 bg-clip-text text-transparent">Vault</span>
                </h3>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md">
                The next-generation Web3 platform empowering creators, artists, builders, authors, and innovators to own & crowdfund their creative vision.
              </p>
              <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-4">
                <span className="text-xs text-gray-500">Powered by</span>
                <span className="text-purple-300 font-semibold text-xs sm:text-sm">Camp Network</span>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4 text-white">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xs sm:text-sm">Home</a></li>
                <li><a href="/explore" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xs sm:text-sm">Explore Projects</a></li>
                <li><a href="/dashboard/page" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xs sm:text-sm">Create Project</a></li>
                <li><a href="/" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xs sm:text-sm">How It Works</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4 text-white">Support</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xs sm:text-sm">About Us</a></li>
                <li><a href="/" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xs sm:text-sm">Contact</a></li>
                <li><a href="/" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xs sm:text-sm">FAQs</a></li>
                <li><a href="/" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xs sm:text-sm">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-4 sm:pt-6 lg:pt-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="text-gray-400 text-xs sm:text-sm">© 2025 CreatorVault. All Rights Reserved.</p>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xs text-gray-500">Secured by Blockchain</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Network Active</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
