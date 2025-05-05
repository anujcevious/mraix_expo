import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPVerificationPopupProps {
  email: string;
  onClose: () => void;
  onVerified: () => void;
}

const OTPVerificationPopup = ({
  email,
  onClose,
  onVerified,
}: OTPVerificationPopupProps) => {
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({ title: "Success", description: result.message });
        onVerified();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to verify OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      toast({ title: "Success", description: result.message });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Verify OTP</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Enter the 6-digit code sent to {email}
          </p>

          <div className="space-y-6">
            <InputOTP
              value={otp}
              onChange={setOtp}
              maxLength={6}
              className="justify-center"
            />

            <div className="space-y-2">
              <Button
                className="w-full"
                onClick={handleVerify}
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={handleResend}
                disabled={isLoading}
              >
                Resend OTP
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OTPVerificationPopup;
