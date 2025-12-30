
import React from "react";
import { Card } from "../components/ui/Card";
import { Target, Eye, Award, Users, Sparkles, TrendingUp, Heart, Zap } from "lucide-react";

const About = () => {
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

  const team = [
    {
      role: "Mission",
      title: "Empowering Education",
      description:
        "Our mission is to transform the way educators create and manage assessments by providing intelligent, efficient, and user-friendly quiz creation tools that save time and enhance learning outcomes.",
    },
    {
      role: "Vision",
      title: "Future of Learning",
      description:
        "We envision a world where every educator has access to powerful AI-driven tools that make creating engaging, personalized assessments effortless, enabling them to focus on what truly matters - teaching.",
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

      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-8 border-border/50 shadow-elevated hover:shadow-glow transition-smooth group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-smooth" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">The Beginning</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    QuizQuest was founded by a team of educators and technologists who recognized the challenges teachers face in creating assessments.
                  </p>
                </div>
              </Card>

              <Card className="p-8 border-border/50 shadow-elevated hover:shadow-glow transition-smooth group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-smooth" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">The Innovation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    With AI power and modern technologies, we set out to build a platform that would revolutionize the assessment process.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {team.map((item, index) => (
              <Card
                key={index}
                className="p-10 hover:shadow-elevated transition-smooth border-border/50 group hover:border-primary/50 relative overflow-hidden bg-white"
              >
                <div className="relative space-y-6">
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-primary text-white rounded-full text-sm font-semibold shadow-glow">
                    <Sparkles className="w-4 h-4" />
                    {item.role}
                  </div>
                  <h3 className="text-4xl font-bold group-hover:text-primary transition-smooth">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Our Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-elevated transition-smooth border-border/50 group hover:border-primary/50 relative overflow-hidden bg-white"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 group-hover:rotate-6 transition-smooth">
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-smooth">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
