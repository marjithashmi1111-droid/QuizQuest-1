"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { BookOpen, Users, FileQuestion, Sparkles, LogOut, Plus, BarChart3, Settings } from "lucide-react";
import { toast } from "sonner";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeQuizzes: 0,
    totalStudents: 0,
    quizzesCreated: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || user.role !== "teacher") {
      navigate("/auth");
      return;
    }

    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const myQuizzes = allQuizzes.filter((q: any) => q.createdBy === user.id);
    
    const connections = JSON.parse(localStorage.getItem("qq_connections") || "[]");
    const myStudents = connections.filter((c: any) => c.teacherId === user.id && c.status === "accepted");
    
    setStats({
      activeQuizzes: myQuizzes.filter((q: any) => q.quizStatus === "published").length,
      totalStudents: myStudents.length,
      quizzesCreated: myQuizzes.length
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-primary/10">
          <div>
            <h2 className="text-3xl font-bold text-gradient">Teacher Command Center</h2>
            <p className="text-muted-foreground">Manage your curriculum and student performance</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-glow transition-smooth border-primary/10 group cursor-pointer" onClick={() => navigate('/create-quiz')}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary transition-colors">
                <Sparkles className="text-primary group-hover:text-white w-6 h-6" />
              </div>
              <div>
                <CardTitle>AI Quiz Factory</CardTitle>
                <CardDescription>Instant question generation</CardDescription>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Leverage AI to turn files or topics into robust assessments in seconds.</p>
            <Button variant="gradient" className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Generate New Quiz
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-glow transition-smooth border-primary/10 group cursor-pointer" onClick={() => navigate('/teacher/my-quizzes')}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent transition-colors">
                <BookOpen className="text-accent group-hover:text-white w-6 h-6" />
              </div>
              <div>
                <CardTitle>Quiz Library</CardTitle>
                <CardDescription>Edit & Manage your bank</CardDescription>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Review your created quizzes, publish drafts, and track student results.</p>
            <Button variant="outline" className="w-full">
              Browse My Quizzes
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-glow transition-smooth border-primary/10 bg-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-muted rounded-xl">
                <BarChart3 className="text-muted-foreground w-6 h-6" />
              </div>
              <CardTitle>Performance Overview</CardTitle>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-primary/5">
                <span className="text-muted-foreground font-medium">Published Quizzes</span>
                <span className="font-bold text-primary text-xl">{stats.activeQuizzes}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-accent/5">
                <span className="text-muted-foreground font-medium">Linked Students</span>
                <span className="font-bold text-accent text-xl">{stats.totalStudents}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t pt-4">
                <span className="text-muted-foreground font-medium">Lifetime Created</span>
                <span className="font-bold text-xl">{stats.quizzesCreated}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8 border-primary/5 shadow-sm bg-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Users className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Student Relations</h3>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">Review pending connection requests from students and manage your existing links. Control which students can see which quizzes based on attendance.</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/connection-requests")}>
              Manage Links & Requests
            </Button>
          </Card>

          <Card className="p-8 border-primary/5 shadow-sm bg-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Settings className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Assessment Logic</h3>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">Adjust how your quizzes behave globally. Toggle question/answer shuffling, set default marks, and configure pagination for better student UX.</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/teacher/settings")}>
              Configure Quiz Behavior
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
