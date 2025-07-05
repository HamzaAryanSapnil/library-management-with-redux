
import {  Heart, GitBranch, Link } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-4 flex justify-center items-center w-full border-t py-6 bg-background text-muted-foreground text-sm font-lato">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-center md:text-left">
          <img
            src="/lib-logo.jpeg"
            alt="Library Management System Logo"
            className="w-12 h-8 "
          />
          <span className="font-semibold text-foreground">
            Library Management System
          </span>
        </div>

        <p className="text-center md:text-left">
          Built with <span className="text-primary font-semibold">React</span>,{" "}
          <span className="text-primary font-semibold">Redux Toolkit</span> &{" "}
          <span className="text-primary font-semibold">TypeScript</span>
        </p>

        <div className="flex gap-4">
          <Link
            to="https://github.com/your-repo"
            target="_blank"
            className="hover:text-primary transition"
          >
            <GitBranch className="w-5 h-5" />
          </Link>
          <span className="hidden md:inline text-xs text-muted-foreground">
            © {new Date().getFullYear()} | Made with{" "}
            <Heart className="inline w-4 h-4 text-red-500" /> by Hamza Aryan
            Sapnil
          </span>
        </div>
      </div>
    </footer>
  );
}
