'use client';

import { useState } from 'react';


import { HiEye, HiEyeOff } from 'react-icons/hi';
import { HiShieldCheck, HiBell, HiCheckBadge } from 'react-icons/hi2';
import Image from 'next/image';
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            window.location.href = '/hq-overview';
        }, 1000);
    };

    return (
        <div className="flex h-full w-full font-barlow">
            {/* Left Side - Login Form */}
            <div
                className="relative flex w-full lg:w-1/2 flex-col items-center justify-center p-8 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/login/gradientleft.png')" }}
            >
                {/* Logo Area */}
                <div className="mb-[50px] text-center">
                    <Image src="/assets/login/roboilogowhite.png" alt="Logo" width={150} height={150} />
                    <p className="mt-2 text-xs text-blue-200 tracking-widest uppercase">
                        POWERED BY INVINCIBLE
                    </p>
                </div>

                {/* Login Card */}
                <div className="w-full max-w-[480px] bg-white rounded-[24px] p-10 shadow-2xl animate-fade-in relative z-10">
                    <div className="flex justify-center mb-6">
                        {/* Placeholder for Client Logo */}
                        <div className="">
                            {/* Mocking Nayara Energy Logo with simple text/icon for now as per image reference */}
                            {/* <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-green-400"></div> */}
                            <Image src="/assets/login/nayaralogo.png" alt="Logo" width={150} height={150} />
                        </div>
                    </div>

                    <div className="mb-[10px]">
                        <h2 className="font-bold text-[28px] text-[#1C2347] mb-1">Sign In</h2>
                        <p className="text-sm text-[#1C2347]">Sign in admin Portal</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-[16px] leading-[100%] text-[#1C2347] font-barlow">Email</label>
                            <input
                                type="email"
                                placeholder="user@gmail.com"
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#1C2347] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-[16px] leading-[100%] text-[#1C2347] font-barlow">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••••••"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#1C2347] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 w-full rounded-lg bg-[#4F46E5] py-3 text-sm font-semibold text-white hover:bg-[#4338ca] transition-colors disabled:opacity-70 flex items-center justify-center"
                            style={{ background: 'linear-gradient(90deg, #3B82F6 0%, #4F46E5 100%)' }} // Example gradient matching design
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Bottom Stats */}
                <div className="mt-[50px] bottom-10 left-0 right-0 flex justify-center gap-12 text-white/90">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center backdrop-blur-sm">
                            <HiCheckBadge className="h-5 w-5" />
                        </div>
                        <span className="text-md font-medium text-center leading-tight">Audit-ready<br />reports</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center backdrop-blur-sm">
                            <HiShieldCheck className="h-5 w-5" />
                        </div>
                        <span className="text-md font-medium text-center leading-tight">Secure cloud<br />infrastructure</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center backdrop-blur-sm">
                            <HiBell className="h-5 w-5" />
                            {/* Note: HiBell might be misnamed in hi2, using HiIcon standard manually or checking imports */}
                        </div>
                        <span className="text-md font-medium text-center leading-tight">Actionable alerts<br />& insights</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Showcase */}
            <div className="hidden lg:flex w-1/2 bg-[#001233] relative overflow-hidden flex-col items-center justify-center text-center p-12">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#001233] to-[#000a1f]"></div>

                {/* Images Collage Placeholder */}
                <div className="relative w-full max-w-lg aspect-square mb-12">
                    <div className="absolute top-0  right-[-70px] w-3/4 h-3/4 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl z-10">
                        {/* Placeholder for CCTV Camera Image */}
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        // poster="/assets/login/cctv-poster.jpg" // Optional poster
                        >
                            <source src="/assets/login/camera.webm" type="video/webm" />
                            {/* User to replace src above */}
                        </video>
                    </div>
                    <div className="absolute bottom-0 left-[-70px] w-3/4 h-3/4 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl z-[9999]">
                        {/* Placeholder for Robot Image */}
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        // poster="/assets/login/robot-poster.jpg" // Optional poster
                        >
                            <source src="/assets/login/robot.webm" type="video/webm" />
                            {/* User to replace src above */}
                        </video>
                    </div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="font-bold text-[40px] leading-[120%] tracking-[0%] text-white font-barlow mb-4">
                        ROBO-I Ever Watchful AI
                    </h2>
                    <p className="font-medium text-md leading-[136%] tracking-[-1%] text-white/80 font-barlow">
                        Next-Gen Video Analytics SaaS for Compliance, Audit & Intelligence
                    </p>
                </div>
            </div>
        </div>
    );
}
