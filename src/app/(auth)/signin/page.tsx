"use client";
import CheckBox from "@/components/form/check-box";
import { FormField } from "@/components/form/form-field";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

import logo from "@/../public/logo.png";

const Signin = () => {
  const router = useRouter();
  const { isDark } = useTheme();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#030303]' : 'bg-gray-50'}`}>
      {/* Background grid pattern */}
      <div
        className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.08]'}`}
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#FFD700' : '#d4a500'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#FFD700' : '#d4a500'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Subtle glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] ${isDark ? 'bg-[#FFD700]/5' : 'bg-[#FFD700]/10'}`} />

      {/* Back to home */}
      <Link
        href="/"
        className={`absolute top-6 left-6 flex items-center gap-2 hover:text-[#FFD700] transition-colors text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Login Card */}
      <div className="relative w-full max-w-[340px]">
        {/* Card */}
        <div className={`rounded-2xl p-6 shadow-2xl transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] border border-gray-800' : 'bg-white border border-gray-200'}`}>
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src={logo}
              className="w-[120px]"
              alt="Pipzen"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome back</h1>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Sign in to your trading account</p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
            />

            <FormField
              label="Password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              type="password"
            />

            <div className="flex items-center justify-between pt-1">
              <CheckBox id="remember" label="Remember me" />
              <Link
                href="#"
                className={`text-xs hover:text-[#FFD700] transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FFD700] hover:bg-[#e5c200] text-black font-bold rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <span className={`text-xs uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>or</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
          </div>

          {/* Sign up link */}
          <p className={`text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#FFD700] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Bottom text */}
        <p className={`text-center text-xs mt-4 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
};

export default Signin;
