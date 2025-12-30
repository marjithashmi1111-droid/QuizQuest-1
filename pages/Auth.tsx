
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { Input, Label } from "../components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { GraduationCap, Sparkles, Loader2 } from "lucide-react";

const signupSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "teacher"]),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Auth() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student" as "student" | "teacher",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ fullName: "", email: "", password: "", role: "student" });
  }, [activeTab]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      signupSchema.parse(formData);
      
      // MOCK BACKEND: Check LocalStorage
      const users = JSON.parse(localStorage.getItem('quizquest_users') || '[]');
      const userExists = users.find((u: any) => u.email === formData.email);
      
      if (userExists) {
        toast.error("User already exists!");
      } else {
        const newUser = { ...formData, id: Date.now().toString() };
        users.push(newUser);
        localStorage.setItem('quizquest_users', JSON.stringify(users));
        
        toast.success("Account created! Please login.");
        setActiveTab("login");
      }
    } catch (err: any) {
      // Fix: Use 'issues' instead of 'errors' as per ZodError definition
      if (err instanceof z.ZodError) {
        err.issues.forEach((error) => toast.error(error.message));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      loginSchema.parse({ email: formData.email, password: formData.password });

      // MOCK BACKEND: Verify from LocalStorage
      const users = JSON.parse(localStorage.getItem('quizquest_users') || '[]');
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);

      if (user) {
        localStorage.setItem("token", "mock-jwt-token");
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(`Welcome back, ${user.fullName}!`);
        const redirectPath = user.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard";
        navigate(redirectPath);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err: any) {
      // Fix: Use 'issues' instead of 'errors' as per ZodError definition
      if (err instanceof z.ZodError) {
        err.issues.forEach((error) => toast.error(error.message));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4 py-32">
      <Card className="w-full max-w-md shadow-elevated border-primary/10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <GraduationCap className="h-12 w-12 text-primary" />
              <Sparkles className="h-5 w-5 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-gradient">QuizQuest</CardTitle>
            <CardDescription className="mt-2">AI-Powered Learning Platform</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" data-state={activeTab === 'login' ? 'active' : ''}>Login</TabsTrigger>
              <TabsTrigger value="signup" data-state={activeTab === 'signup' ? 'active' : ''}>Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" activeValue={activeTab}>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full" variant="gradient" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" activeValue={activeTab}>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="John Doe" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>I am a...</Label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                <Button type="submit" className="w-full" variant="gradient" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
