
"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { Input, Label } from "../../components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs";
import { GraduationCap, Sparkles, Loader2 } from "lucide-react";

// Strictly separate schemas to prevent cross-contamination of validation errors
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "teacher"]),
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    fullName: "", 
    email: "", 
    password: "", 
    role: "student" as "student" | "teacher" 
  });
  
  const navigate = useNavigate();

  // Redirect if session already exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      const target = user.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard";
      navigate(target, { replace: true });
    }
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const users = JSON.parse(localStorage.getItem("qq_users") || "[]");

      if (activeTab === "signup") {
        // Validation for signup ONLY
        signupSchema.parse(formData);
        
        if (users.find((u: any) => u.email === formData.email)) {
          toast.error("An account with this email already exists!");
          setIsSubmitting(false);
          return;
        }

        const newUser = { 
          id: Math.random().toString(36).substr(2, 9),
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role
        };
        
        users.push(newUser);
        localStorage.setItem("qq_users", JSON.stringify(users));
        
        toast.success("Account created! You can now log in.");
        
        // Switch to login tab and clear sensitive fields
        setActiveTab("login");
        setFormData(prev => ({ ...prev, password: "", fullName: "" }));
        
      } else {
        // Validation for login ONLY - ensures fullName isn't checked
        loginSchema.parse({ email: formData.email, password: formData.password });
        
        const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
        
        if (user) {
          // Standardized keys for frontend-only state management
          const token = "mock-jwt-" + Math.random().toString(36).substring(7);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userId", user.id);
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("userName", user.fullName);
          
          toast.success(`Welcome back, ${user.fullName}!`);
          
          // Role-based redirection
          const target = user.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard";
          navigate(target, { replace: true });
        } else {
          toast.error("Invalid email or password. Please check your credentials.");
        }
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // Display validation errors clearly
        err.issues.forEach((i) => toast.error(i.message));
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4 py-32">
      <Card className="w-full max-w-md shadow-elevated border-primary/10 overflow-hidden bg-white/95 backdrop-blur-md">
        <div className="h-2 bg-gradient-primary w-full" />
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <GraduationCap className="h-12 w-12 text-primary" />
              <Sparkles className="h-5 w-5 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-gradient">QuizQuest</CardTitle>
            <CardDescription className="mt-1">AI-Powered Learning Platform</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger 
                value="login" 
                activeValue={activeTab} 
                onClick={() => setActiveTab("login")}
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                activeValue={activeTab} 
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleAuth} className="space-y-4">
              {activeTab === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    placeholder="Enter your full name" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              {activeTab === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select 
                    id="role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              )}

              <Button type="submit" variant="gradient" className="w-full mt-6 h-11" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  activeTab === "login" ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
