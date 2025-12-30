
import React, { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input, Label } from "../components/ui/Input";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required"),
});

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      contactSchema.parse(formData);
      await new Promise(r => setTimeout(r, 1000));
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      // Fix: Use 'issues' instead of 'errors' as per ZodError definition
      if (error instanceof z.ZodError) {
        error.issues.forEach(err => toast.error(err.message));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We're here to help you enhance your teaching and learning experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Contact Information</h2>
              <div className="space-y-4">
                {[
                  { icon: Mail, title: "Email", value: "info@quizquest.com" },
                  { icon: Phone, title: "Phone", value: "+1 (555) 123-4567" },
                  { icon: MapPin, title: "Address", value: "123 Education St, ED 12345" },
                ].map((info, i) => (
                  <Card key={i} className="p-4 hover:shadow-glow transition-smooth border-border/50 group bg-white">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{info.title}</h3>
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="lg:col-span-2 p-8 shadow-elevated border-border/50 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subject *</Label>
                  <Input value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="Subject" />
                </div>
                <div className="space-y-2">
                  <Label>Message *</Label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder="Your message..."
                  />
                </div>
                <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
