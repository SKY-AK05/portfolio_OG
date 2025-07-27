import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3">
            <nav>
                <Button asChild variant="ghost" className="hand-drawn -ml-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-foreground/80 hover:text-accent font-headline text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-from-line"><path d="m9 6-6 6 6 6"/><path d="M3 12h14"/><path d="M21 19V5"/></svg>
                        Mind Map
                    </Link>
                </Button>
            </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
