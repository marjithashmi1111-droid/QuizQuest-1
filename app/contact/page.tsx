"use client";

import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Label } from "../../components/ui/Input";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required"),
});

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      contactSchema.parse(formData);
      // Mock API Delay
      await new Promise(r => setTimeout(r, 1000));
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((i) => toast.error(i.message));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-hero py-20 text-center">
        <h1 className="text-5xl font-bold">Get in <span className="text-gradient">Touch</span></h1>
        <p className="text-xl text-muted-foreground mt-4">We're here to help you revolutionize learning.</p>
      </section>
      
      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8 max-w-6xl">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Information</h2>
          <Card className="p-6 bg-white hover:shadow-glow transition-smooth">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="text-primary w-5 h-5" />
              </div>
              <span>info@quizquest.com</span>
            </div>
          </Card>
          <Card className="p-6 bg-white hover:shadow-glow transition-smooth">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="text-primary w-5 h-5" />
              </div>
              <span>+1 (555) 123-4567</span>
            </div>
          </Card>
          <Card className="p-6 bg-white hover:shadow-glow transition-smooth">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="text-primary w-5 h-5" />
              </div>
              <span>123 Education St, ED 12345</span>
            </div>
          </Card>
        </div>

        <Card className="lg:col-span-2 p-8 bg-white shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Your Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="What's this about?" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <textarea 
                className="w-full p-2 border rounded h-32 text-sm focus:ring-2 focus:ring-primary outline-none transition-smooth" 
                placeholder="How can we help?" 
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
              />
            </div>
            <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
