"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth-provider";

export function ConnectModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const auth = useAuth();
  const user = auth?.user; // Safely access 'user' if 'auth' is defined
  const [email, setEmail] = useState(user?.email || ""); // Initialize with user email if available
  const [isEmailVerified, setIsEmailVerified] = useState(!!user); // Auto-verify if user is logged in

  const handleConnect = async () => {
    if (!email) {
      toast("Please enter your email");
      return;
    }

    // Simulate email verification (replace with actual verification logic)
    setTimeout(() => {
      setIsEmailVerified(true);
      toast("Email verified!");
    }, 1000);

    // Simulate connecting to the platform (replace with actual connection logic)
    setTimeout(() => {
      toast("Connected to platform!");
      onOpenChange(false);
      router.refresh();
    }, 2000);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Connect to Platform</AlertDialogTitle>
          <AlertDialogDescription>
            To connect your profile, please verify your email address.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {!isEmailVerified ? (
          <>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="example@example.com"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConnect}>
                Verify Email
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        ) : (
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConnect}>
              Connect
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
