"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input, Label } from "../../../components/ui/Input";
import { ArrowLeft, Save, Sliders } from "lucide-react";
import { toast } from "sonner";

export default function TeacherSettingsPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const myQuizzes = allQuizzes.filter((q: any) => q.createdBy === user.id);
    setQuizzes(myQuizzes);
    setLoading(false);
  }, []);

  const updateSetting = (quizId: string, key: string, value: any) => {
    setQuizzes(prev => prev.map(q => q.id === quizId ? { ...q, [key]: value } : q));
  };

  const handleSave = () => {
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const otherQuizzes = allQuizzes.filter((q: any) => q.createdBy !== user.id);
    localStorage.setItem("qq_quizzes", JSON.stringify([...otherQuizzes, ...quizzes]));
    toast.success("Settings saved successfully!");
  };

  if (loading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Quiz Settings</h1>
            <p className="text-muted-foreground">Configure pagination, shuffling, and marks.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/teacher-dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button variant="gradient" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Save All
            </Button>
          </div>
        </div>

        {quizzes.length === 0 ? (
          <Card className="p-10 text-center"><p className="text-muted-foreground">No quizzes found.</p></Card>
        ) : (
          <div className="space-y-6">
            {quizzes.map(quiz => (
              <Card key={quiz.id} className="shadow-sm border-primary/10 overflow-hidden">
                <CardHeader className="bg-primary/5 py-4">
                  <div className="flex items-center gap-3">
                    <Sliders className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Questions Per Page</Label>
                      <Input type="number" min="1" value={quiz.questionsPerPage || 1} onChange={e => updateSetting(quiz.id, "questionsPerPage", parseInt(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Marks Per Question</Label>
                      <Input type="number" min="1" value={quiz.defaultMarksPerQuestion || 1} onChange={e => updateSetting(quiz.id, "defaultMarksPerQuestion", parseInt(e.target.value))} />
                    </div>
                  </div>
                  <div className="space-y-4 pt-6">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={!!quiz.shuffleQuestions} onChange={e => updateSetting(quiz.id, "shuffleQuestions", e.target.checked)} id={`shuffle-q-${quiz.id}`} />
                      <Label htmlFor={`shuffle-q-${quiz.id}`}>Shuffle Questions</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={!!quiz.shuffleOptions} onChange={e => updateSetting(quiz.id, "shuffleOptions", e.target.checked)} id={`shuffle-o-${quiz.id}`} />
                      <Label htmlFor={`shuffle-o-${quiz.id}`}>Shuffle Options</Label>
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