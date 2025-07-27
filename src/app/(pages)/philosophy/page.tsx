import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle } from "lucide-react";
import Image from "next/image";

const ThoughtCard = ({ title, sketchUrl, children, rotation, hint }: { title: string, sketchUrl: string, children: React.ReactNode, rotation: string, hint: string }) => (
  <Card className={`hand-drawn w-full max-w-sm transform transition-transform duration-300 hover:scale-105 hover:!rotate-0 ${rotation}`}>
    <CardHeader>
      <Image
        src={sketchUrl}
        alt={`Sketch for ${title}`}
        width={400}
        height={200}
        className="rounded-t-lg w-full aspect-video object-cover bg-muted"
        data-ai-hint={hint}
      />
      <CardTitle className="text-3xl mt-4 !font-headline">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-foreground/80">
      {children}
    </CardContent>
  </Card>
)

export default function PhilosophyPage() {
  return (
    <div className="space-y-12">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold">My Guiding Principles</h1>
        <p className="mt-6 text-lg text-foreground/80">
          This is my working sketchpad, a collection of ideas that guide everything I build. They're not rigid rules, but evolving principles for creating more human-centered technology.
        </p>
        <Button variant="outline" size="lg" className="mt-6 hand-drawn group">
            <Shuffle className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
            Shuffle Thoughts
        </Button>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start justify-center">
        <ThoughtCard title="Start with Friction" sketchUrl="https://placehold.co/400x200.png" rotation="rotate-2" hint="gears sketch">
          <p>Instead of chasing a frictionless experience, I start by understanding the existing friction. What makes a task hard? Where does anxiety creep in? Acknowledging the struggle is the first step to designing a truly helpful solution.</p>
        </ThoughtCard>
        
        <ThoughtCard title="Calm by Default" sketchUrl="https://placehold.co/400x200.png" rotation="-rotate-1" hint="zen garden">
          <p>No autoplaying videos, no urgent notification badges, no competing calls-to-action. Technology should be a quiet, reliable partner. Calm is not a feature to be toggled on; it's the foundation.</p>
        </ThoughtCard>

        <ThoughtCard title="Emotion-First UI" sketchUrl="https://placehold.co/400x200.png" rotation="rotate-1" hint="heart interface">
          <p>How does this interface make someone feel? Confident? Anxious? Supported? The emotional impact of a design is as important as its functionality. I prioritize creating UIs that feel safe, predictable, and encouraging.</p>
        </ThoughtCard>

        <ThoughtCard title="Structure as Kindness" sketchUrl="https://placehold.co/400x200.png" rotation="-rotate-2" hint="scaffolding blueprint">
          <p>For a mind that struggles with executive function, clear structure isn't restrictive—it's liberating. Well-designed constraints, clear hierarchies, and guided pathways are acts of kindness that reduce cognitive load.</p>
        </ThoughtCard>

        <ThoughtCard title="Sustainable Pacing" sketchUrl="https://placehold.co/400x200.png" rotation="rotate-2" hint="plant growing">
          <p>This applies to how I build and what I build. I avoid the "move fast and break things" mindset. I also design tools that encourage users to work at a sustainable pace, respecting their natural rhythms and energy levels.</p>
        </ThoughtCard>
        
        <ThoughtCard title="Clarity over Cleverness" sketchUrl="https://placehold.co/400x200.png" rotation="-rotate-1" hint="lightbulb simple">
          <p>A clever animation or a novel UI pattern is worthless if it creates confusion. I always opt for the clearest possible path. The goal is to make the user feel smart and capable, not to show off a clever design.</p>
        </ThoughtCard>
      </section>
    </div>
  )
}
