
import React from "react";
import { Card } from "../components/ui/Card";
import { Sparkles, FileText, BrainCircuit, BarChart3, Users2, Timer } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: BrainCircuit,
      title: "AI Quiz Generation",
      description: "Our advanced AI analyzes your documents and instantly crafts balanced, challenging questions across multiple difficulty levels."
    },
    {
      icon: FileText,
      title: "Multi-Format Import",
      description: "Upload PDFs, Word docs, or even paste raw text. We support major academic formats for seamless conversion."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Gain deep insights into student performance with heatmaps, topic mastery charts, and class-wide trends."
    },
    {
      icon: Timer,
      title: "Proctoring Tools",
      description: "Ensure academic integrity with customizable timers, tab-switch detection, and randomized question orders."
    },
    {
      icon: Users2,
      title: "Student Tracking",
      description: "Maintain a clear history of every student's progress, attendance, and growth over time in your personalized dashboard."
    },
    {
      icon: Sparkles,
      title: "Personalized Learning",
      description: "The platform suggests review topics for students based on their quiz results, fostering a loop of continuous improvement."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Powerful <span className="text-gradient">Services</span> for Modern Education
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to create, manage, and scale your educational assessments with AI.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Card key={i} className="p-8 hover:shadow-elevated transition-smooth border-border/50 group hover:border-primary/40 bg-white">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-primary transition-smooth">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-smooth" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/20 border-y border-border/50">
        <div className="container mx-auto px-4 text-center">
          <Card className="p-12 max-w-4xl mx-auto bg-gradient-primary text-white shadow-glow">
            <h2 className="text-4xl font-bold mb-6">Ready to transform your classroom?</h2>
            <p className="text-lg mb-8 opacity-90">Join 10,000+ educators who have already switched to QuizQuest for their assessment needs.</p>
            <button className="bg-white text-primary font-bold px-8 py-4 rounded-lg hover:scale-105 transition-smooth">
              Get Started for Free
            </button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Services;
