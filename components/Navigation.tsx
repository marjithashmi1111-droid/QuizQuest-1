"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { Menu, X, GraduationCap, Sparkles } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled || location.pathname !== "/"
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow transition-smooth group-hover:scale-110 group-hover:rotate-3">
              <GraduationCap className="w-7 h-7 text-white" />
              <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient leading-none">
                QuizQuest
              </span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase">
                AI-Powered Learning
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-smooth relative group ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform origin-left transition-smooth ${
                    isActive(item.path)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}

            <Button
              variant="gradient"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top bg-background">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <Button
                variant="gradient"
                className="mx-4"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/auth");
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
