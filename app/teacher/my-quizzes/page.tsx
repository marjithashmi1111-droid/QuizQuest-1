"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { BookOpen, Trash2, Eye, Plus, Search } from "lucide-react";
import { toast } from "sonner";

export default function MyQuizzesPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("qq_current_user") || "{}");
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const myQuizzes = allQuizzes.filter((q: any) => q.createdBy === currentUser.id);
    setQuizzes(myQuizzes);
  }, []);

  const deleteQuiz = (id: string) => {
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const updated = allQuizzes.filter((q: any) => q.id !== id);
    localStorage.setItem("qq_quizzes", JSON.stringify(updated));
    setQuizzes(quizzes.filter(q => q.id !== id));
    toast.success("Quiz deleted successfully");
  };

  const filtered = quizzes.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-gradient">My Quizzes</h1>
            <p className="text-muted-foreground">Manage your collection of AI-generated assessments</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                placeholder="Search your quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="gradient" onClick={() => navigate("/create-quiz")}>
              <Plus className="w-4 h-4 mr-2" />
              New Quiz
            </Button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <Card className="p-20 text-center border-dashed border-2 bg-transparent">
            <div className="max-w-xs mx-auto space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="text-muted-foreground w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">No quizzes yet</h3>
              <p className="text-muted-foreground">Use our AI generator to create your first assessment in seconds.</p>
              <Button onClick={() => navigate("/create-quiz")}>Get Started</Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-glow transition-smooth border-primary/10 overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase tracking-wider">
                      {quiz.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Questions:</span>
                    <span className="font-bold">{quiz.numberOfQuestions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="font-bold text-accent">{quiz.difficulty}</span>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => navigate(`/quiz/${quiz.id}`)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => deleteQuiz(quiz.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
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