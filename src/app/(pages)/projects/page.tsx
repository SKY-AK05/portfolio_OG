import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const ProjectCard = ({ title, description, reflection, imageUrl, rotation, hint }: { title: string, description: string, reflection: string, imageUrl: string, rotation: string, hint: string }) => (
  <Card className={`group w-full max-w-md hand-drawn transform transition-transform duration-300 hover:scale-105 hover:!rotate-0 ${rotation}`}>
    <CardHeader>
      <Image 
        src={imageUrl} 
        alt={`Screenshot of ${title}`} 
        width={600} 
        height={400} 
        className="rounded-t-lg bg-muted"
        data-ai-hint={hint}
      />
      <CardTitle className="text-3xl mt-4 !font-headline">{title}</CardTitle>
      <CardDescription className="!text-base">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="border-l-4 border-primary pl-4">
        <p className="italic text-foreground/80">"{reflection}"</p>
      </div>
    </CardContent>
  </Card>
);

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold">Things I've Built</h1>
        <p className="mt-6 text-lg text-foreground/80">
          Each project is an attempt to answer a question or solve a personal friction. They are less like finished products and more like living ideas, built with care and a desire to make digital spaces a little calmer.
        </p>
      </section>

      <section className="flex flex-wrap justify-center gap-8 md:gap-12">
        <ProjectCard 
          title="PromptWeaver"
          description="A modular, structured AI prompt authoring tool."
          reflection="Built to clarify the prompt space, not complicate it."
          imageUrl="https://placehold.co/600x400.png"
          rotation="rotate-2"
          hint="AI interface"
        />
        <ProjectCard 
          title="Reva"
          description="A calm-first assistant for personal task management."
          reflection="Planning should feel like breathing, not drowning."
          imageUrl="https://placehold.co/600x400.png"
          rotation="-rotate-1"
          hint="task manager"
        />
        <ProjectCard 
          title="Smart Life Manager"
          description="A neurodivergent-first productivity and life-rhythm tool."
          reflection="What if productivity was about understanding your limits, not hacking them?"
          imageUrl="https://placehold.co/600x400.png"
          rotation="rotate-1"
          hint="dashboard analytics"
        />
      </section>
    </div>
  )
}
