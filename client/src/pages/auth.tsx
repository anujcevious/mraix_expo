import { useState, FormEvent, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLocation } from "wouter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  loginUser,
} from "../../../store/silce/auth/authSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import OTPVerificationPopup from "@/components/popups/OTPVerificationPopup";
import ForgotPasswordPopup from "@/components/popups/ForgotPasswordPopup";
import { toast } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  companyName: string;
}

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] =
    useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setLocation] = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await dispatch(
        loginUser({
          identifier: formData.email,
          password: formData.password,
        })
      ).unwrap();

      if (result.status) {
        toast.success("Login successful!");
        setLocation("/");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.phone ||
      !formData.companyName ||
      !acceptTerms
    ) {
      toast.error("Please fill in all required fields and accept terms.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          companyname: formData.companyName,
          ispartner: false,
        }),
      });

      const data = await response.json();

      if (data.status) {
        setShowOtpModal(true);
        toast.success(
          "Registration successful! Please verify OTP sent to your email.",
        );
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLoginMode) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {/* <ForgotPasswordPopup
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      /> */}
      {/* <OTPVerificationPopup
        email={formData.email}
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={async (otp) => {
          try {
            const response = await fetch("/api/auth/verify-otp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.email,
                verificationcode: otp,
              }),
            });

            const data = await response.json();

            if (data.status) {
              setShowOtpModal(false);
              setLocation("/");
              toast.success("Email verified successfully!");
            } else {
              toast.error(data.message || "OTP verification failed");
            }
          } catch (error) {
            toast.error("OTP verification failed");
          }
        }}
      /> */}
      <div className="flex min-h-screen">
        <div className="hidden md:flex bg-purple-600 p-6 md:p-16 flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to MrAix
          </h1>
          <p className="text-xs text-white/90 mb-12">
            Our platform offers a complete invoice and billing management
            solution designed to streamline your financial processes. Easily
            create, send, and track invoices with professional...
          </p>

          <div className="space-y-6 md:space-y-8">
            {[
              {
                title: "Easy Invoicing",
                description:
                  "Quickly create and send professional invoices in seconds to streamline your billing and get paid faster.",
              },
              {
                title: "Powerful Dashboard",
                description:
                  "Get valuable insights instantly with real-time analytics and detailed reports to drive smarter business decisions.",
              },
              {
                title: "Secure Payments",
                description:
                  "Accept payments online easily with multiple flexible payment options, offering convenience for you and your customers.",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="mt-1 border border-white rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center bg-gray-50 p-4 md:p-0">
          <div className="w-full max-w-[450px] p-6 md:p-8 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl border-b border-b-gray-200 pb-4 font-semibold text-purple-600 mb-4">
              {isLoginMode ? "Login" : "Register"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLoginMode && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                </div>
              )}

              {!isLoginMode ? null : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              )}

              {!isLoginMode && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                      placeholder="Enter Phone"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                      placeholder="Enter Company Name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                    placeholder="Enter Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {isLoginMode ? (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-xxs text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
              ) : (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-xxs text-gray-700"
                  >
                    I accept the Terms and Conditions
                  </label>
                </div>
              )}

              <div className="flex justify-between items-center mb-4">
                {isLoginMode && (
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-xs text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isLoginMode ? "Sign In" : "Register"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-700">
              {isLoginMode
                ? "Don't have an account yet? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-purple-600 hover:underline"
              >
                {isLoginMode ? "Register" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
