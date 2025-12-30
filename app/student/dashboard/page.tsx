"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Search, FileQuestion, Award, LogOut, Play, Users, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [availableQuizzes, setAvailableQuizzes] = useState<any[]>([]);
  const [myTeachers, setMyTeachers] = useState<any[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || user.role !== "student") {
      navigate("/auth");
      return;
    }

    // Load connections to find teachers
    const connections = JSON.parse(localStorage.getItem("qq_connections") || "[]");
    const myTeacherIds = connections
      .filter((c: any) => c.studentId === user.id && c.status === "accepted")
      .map((c: any) => c.teacherId);
    
    const allUsers = JSON.parse(localStorage.getItem("qq_users") || "[]");
    setMyTeachers(allUsers.filter((u: any) => myTeacherIds.includes(u.id)));

    // Load quizzes allowed for this student from connected teachers
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const filtered = allQuizzes.filter((q: any) => 
      myTeacherIds.includes(q.createdBy) && q.allowedStudents?.includes(user.id)
    );
    setAvailableQuizzes(filtered);

    // Load results
    const results = JSON.parse(localStorage.getItem("qq_results") || "[]");
    const myResults = results.filter((r: any) => r.userId === user.id);
    setCompletedCount(myResults.length);
    if (myResults.length > 0) {
      const avg = Math.round((myResults.reduce((acc: number, r: any) => acc + (r.score / r.total), 0) / myResults.length) * 100);
      setAverageScore(avg);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const filteredQuizzes = availableQuizzes.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-primary/10">
          <div>
            <h2 className="text-3xl font-bold text-gradient">Student Hub</h2>
            <p className="text-muted-foreground">Ready to test your knowledge today?</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2 shadow-elevated border-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <div>
                <CardTitle>Available Quizzes</CardTitle>
                <CardDescription>Only quizzes you are linked to appear here.</CardDescription>
              </div>
              <div className="relative w-48">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  className="w-full pl-8 pr-2 py-1 text-sm rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {filteredQuizzes.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground space-y-4">
                    <BookOpen className="w-12 h-12 mx-auto opacity-20" />
                    <p className="italic">No quizzes currently assigned. Connect with teachers to get started.</p>
                  </div>
                ) : (
                  filteredQuizzes.map((quiz) => (
                    <div key={quiz.id} className="p-5 rounded-xl border border-border hover:border-primary/50 bg-white transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary transition-colors">
                          <FileQuestion className="text-primary group-hover:text-white w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{quiz.title}</h4>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest">{quiz.subject} • {quiz.difficulty}</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => navigate(`/quiz/${quiz.id}`)} variant="gradient">
                        <Play className="w-4 h-4 mr-2" /> Start Quiz
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-elevated border-primary/5 p-6 bg-white">
              <h3 className="font-bold text-xl mb-4">My Mentors</h3>
              {myTeachers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No connected teachers.</p>
              ) : (
                <div className="space-y-3">
                  {myTeachers.map(t => (
                    <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                        {t.fullName.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">{t.fullName}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{t.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button className="w-full mt-4" variant="outline" size="sm" onClick={() => navigate("/find-teachers")}>
                Find More Teachers
              </Button>
            </Card>

            <Card className="shadow-elevated border-primary/5 bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Completed</p>
                    <h3 className="text-3xl font-black text-primary">{completedCount}</h3>
                  </div>
                  <Award className="w-8 h-8 text-accent opacity-20" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Avg Score</p>
                    <h3 className="text-3xl font-black text-accent">{averageScore}%</h3>
                  </div>
                  <Users className="w-8 h-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
