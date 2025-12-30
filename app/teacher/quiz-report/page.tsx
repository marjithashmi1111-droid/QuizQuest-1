"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, User, Trophy, Calendar, ClipboardList } from "lucide-react";

export default function TeacherQuizReportPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [studentSubmissions, setStudentSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const foundQuiz = allQuizzes.find((q: any) => q.id === quizId);
    
    if (!foundQuiz) {
      navigate("/teacher/reports");
      return;
    }
    setQuiz(foundQuiz);

    const allResults = JSON.parse(localStorage.getItem("qq_results") || "[]");
    const allUsers = JSON.parse(localStorage.getItem("qq_users") || "[]");
    
    const quizSubmissions = allResults
      .filter((r: any) => r.quizId === quizId)
      .map((r: any) => ({
        ...r,
        student: allUsers.find((u: any) => u.id === r.userId)
      }))
      .sort((a: any, b: any) => b.score - a.score);

    setStudentSubmissions(quizSubmissions);
  }, [quizId, navigate]);

  if (!quiz) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/teacher/reports")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Analytics
          </Button>
          <div className="text-right">
            <h1 className="text-3xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.subject} Breakdown</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white shadow-sm border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Submissions</span>
            </div>
            <p className="text-4xl font-black">{studentSubmissions.length}</p>
          </Card>
          <Card className="p-6 bg-white shadow-sm border-accent/10">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Highest Score</span>
            </div>
            <p className="text-4xl font-black">{studentSubmissions.length > 0 ? Math.max(...studentSubmissions.map(s => s.score)) : 0}</p>
          </Card>
          <Card className="p-6 bg-white shadow-sm border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Avg Mastery</span>
            </div>
            <p className="text-4xl font-black">
              {studentSubmissions.length > 0 
                ? Math.round((studentSubmissions.reduce((acc, s) => acc + (s.score/s.total), 0) / studentSubmissions.length) * 100) 
                : 0}%
            </p>
          </Card>
        </div>

        <Card className="shadow-elevated bg-white border-primary/5">
          <CardHeader>
            <CardTitle>Leaderboard & Individual Results</CardTitle>
            <CardDescription>Detailed list of every student who attempted this quiz.</CardDescription>
          </CardHeader>
          <CardContent>
            {studentSubmissions.length === 0 ? (
              <p className="text-center py-10 text-muted-foreground italic">No submissions yet.</p>
            ) : (
              <div className="divide-y">
                {studentSubmissions.map((sub, idx) => (
                  <div key={sub.id} className="py-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                        #{idx + 1}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{sub.student?.fullName || 'Unknown Student'}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(sub.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-gradient">
                        {sub.score} / {sub.total}
                      </div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Final Score
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}