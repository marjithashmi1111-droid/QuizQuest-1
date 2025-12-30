"use client";

import React from "react";
import { Card } from "../../components/ui/Card";
import { Target, Eye, Award, Users, Sparkles, TrendingUp, Zap } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Leveraging AI and modern technology to revolutionize educational assessment",
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Clear, honest communication with detailed analytics and reporting",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Commitment to delivering the highest quality educational tools",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive ecosystem for educators and learners worldwide",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              About <span className="text-gradient">QuizQuest</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              QuizQuest is an AI-powered educational platform that revolutionizes quiz creation and assessment.
              Our mission is to empower educators with intelligent tools while making learning engaging for students.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-elevated transition-smooth border-border/50 group bg-white"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-smooth">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
