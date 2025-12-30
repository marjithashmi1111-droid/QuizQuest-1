"use client";

import React from "react";
import { Card } from "../../components/ui/Card";
import { BrainCircuit, FileText, BarChart3, Timer, Users2, Sparkles } from "lucide-react";

export default function ServicesPage() {
  const services = [
    { icon: BrainCircuit, title: "AI Quiz Generation", description: "Instantly craft challenging questions from your documents." },
    { icon: FileText, title: "Multi-Format Import", description: "Support for PDFs, Word docs, and more." },
    { icon: BarChart3, title: "Advanced Analytics", description: "Deep insights into performance and mastery." },
    { icon: Timer, title: "Proctoring Tools", description: "Timers and randomized questions for integrity." },
    { icon: Users2, title: "Student Tracking", description: "Maintain clear history and growth records." },
    { icon: Sparkles, title: "Personalized Learning", description: "Automated review suggestions based on results." }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Powerful <span className="text-gradient">Services</span></h1>
          <p className="text-xl text-muted-foreground">Scale your assessments with AI efficiency.</p>
        </div>
      </section>
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Card key={i} className="p-8 group bg-white hover:border-primary/40 transition-smooth">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-smooth">
                <s.icon className="w-7 h-7 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground">{s.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
