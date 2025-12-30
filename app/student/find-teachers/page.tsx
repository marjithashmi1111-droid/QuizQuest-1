"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { toast } from "sonner";
import { Search, UserPlus, ArrowLeft, Loader2 } from "lucide-react";

export default function FindTeachersPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pendingIds, setPendingIds] = useState<string[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const connections = JSON.parse(localStorage.getItem("qq_connections") || "[]");
    const pending = connections
      .filter((c: any) => c.studentId === user.id)
      .map((c: any) => c.teacherId);
    setPendingIds(pending);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const allUsers = JSON.parse(localStorage.getItem("qq_users") || "[]");
      const teachers = allUsers.filter((u: any) => 
        u.role === "teacher" && 
        (u.fullName.toLowerCase().includes(query.toLowerCase()) || 
         u.email.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(teachers);
      setLoading(false);
    }, 500);
  };

  const sendRequest = (teacherId: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const connections = JSON.parse(localStorage.getItem("qq_connections") || "[]");
    
    if (connections.find((c: any) => c.studentId === user.id && c.teacherId === teacherId)) {
      return toast.info("Request already sent.");
    }

    const newRequest = {
      id: Math.random().toString(36).substr(2, 9),
      studentId: user.id,
      teacherId: teacherId,
      status: "pending",
      timestamp: new Date().toISOString()
    };

    connections.push(newRequest);
    localStorage.setItem("qq_connections", JSON.stringify(connections));
    setPendingIds(prev => [...prev, teacherId]);
    toast.success("Request sent to teacher!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/student-dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-gradient">Find Teachers</h1>
        </div>

        <Card className="p-6 bg-white shadow-elevated">
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input className="pl-10 h-12" placeholder="Search by name or email..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
            </div>
            <Button size="lg" onClick={handleSearch} disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : "Search"}</Button>
          </div>
        </Card>

        <div className="grid gap-4">
          {results.length === 0 ? (
            query && !loading && <p className="text-center py-10 text-muted-foreground italic">No teachers found.</p>
          ) : results.map(teacher => (
            <Card key={teacher.id} className="p-6 flex items-center justify-between group hover:border-primary/50 transition-all bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">{teacher.fullName.charAt(0)}</div>
                <div>
                  <h4 className="font-bold text-lg">{teacher.fullName}</h4>
                  <p className="text-sm text-muted-foreground">{teacher.email}</p>
                </div>
              </div>
              <Button 
                variant={pendingIds.includes(teacher.id) ? "outline" : "gradient"} 
                disabled={pendingIds.includes(teacher.id)}
                onClick={() => sendRequest(teacher.id)}
              >
                {pendingIds.includes(teacher.id) ? "Request Sent" : "Connect"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}