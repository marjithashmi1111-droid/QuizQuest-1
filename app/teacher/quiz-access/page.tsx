"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, UserCheck, UserX, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TeacherQuizAccessPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [connectedStudents, setConnectedStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const currentQuiz = allQuizzes.find((q: any) => q.id === quizId);
    
    if (!currentQuiz) {
      toast.error("Quiz not found");
      navigate("/teacher/my-quizzes");
      return;
    }

    setQuiz(currentQuiz);

    const connections = JSON.parse(localStorage.getItem("qq_connections") || "[]");
    const myStudents = connections
      .filter((c: any) => c.teacherId === user.id && c.status === "accepted")
      .map((c: any) => {
        const users = JSON.parse(localStorage.getItem("qq_users") || "[]");
        return users.find((u: any) => u.id === c.studentId);
      })
      .filter(Boolean);

    setConnectedStudents(myStudents);
    setLoading(false);
  }, [quizId, navigate]);

  const toggleAttendance = (studentId: string) => {
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const updatedQuizzes = allQuizzes.map((q: any) => {
      if (q.id === quizId) {
        const records = q.attendanceRecords || {};
        records[studentId] = !records[studentId];
        return { ...q, attendanceRecords: records };
      }
      return q;
    });

    localStorage.setItem("qq_quizzes", JSON.stringify(updatedQuizzes));
    setQuiz(updatedQuizzes.find((q: any) => q.id === quizId));
    toast.success("Attendance updated");
  };

  const toggleAccess = (studentId: string) => {
    const allQuizzes = JSON.parse(localStorage.getItem("qq_quizzes") || "[]");
    const updatedQuizzes = allQuizzes.map((q: any) => {
      if (q.id === quizId) {
        const allowed = q.allowedStudents || [];
        if (allowed.includes(studentId)) {
          return { ...q, allowedStudents: allowed.filter((id: string) => id !== studentId) };
        } else {
          return { ...q, allowedStudents: [...allowed, studentId] };
        }
      }
      return q;
    });

    localStorage.setItem("qq_quizzes", JSON.stringify(updatedQuizzes));
    setQuiz(updatedQuizzes.find((q: any) => q.id === quizId));
    toast.success("Access permissions updated");
  };

  if (loading) return <div className="pt-32 text-center"><Loader2 className="animate-spin inline mr-2" /> Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/teacher/my-quizzes")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="text-right">
            <h2 className="text-2xl font-bold">{quiz.title}</h2>
            <p className="text-muted-foreground text-sm">Managing Access & Attendance</p>
          </div>
        </div>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Attendance & Linking</CardTitle>
            <CardDescription>Grant quiz access to connected students based on attendance.</CardDescription>
          </CardHeader>
          <CardContent>
            {connectedStudents.length === 0 ? (
              <p className="text-center py-10 text-muted-foreground italic">No students connected.</p>
            ) : (
              <div className="space-y-4">
                {connectedStudents.map(student => {
                  const isPresent = quiz.attendanceRecords?.[student.id];
                  const isAllowed = quiz.allowedStudents?.includes(student.id);

                  return (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/10 transition-colors bg-white">
                      <div>
                        <p className="font-bold">{student.fullName}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant={isPresent ? "default" : "outline"} 
                          size="sm"
                          onClick={() => toggleAttendance(student.id)}
                          className={isPresent ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                        >
                          {isPresent ? <UserCheck className="w-4 h-4 mr-1" /> : <UserX className="w-4 h-4 mr-1" />}
                          {isPresent ? "Present" : "Absent"}
                        </Button>
                        <Button 
                          variant={isAllowed ? "default" : "outline"} 
                          size="sm"
                          onClick={() => toggleAccess(student.id)}
                          className={isAllowed ? "bg-primary text-white" : ""}
                        >
                          {isAllowed ? <ShieldCheck className="w-4 h-4 mr-1" /> : <ShieldAlert className="w-4 h-4 mr-1" />}
                          {isAllowed ? "Allowed" : "Restricted"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}