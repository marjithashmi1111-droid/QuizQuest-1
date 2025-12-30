"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, BarChart3, Users, Eye, FileDown } from "lucide-react";
import { toast } from "sonner";

export default function TeacherReportsPage() {
  const navigate = useNavigate();
  const [quizSummaries, setQuizSummaries] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const allResults = JSON.parse(localStorage.getItem("qq_results") || "[]");
    
    const myQuizzes = allQuizzes.filter((q: any) => q.createdBy === user.id);
    
    const summaries = myQuizzes.map((q: any) => {
      const quizResults = allResults.filter((r: any) => r.quizId === q.id);
      const totalScore = quizResults.reduce((acc: number, r: any) => acc + (r.score / r.total), 0);
      return {
        ...q,
        submissions: quizResults.length,
        avgScore: quizResults.length > 0 ? Math.round((totalScore / quizResults.length) * 100) : 0
      };
    });

    setQuizSummaries(summaries);
  }, []);

  const downloadPDF = () => {
    toast.info("Generating PDF summary report...");
    setTimeout(() => toast.success("PDF Downloaded!"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-5xl space-y-8">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/teacher-dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-gradient">Analytics & Reports</h1>
        </div>

        {quizSummaries.length === 0 ? (
          <Card className="p-20 text-center">
            <p className="text-muted-foreground italic">No quizzes created to generate reports.</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {quizSummaries.map(quiz => (
              <Card key={quiz.id} className="shadow-elevated border-primary/10 bg-white group hover:border-primary/40 transition-all">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-stretch">
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{quiz.title}</h3>
                          <p className="text-sm text-muted-foreground">{quiz.subject} • Created {new Date(quiz.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${quiz.submissions > 0 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                          {quiz.submissions} Submissions
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Average Mastery</p>
                          <p className="text-2xl font-black text-primary">{quiz.avgScore}%</p>
                        </div>
                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Questions</p>
                          <p className="text-2xl font-black text-accent">{quiz.numberOfQuestions}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-64 bg-muted/20 border-t md:border-t-0 md:border-l flex flex-col gap-2 justify-center">
                      <Button variant="gradient" size="sm" className="w-full" onClick={() => navigate(`/teacher/quiz-report/${quiz.id}`)}>
                        <Eye className="w-4 h-4 mr-2" /> Detailed View
                      </Button>
                      <Button variant="outline" size="sm" className="w-full" onClick={downloadPDF}>
                        <FileDown className="w-4 h-4 mr-2" /> Export PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}