import { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { InputOTP } from "@/components/ui/input-otp";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { verifyOtp } from "../../../../store/silce/auth/authSlice";

interface OTPVerificationPopupProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => Promise<void>;
}

const OTPVerificationPopup = ({
  email,
  onClose,
  isOpen,
}: OTPVerificationPopupProps) => {
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(verifyOtp({ email, verificationcode: otp })).unwrap();
      toast({ title: "Success", description: "OTP verified successfully" });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error || "Failed to verify OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

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
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OTPVerificationPopup;
