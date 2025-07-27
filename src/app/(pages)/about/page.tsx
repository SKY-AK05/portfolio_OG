import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Coffee, Headphones, Milestone } from "lucide-react";
import Image from "next/image";

const TimelineItem = ({ icon, title, description, year }: { icon: React.ReactNode; title: string; description: string; year: string }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
      {icon}
    </div>
    <div className="flex-grow">
      <p className="text-lg font-headline text-primary">{year}</p>
      <h3 className="text-xl font-bold font-headline mt-1">{title}</h3>
      <p className="text-foreground/80 mt-1">{description}</p>
    </div>
  </div>
);

export default function AboutPage() {
  const traits = ["neurodivergent", "systems thinker", "ADHD-friendly", "builder of calm", "digital empathy"];

  return (
    <div className="space-y-16">
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative">
          <Card className="hand-drawn bg-card/80 p-2 transform -rotate-2">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Sketch-style avatar of SNiFF at a desk"
              width={600}
              height={600}
              className="rounded-lg"
              data-ai-hint="sketch avatar"
            />
          </Card>
          <div className="absolute -top-4 -left-4 text-primary animate-float">
            <Coffee size={40} />
          </div>
          <div className="absolute -bottom-4 -right-4 text-primary animate-float" style={{animationDelay: '0.5s'}}>
            <Headphones size={40} />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold">A Little About Me.</h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-prose mx-auto md:mx-0">
            I'm SNiFF, a developer who sees code as a medium for creating clarity and calm. My journey has been less of a straight line and more of a curious exploration, driven by a need to build tools that feel like a quiet conversation rather than a demanding shout.
          </p>
          <p className="mt-4 text-lg text-foreground/80 max-w-prose mx-auto md:mx-0">
            I believe technology should respect our mental space, especially for those of us with neurodivergent minds. That's why I focus on building things that are intuitive, intentional, and human-first.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-center mb-12">My Journey</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border -z-10"></div>
          <div className="space-y-12">
            <TimelineItem icon={<BookOpen />} title="The Spark" description="First discovered how code could bring order to chaotic ideas. It was love at first `console.log`." year="2015" />
            <TimelineItem icon={<Milestone />} title="First Big Project" description="Built a tool to manage my own scattered thoughts, realizing the power of tech for neurodiversity." year="2018" />
            <TimelineItem icon={<BookOpen />} title="Embracing Education" description="Started mentoring fellow developers, finding joy in helping others find their 'aha!' moments." year="2020" />
            <TimelineItem icon={<Milestone />} title="Building for Calm" description="Committed to my mission of creating emotion-safe and ADHD-friendly software." year="2022" />
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-4xl font-bold mb-6">Traits & Values</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {traits.map(trait => (
            <Badge key={trait} className="hand-drawn text-lg px-4 py-2 bg-secondary text-secondary-foreground transform hover:scale-105 transition-transform">
              {trait}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  )
}
