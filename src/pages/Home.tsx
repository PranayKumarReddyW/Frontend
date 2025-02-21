import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { BackgroundPattern } from "../components/ui/background-particles";
import { Link } from 'react-router-dom';

const Hero06 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-2xl">
        <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
          Simplifying College Event Management
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
          Centralized College Event Management System
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          A web-based platform for seamless event creation, student registrations, 
          and attendance tracking using secure QR codes. Empowering colleges with 
          organized, efficient, and fraud-free event management.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
         <Link to="/signup">
         <Button size="lg" className="rounded-full text-base">
            Get Started <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default Hero06;
