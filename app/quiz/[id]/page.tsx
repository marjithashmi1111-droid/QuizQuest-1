"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Loader2, ArrowLeft, Timer as TimerIcon, Award, CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!id) return;
    fetchQuiz();
  }, [id]);

  const fetchQuiz = () => {
    setLoading(true);
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const found = allQuizzes.find((q: any) => q.id === id);
    
    if (found) {
      setQuiz(found);
      setQuestions(found.questions || []);
      setTimeLeft((found.timeLimit || 30) * 60);
    } else {
      toast.error("Quiz not found");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFinished || timeLeft <= 0 || !quiz) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, quiz]);

  const handleSelect = (qIdx: number, optionIdx: number) => {
    setAnswers({ ...answers, [qIdx]: optionIdx });
  };

  const handleFinish = () => {
    if (isFinished) return;
    
    let totalScore = 0;
    questions.forEach((q: any, i: number) => {
      const selected = answers[i];
      if (selected !== undefined && q.options[selected].isCorrect) {
        totalScore += (quiz.defaultMarksPerQuestion || 1);
      }
    });

    setScore(totalScore);
    setIsFinished(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const results = JSON.parse(localStorage.getItem("qq_results") || "[]");
    results.push({
      id: Math.random().toString(36).substr(2, 9),
      quizId: id,
      quizTitle: quiz.title,
      userId: user.id,
      score: totalScore,
      total: questions.length * (quiz.defaultMarksPerQuestion || 1),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("qq_results", JSON.stringify(results));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Quiz not found.</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero pt-20 px-4">
        <Card className="max-w-md w-full text-center p-12 shadow-elevated bg-white">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow">
            <Award className="text-white w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold mb-2">Results</h2>
          <div className="text-6xl font-black text-gradient mb-4">
            {score}/{questions.length * (quiz.defaultMarksPerQuestion || 1)}
          </div>
          <p className="text-muted-foreground mb-8">Your performance has been recorded.</p>
          <Button variant="gradient" className="w-full" onClick={() => navigate("/student-dashboard")}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const qPerPage = quiz.questionsPerPage || 1;
  const totalPages = Math.ceil(questions.length / qPerPage);
  const currentQuestions = questions.slice(currentIdx * qPerPage, (currentIdx + 1) * qPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white border p-4 rounded-xl shadow-sm sticky top-24 z-10">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-primary">Page {currentIdx + 1} of {totalPages}</span>
            <div className="flex items-center gap-2 text-accent font-mono font-bold">
              <TimerIcon className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Exit
          </Button>
        </div>

        <div className="space-y-8">
          {currentQuestions.map((q, localIdx) => {
            const globalIdx = currentIdx * qPerPage + localIdx;
            return (
              <Card key={globalIdx} className="shadow-elevated p-8 bg-white">
                <div className="flex items-start gap-4 mb-8">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {globalIdx + 1}
                  </span>
                  <h3 className="text-xl font-bold leading-tight">{q.questionText}</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {q.options.map((opt: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(globalIdx, i)}
                      className={`p-4 text-left rounded-xl border-2 transition-smooth flex items-center gap-4 ${
                        answers[globalIdx] === i 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {answers[globalIdx] === i ? <CheckCircle2 className="text-primary" /> : <Circle className="text-muted" />}
                      <span className="font-medium">{opt.optionText}</span>
                    </button>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)}>
            Previous
          </Button>
          {currentIdx === totalPages - 1 ? (
            <Button variant="gradient" onClick={handleFinish}>Finish Quiz</Button>
          ) : (
            <Button variant="outline" onClick={() => setCurrentIdx(currentIdx + 1)}>Next</Button>
          )}
        </div>
      </div>
    </div>
  );
}