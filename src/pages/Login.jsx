import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.44.35-2.1V7.07H2.18A10.99 10.99 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
    <path d="M12 .5C5.73.5.67 5.57.67 11.85c0 5.02 3.24 9.27 7.74 10.78.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.95-3.15.69-3.81-1.52-3.81-1.52-.51-1.31-1.26-1.66-1.26-1.66-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.18 1.74 1.18 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.51-.29-5.15-1.27-5.15-5.65 0-1.25.44-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.86 10.86 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.12 3.04.74.8 1.18 1.82 1.18 3.07 0 4.39-2.65 5.36-5.17 5.64.41.36.77 1.06.77 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.66.79.55 4.5-1.51 7.73-5.76 7.73-10.78C23.33 5.57 18.27.5 12 .5z"/>
  </svg>
);

const Login = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const logoSrc = theme === "dark" ? "/logow.png" : "/logod.png";

  const handleSocial = (provider) => {
    setLoading(provider);
    setTimeout(() => {
      setLoading(null);
      toast.success(`${provider} sign-in (demo)`, {
        description: "Hook this up to your auth provider.",
      });
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    localStorage.setItem("stayq_auth", "true");
    toast.success("Welcome back!", { description: "Logged in successfully." });
    window.location.href = "/";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 dark:from-primary/5 dark:via-accent/5 dark:to-primary/10" aria-hidden="true" />
      <div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 dark:bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/20 dark:bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <motion.div 
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={logoSrc} alt="StayQ Logo" className="h-20 w-auto object-contain" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6">
        <motion.div 
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-8 flex flex-col items-center text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue to StayQ
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-border shadow-lg">
              <CardContent className="pt-6">
                <div className="grid gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-11 justify-center gap-3 rounded-lg"
                    onClick={() => handleSocial("Google")}
                    disabled={!!loading}
                  >
                    <GoogleIcon />
                    <span className="font-medium text-sm">
                      {loading === "Google" ? "Connecting…" : "Continue with Google"}
                    </span>
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="h-11 justify-center gap-2 rounded-lg"
                      onClick={() => handleSocial("Apple")}
                      disabled={!!loading}
                    >
                      <AppleIcon />
                      <span className="font-medium text-sm">Apple</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="h-11 justify-center gap-2 rounded-lg"
                      onClick={() => handleSocial("GitHub")}
                      disabled={!!loading}
                    >
                      <GitHubIcon />
                      <span className="font-medium text-sm">GitHub</span>
                    </Button>
                  </div>
                </div>

                <div className="my-6 flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    or with email
                  </span>
                  <Separator className="flex-1" />
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                  <motion.div variants={itemVariants} className="grid gap-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="h-10 rounded-lg pl-10"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <a
                        href="#"
                        className="text-xs font-medium text-primary hover:text-primary/90 transition-colors"
                      >
                        Forgot?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPwd ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="h-10 rounded-lg pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPwd ? "Hide password" : "Show password"}
                      >
                        {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      size="lg"
                      className="group h-11 w-full rounded-lg"
                    >
                      Sign in
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-primary hover:text-primary/90 transition-colors"
            >
              Create one
            </a>
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
};

export default Login;