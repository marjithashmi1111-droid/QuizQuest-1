"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, Award, Calendar, CheckCircle, BarChart } from "lucide-react";

export default function StudentResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const allResults = JSON.parse(localStorage.getItem("qq_results") || "[]");
    const myResults = allResults
      .filter((r: any) => r.userId === user.id)
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setResults(myResults);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/student-dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gradient">My Performance</h1>
        </div>

        {results.length === 0 ? (
          <Card className="p-20 text-center">
            <BarChart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground italic">You haven't completed any quizzes yet.</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {results.map(res => (
              <Card key={res.id} className="shadow-sm hover:shadow-md transition-shadow border-primary/10 overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-primary/5 p-6 flex items-center justify-center md:w-48 border-r">
                    <div className="text-center">
                      <div className="text-4xl font-black text-primary">
                        {Math.round((res.score / res.total) * 100)}%
                      </div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Score</div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{res.quizTitle}</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                          {res.score} / {res.total} Points
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(res.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" disabled>Review Answers (Coming Soon)</Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}