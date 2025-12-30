"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, UserPlus, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function ConnectionRequestsPage() {
  const navigate = useNavigate();
  const [incoming, setIncoming] = useState<any[]>([]);
  const [linked, setLinked] = useState<any[]>([]);

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const connections = JSON.parse(localStorage.getItem("qq_connections") || "[]");
    const allUsers = JSON.parse(localStorage.getItem("qq_users") || "[]");

    const myIncoming = connections
      .filter((c: any) => c.teacherId === user.id && c.status === "pending")
      .map((c: any) => ({ ...c, student: allUsers.find((u: any) => u.id === c.studentId) }));
    
    const myLinked = connections
      .filter((c: any) => c.teacherId === user.id && c.status === "accepted")
      .map((c: any) => ({ ...c, student: allUsers.find((u: any) => u.id === c.studentId) }));

    setIncoming(myIncoming);
    setLinked(myLinked);
  };

  const handleAction = (connectionId: string, status: "accepted" | "rejected") => {
    const connections = JSON.parse(localStorage.getItem("qq_connections") || "[]");
    const updated = connections.map((c: any) => {
      if (c.id === connectionId) return { ...c, status };
      return c;
    });
    localStorage.setItem("qq_connections", JSON.stringify(updated));
    toast.success(`Request ${status}`);
    loadConnections();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-5xl space-y-8">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/teacher-dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-gradient">Student Links</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-elevated bg-white">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="text-xl flex items-center gap-2"><UserPlus className="w-5 h-5" /> Pending Requests</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {incoming.length === 0 ? <p className="text-center text-muted-foreground italic">No requests.</p> : incoming.map(c => (
                <div key={c.id} className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-bold">{c.student?.fullName}</p>
                    <p className="text-xs text-muted-foreground">{c.student?.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAction(c.id, "accepted")} className="bg-green-600 hover:bg-green-700">Accept</Button>
                    <Button size="sm" onClick={() => handleAction(c.id, "rejected")} variant="outline">Reject</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-elevated bg-white">
            <CardHeader className="bg-accent/5 border-b">
              <CardTitle className="text-xl">Connected Students</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              {linked.length === 0 ? <p className="text-center text-muted-foreground italic">No connections.</p> : linked.map(c => (
                <div key={c.id} className="flex items-center gap-4 p-4 border rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent">{c.student?.fullName.charAt(0)}</div>
                  <div>
                    <p className="font-bold">{c.student?.fullName}</p>
                    <p className="text-xs text-muted-foreground">{c.student?.email}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}