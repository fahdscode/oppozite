import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useShopifyAuth } from "@/hooks/useShopifyAuth";

const Account = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, register, isLoggingIn, isRegistering, isAuthenticated, customer, logout } = useShopifyAuth();

    // Login Form State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register Form State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ email: loginEmail, password: loginPassword });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({ firstName, lastName, email: regEmail, password: regPassword });
        setIsLogin(true); // Switch to login after successful registration
    };

    if (isAuthenticated && customer) {
        return (
            <div className="min-h-screen pt-20 pb-16 px-4 md:px-8 flex items-center justify-center bg-secondary/30">
                <div className="w-full max-w-md mx-auto space-y-8 bg-background p-8 rounded-2xl shadow-sm border border-border/50 text-center">
                    <h1 className="font-display text-4xl">Welcome, {customer.firstName}!</h1>
                    <p className="text-muted-foreground">{customer.email}</p>
                    <div className="pt-4">
                        <Button onClick={logout} variant="outline" className="w-full">Sign Out</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-16 px-4 md:px-8 flex items-center justify-center bg-secondary/30">
            <div className="w-full max-w-[1200px] grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Left Side - Hero/Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:flex flex-col justify-center h-full relative overflow-hidden rounded-2xl min-h-[600px] bg-black"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-60 hover:scale-105 transition-transform duration-700" />
                    <div className="relative z-10 p-12 text-white">
                        <h2 className="font-display text-5xl mb-6">Welcome to Oppozite</h2>
                        <p className="text-lg text-white/80 max-w-md">
                            Join our community to get exclusive access to new drops, track your orders, and manage your wishlist.
                        </p>
                    </div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-md mx-auto space-y-8 bg-background p-8 rounded-2xl shadow-sm border border-border/50"
                >
                    <div className="text-center space-y-2">
                        <h1 className="font-display text-4xl">{isLogin ? "Sign In" : "Create Account"}</h1>
                        <p className="text-muted-foreground">
                            {isLogin ? "Enter your details to access your account" : "Fill in your details to get started"}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.form
                                    key="login"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                    onSubmit={handleLogin}
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            className="h-11"
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground">Forgot password?</Link>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            className="h-11"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button className="w-full h-11 text-base" type="submit" disabled={isLoggingIn}>
                                        {isLoggingIn ? "Signing In..." : "Sign In"}
                                    </Button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="register"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                    onSubmit={handleRegister}
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                required
                                                className="h-11"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                required
                                                className="h-11"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-email">Email</Label>
                                        <Input
                                            id="reg-email"
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            className="h-11"
                                            value={regEmail}
                                            onChange={(e) => setRegEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-password">Password</Label>
                                        <Input
                                            id="reg-password"
                                            type="password"
                                            required
                                            className="h-11"
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button className="w-full h-11 text-base" type="submit" disabled={isRegistering}>
                                        {isRegistering ? "Creating Account..." : "Create Account"}
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full h-11" type="button">Google</Button>
                            <Button variant="outline" className="w-full h-11" type="button">Apple</Button>
                        </div>

                        <div className="text-center text-sm pt-4">
                            <span className="text-muted-foreground">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                            </span>
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Account;
