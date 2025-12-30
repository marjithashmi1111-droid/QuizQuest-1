"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input, Label } from "../../../components/ui/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/Tabs";
import { BrainCircuit, Loader2, Sparkles, Upload, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function CreateQuizPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("topic");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    topic: "",
    numberOfQuestions: "5",
    difficulty: "Medium",
    timeLimit: "30"
  });

  const generateMockQuestions = (title: string, count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      questionText: `Generated Question ${i + 1} regarding ${title}?`,
      options: [
        { optionText: "True/Correct Answer", isCorrect: true },
        { optionText: "Incorrect Alternative A", isCorrect: false },
        { optionText: "Incorrect Alternative B", isCorrect: false },
        { optionText: "Incorrect Alternative C", isCorrect: false },
      ].sort(() => Math.random() - 0.5),
      explanation: `AI-generated explanation for the concept related to ${title}.`
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subject) {
      return toast.error("Please fill in Title and Subject");
    }
    if (activeTab === "file" && !file) {
      return toast.error("Please upload a file first");
    }
    if (activeTab === "topic" && !formData.topic) {
      return toast.error("Please specify a topic");
    }

    setIsLoading(true);
    
    // Simulate AI Workload
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const quizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
      
      const newQuiz = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        subject: formData.subject,
        topic: activeTab === "topic" ? formData.topic : `Extracted from ${file?.name}`,
        numberOfQuestions: parseInt(formData.numberOfQuestions),
        difficulty: formData.difficulty,
        timeLimit: parseInt(formData.timeLimit),
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        questions: generateMockQuestions(formData.title, parseInt(formData.numberOfQuestions)),
        quizStatus: "published",
        allowedStudents: [],
        attendanceRecords: {},
        questionsPerPage: 1,
        shuffleQuestions: true,
        shuffleOptions: true,
        defaultMarksPerQuestion: 1,
      };

      quizzes.push(newQuiz);
      localStorage.setItem("qq_quizzes", JSON.stringify(quizzes));
      
      setIsLoading(false);
      toast.success("AI has successfully built your quiz!");
      navigate("/teacher/my-quizzes");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-elevated border-primary/10 overflow-hidden bg-white/90">
          <CardHeader className="text-center border-b border-border/50 pb-8 bg-primary/5">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <BrainCircuit className="text-white w-10 h-10" />
            </div>
            <CardTitle className="text-3xl font-bold">AI Quiz Factory</CardTitle>
            <CardDescription>Convert documents or ideas into assessments instantly</CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 bg-muted/50 p-1">
                <TabsTrigger value="topic" activeValue={activeTab} onClick={() => setActiveTab("topic")}>Topic Based</TabsTrigger>
                <TabsTrigger value="file" activeValue={activeTab} onClick={() => setActiveTab("file")}>File Upload</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quiz Title</Label>
                    <Input 
                      placeholder="e.g. History Final" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input 
                      placeholder="e.g. World History" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <TabsContent value="topic" activeValue={activeTab}>
                  <div className="space-y-2">
                    <Label>Target Topic</Label>
                    <Input 
                      placeholder="e.g. French Revolution causes and effects" 
                      value={formData.topic}
                      onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="file" activeValue={activeTab}>
                  <div className="space-y-2">
                    <Label>Upload PDF / Word / PPT</Label>
                    <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center bg-muted/30 hover:border-primary/50 transition-colors cursor-pointer relative">
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                      <Upload className="mx-auto w-10 h-10 text-primary opacity-50 mb-3" />
                      <p className="text-sm font-medium text-muted-foreground">
                        {file ? file.name : "Drag and drop your document here"}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Questions</Label>
                    <select className="w-full p-2 rounded-md border border-input bg-background text-sm" value={formData.numberOfQuestions} onChange={e => setFormData({...formData, numberOfQuestions: e.target.value})}>
                      <option value="5">5 Qs</option>
                      <option value="10">10 Qs</option>
                      <option value="20">20 Qs</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <select className="w-full p-2 rounded-md border border-input bg-background text-sm" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time (Mins)</Label>
                    <Input type="number" value={formData.timeLimit} onChange={e => setFormData({...formData, timeLimit: e.target.value})} />
                  </div>
                </div>

                <Button type="submit" variant="gradient" className="w-full h-12 text-lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      AI is building Questions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" />
                      Generate Assessment
                    </>
                  )}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
