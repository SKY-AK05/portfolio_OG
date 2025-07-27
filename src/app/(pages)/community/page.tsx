import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, UserCheck, Users } from "lucide-react";

const TestimonialCard = ({ quote, author, role, className, icon }: { quote: string; author: string; role: string; className?: string, icon: React.ReactNode }) => (
  <Card className={`hand-drawn bg-card/90 ${className}`}>
    <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
      <div className="p-3 rounded-full bg-primary/20 text-primary">{icon}</div>
      <div>
        <CardTitle className="text-2xl">{author}</CardTitle>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-foreground/80 italic">"{quote}"</p>
    </CardContent>
  </Card>
);

export default function CommunityPage() {
  return (
    <div className="space-y-16">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold">Who I Build For</h1>
        <p className="mt-6 text-lg text-foreground/80">
          I'm dedicated to supporting those who often navigate invisible struggles. My goal is to provide non-performative help and build tools that offer genuine emotional clarity and a sense of control.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        <TestimonialCard
          icon={<Sparkles />}
          author="Jamie L."
          role="Junior Developer & Mentee"
          quote="SNiFF helped me see my ADHD not as a bug, but as a feature. Their guidance was a game-changer for my confidence and my code."
          className="transform rotate-2"
        />
        <TestimonialCard
          icon={<UserCheck />}
          author="Alex R."
          role="User of Reva"
          quote="Finally, a task manager that doesn't make me feel overwhelmed. It's like it was designed for my brain."
          className="md:mt-8 transform -rotate-1"
        />
        <TestimonialCard
          icon={<Users />}
          author="Morgan K."
          role="Workshop Collaborator"
          quote="Working with SNiFF is a lesson in empathy. They bring a level of human-centric thinking that elevates every project."
          className="lg:mt-16 transform rotate-1"
        />
         <TestimonialCard
          icon={<Sparkles />}
          author="Casey B."
          role="Fellow Neurodivergent Coder"
          quote="Finding SNiFF's work was a relief. It's proof that you can build successful things without sacrificing your well-being."
          className="transform -rotate-2"
        />
         <TestimonialCard
          icon={<UserCheck />}
          author="Taylor P."
          role="User of PromptWeaver"
          quote="I used to struggle with structuring my thoughts for AI prompts. This tool brought so much clarity. It's brilliant."
          className="md:mt-8 transform rotate-1"
        />
        <TestimonialCard
          icon={<Users />}
          author="Sam D."
          role="Open Source Contributor"
          quote="SNiFF fosters such an inclusive and safe environment. Contributing to their projects is always a positive experience."
          className="lg:mt-12 transform -rotate-1"
        />
      </section>
    </div>
  )
}
