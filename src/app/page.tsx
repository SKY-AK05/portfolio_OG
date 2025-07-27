import Link from 'next/link';
import { BrainCircuit, PenSquare, HeartHandshake, User, Target } from 'lucide-react';

const Node = ({ href, title, icon, className = '', animationDelay = '0s' }: { href: string; title: string; icon: React.ReactNode; className?: string; animationDelay?: string }) => (
  <Link 
    href={href} 
    className={`group z-10 flex flex-col items-center justify-center text-center p-4 bg-card w-36 h-36 sm:w-44 sm:h-44 hand-drawn animate-float`}
    style={{ animationDelay }}
  >
    <div className="text-primary group-hover:text-accent transition-colors duration-300">
      {icon}
    </div>
    <h2 className="mt-2 text-xl sm:text-2xl text-foreground group-hover:text-accent-foreground">{title}</h2>
  </Link>
);

const Connector = ({ className }: { className: string }) => (
  <div className={`absolute z-0 hidden lg:block bg-foreground/30 ${className}`} />
);

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
      <main className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 p-4 my-16 lg:my-0">
        <div className="relative lg:hidden flex flex-col items-center gap-12">
            <div className="flex flex-col items-center text-center z-10 bg-card p-6 hand-drawn-accent transform hover:scale-105 transition-transform duration-300">
              <h1 className="text-5xl text-accent font-bold">SNiFF</h1>
              <p className="mt-2 text-lg max-w-sm text-accent-foreground">Developer. Educator. Builder of calm tools for chaotic minds.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
                <Node href="/about" title="Who I Am" icon={<User size={40} />} />
                <Node href="/projects" title="Projects" icon={<PenSquare size={40} />} animationDelay="0.5s" />
                <Node href="/mission" title="My Mission" icon={<Target size={40} />} animationDelay="1s" />
                <Node href="/community" title="Who I Help" icon={<HeartHandshake size={40} />} animationDelay="1.5s" />
                <Node href="/philosophy" title="How I Think" icon={<BrainCircuit size={40} />} animationDelay="2s" />
            </div>
        </div>

        <div className="relative hidden lg:flex items-center justify-center w-[800px] h-[600px]">
          {/* Connectors */}
          <Connector className="w-[150px] h-1 top-1/2 left-[155px] -translate-y-1/2" />
          <Connector className="w-1 h-[130px] top-[145px] left-1/2 -translate-x-1/2" />
          <Connector className="w-[150px] h-1 top-1/2 right-[155px] -translate-y-1/2" />
          <Connector className="w-1 h-[130px] bottom-[145px] left-1/2 -translate-x-1/2" />
          <Connector className="w-[105px] h-1 top-[135px] left-[200px] -translate-y-1/2 rotate-45" />

          {/* Center Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="flex flex-col items-center text-center z-10 bg-card p-6 w-64 hand-drawn-accent transform hover:scale-105 transition-transform duration-300">
                <h1 className="text-5xl text-accent font-bold">SNiFF</h1>
                <p className="mt-2 text-lg max-w-xs text-accent-foreground">Developer. Educator. Builder of calm tools for chaotic minds.</p>
            </div>
          </div>
          
          {/* Surrounding Nodes */}
          <div className="absolute top-[20px] left-1/2 -translate-x-1/2">
            <Node href="/projects" title="Projects" icon={<PenSquare size={44} />} animationDelay="0.5s" />
          </div>

          <div className="absolute top-1/2 left-0 -translate-y-1/2">
             <Node href="/about" title="Who I Am" icon={<User size={44} />} />
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <Node href="/mission" title="My Mission" icon={<Target size={44} />} animationDelay="1s" />
          </div>

          <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2">
            <Node href="/community" title="Who I Help" icon={<HeartHandshake size={44} />} animationDelay="1.5s"/>
          </div>

          <div className="absolute top-[80px] left-[80px]">
            <Node href="/philosophy" title="How I Think" icon={<BrainCircuit size={44} />} animationDelay="2s"/>
          </div>
        </div>
      </main>
    </div>
  );
}
