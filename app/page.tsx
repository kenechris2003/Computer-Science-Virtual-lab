import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Code2,
  Globe,
  Database,
  Terminal,
  GraduationCap,
  Zap,
  Shield,
  Wifi,
  ChevronRight,
  Star,
  Users,
  BookOpen,
  Smartphone,
  Clock,
  Award,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-surface-200 bg-white/80 backdrop-blur-md dark:border-surface-800 dark:bg-surface-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">Virtual Lab</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-surface-600 hover:text-surface-900 dark:text-surface-400">Features</a>
            <a href="#courses" className="text-sm text-surface-600 hover:text-surface-900 dark:text-surface-400">Courses</a>
            <a href="#how-it-works" className="text-sm text-surface-600 hover:text-surface-900 dark:text-surface-400">How It Works</a>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-surface-900 dark:via-surface-950 dark:to-surface-900" />
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
            <Zap className="h-4 w-4" />
            Built for Nigerian Computer Science Students
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-surface-900 lg:text-6xl dark:text-white">
            Practice Coding Anywhere,
            <br />
            <span className="text-primary-600">Anytime</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-surface-600 dark:text-surface-400">
            A virtual laboratory designed for 100 & 200 level Nigerian Computer Science students.
            Write code, run programs, practice SQL, and learn Linux — all from your browser.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start Learning Free <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-surface-200 pt-8 sm:grid-cols-4 dark:border-surface-800">
            {[
              { label: "Students", value: "2,500+", icon: Users },
              { label: "Exercises", value: "150+", icon: BookOpen },
              { label: "Labs", value: "5", icon: Code2 },
              { label: "Universities", value: "12", icon: GraduationCap },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary-600" />
                <div className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-surface-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-surface-900 dark:text-white">Everything You Need</h2>
            <p className="mx-auto max-w-2xl text-surface-600 dark:text-surface-400">
              A complete virtual laboratory with all the tools you need for your Computer Science practicals.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Code2,
                title: "Programming Lab",
                description: "Write and execute Python and Java code with syntax highlighting and auto-save.",
                color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
              },
              {
                icon: Globe,
                title: "Web Development",
                description: "Build HTML, CSS, and JavaScript projects with live preview and instant feedback.",
                color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
              },
              {
                icon: Database,
                title: "SQL Playground",
                description: "Practice SQL queries with a mock database. Learn SELECT, JOIN, GROUP BY and more.",
                color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
              },
              {
                icon: Terminal,
                title: "Linux Terminal",
                description: "Master Linux commands in a safe simulated environment. No setup required.",
                color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
              },
            ].map((feature) => (
              <div key={feature.title} className="card group">
                <div className={`mb-4 inline-flex rounded-xl p-3 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-surface-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-surface-50 px-4 py-20 dark:bg-surface-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-surface-900 dark:text-white">
                Built for the Nigerian Context
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Wifi,
                    title: "Low Bandwidth Optimized",
                    description: "Works efficiently even on slow internet connections. Minimal data usage.",
                  },
                  {
                    icon: Smartphone,
                    title: "Mobile-First Design",
                    description: "Fully responsive. Practice on your phone, tablet, or laptop.",
                  },
                  {
                    icon: Shield,
                    title: "Secure & Reliable",
                    description: "Your code and progress are safely stored and backed up.",
                  },
                  {
                    icon: Clock,
                    title: "24/7 Access",
                    description: "Study anytime, anywhere. No lab hours restrictions.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
                      <item.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-surface-600 dark:text-surface-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold">Supported Courses</h3>
              <div className="space-y-3">
                {[
                  "CSC101 - Introduction to Computer Science",
                  "CSC102 - Programming Fundamentals",
                  "CSC201 - Data Structures & Algorithms",
                  "CSC202 - Web Development",
                  "CSC203 - Database Systems",
                  "CSC204 - Operating Systems",
                ].map((course) => (
                  <div key={course} className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                    <BookOpen className="h-5 w-5 shrink-0" />
                    <span className="text-sm">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-surface-900 dark:text-white">How It Works</h2>
            <p className="mx-auto max-w-2xl text-surface-600 dark:text-surface-400">
              Get started in minutes. No installations, no setup required.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", title: "Create Account", description: "Sign up with your university email and matric number in under 2 minutes." },
              { step: "02", title: "Choose a Lab", description: "Select from Programming, Web Dev, Database, or OS labs based on your course." },
              { step: "03", title: "Start Coding", description: "Write, run, and save your code. Track your progress and earn points." },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-surface-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface-50 px-4 py-20 dark:bg-surface-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-surface-900 dark:text-white">What Students Say</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                name: "Chinedu O.",
                level: "200 Level",
                university: "University of Ibadan",
                text: "Virtual Lab saved me during exam preparation. I could practice SQL queries at home without needing to go to the school lab.",
              },
              {
                name: "Amina I.",
                level: "100 Level",
                university: "University of Ibadan",
                text: "The Linux terminal simulator helped me understand commands before our practical exam. Highly recommended for all CS students!",
              },
              {
                name: "Emmanuel A.",
                level: "200 Level",
                university: "University of Ibadan",
                text: "Being able to code on my phone during commute is a game changer. The auto-save feature ensures I never lose my work.",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="card">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm text-surface-600 dark:text-surface-400">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-xs text-surface-500">{testimonial.level} &middot; {testimonial.university}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-center text-white lg:p-16">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
          <p className="mb-8 text-primary-100">
            Join thousands of Nigerian Computer Science students already using Virtual Lab.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button variant="secondary" size="lg" className="w-full bg-white text-primary-700 hover:bg-primary-50 sm:w-auto">
                <Award className="mr-2 h-4 w-4" /> Create Free Account
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto">
                Already have an account?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-200 bg-surface-50 px-4 py-12 dark:border-surface-800 dark:bg-surface-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span className="font-bold">Virtual Lab</span>
              </div>
              <p className="text-sm text-surface-500">
                Empowering Nigerian Computer Science students with accessible, practical learning tools.
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-surface-900 dark:text-white">Platform</h4>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                <li><a href="#" className="hover:text-primary-600">Programming Lab</a></li>
                <li><a href="#" className="hover:text-primary-600">Web Development</a></li>
                <li><a href="#" className="hover:text-primary-600">Database Lab</a></li>
                <li><a href="#" className="hover:text-primary-600">Linux Terminal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-surface-900 dark:text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                <li><a href="#" className="hover:text-primary-600">Documentation</a></li>
                <li><a href="#" className="hover:text-primary-600">API Reference</a></li>
                <li><a href="#" className="hover:text-primary-600">Community</a></li>
                <li><a href="#" className="hover:text-primary-600">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-surface-900 dark:text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                <li>support@virtuallab.edu.ng</li>
                <li>+234 800 123 4567</li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-surface-200 pt-8 text-center text-sm text-surface-500 dark:border-surface-800">
            &copy; 2026 Virtual Lab Nigeria. All rights reserved. Built for Nigerian Computer Science Students.
          </div>
        </div>
      </footer>
    </div>
  );
}