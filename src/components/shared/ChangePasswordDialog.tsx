"use client";

import { db } from "@/config";
import { Users } from "@/config/schema";
import { useUserStore } from "@/store/user.store";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ChangePasswordDialog = () => {
    const { user } = useUserStore();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPasswords, setShowNewPasswords] = useState(false);
    const [input, setInput] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const resetForm = () => {
        setInput({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login first");
            return;
        }

        if (!input.currentPassword || !input.newPassword || !input.confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (input.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }

        if (input.newPassword !== input.confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        if (input.currentPassword === input.newPassword) {
            toast.error("New password must be different from current password");
            return;
        }

        setIsLoading(true);
        try {
            const currentUser = await db
                .select()
                .from(Users)
                .where(eq(Users.id, user.id));

            if (currentUser.length === 0) {
                toast.error("User not found");
                return;
            }

            const isCurrentPasswordValid = await bcrypt.compare(
                input.currentPassword,
                currentUser[0].password
            );

            if (!isCurrentPasswordValid) {
                toast.error("Current password is incorrect");
                return;
            }

            const hashedPassword = await bcrypt.hash(input.newPassword, 10);
            await db
                .update(Users)
                .set({ password: hashedPassword })
                .where(eq(Users.id, user.id));

            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: user.email,
                    password: input.newPassword,
                })
            );

            toast.success("Password updated successfully");
            setOpen(false);
            resetForm();
        } catch (error) {
            toast.error("Failed to update password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) resetForm();
            }}
        >
            <DialogTrigger asChild>
                <Button className="primary-button w-full sm:w-fit">
                    <Lock className="size-4" />
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Enter your current password and choose a new secure password.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6 pt-2">
                    <div className="space-y-2 w-full">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                            <Input
                                id="currentPassword"
                                name="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                value={input.currentPassword}
                                onChange={handleChange}
                                autoComplete="current-password"
                                className="pr-10 w-full"
                            />
                            <button
                                type="button"
                                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowCurrentPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2 w-full">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type={showNewPasswords ? "text" : "password"}
                                placeholder="Enter new password"
                                value={input.newPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                className="pr-10"
                            />
                            <button
                                type="button"
                                aria-label={showNewPasswords ? "Hide password" : "Show password"}
                                onClick={() => setShowNewPasswords((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showNewPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2 w-full">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showNewPasswords ? "text" : "password"}
                                placeholder="Confirm new password"
                                value={input.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                className="pr-10"
                            />
                            <button
                                type="button"
                                aria-label={showNewPasswords ? "Hide password" : "Show password"}
                                onClick={() => setShowNewPasswords((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showNewPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button type="submit" className="primary-button w-full sm:w-auto" disabled={isLoading}>
                            {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Update Password"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => {
                                setOpen(false);
                                resetForm();
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePasswordDialog;