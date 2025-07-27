'use client';

import { useState } from 'react';
import { Github, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  digestRepository,
  type DigestRepositoryInput,
} from '@/ai/flows/digest-repo-flow';

const Sparkle = ({ color = 'red' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path
      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function GitIngestClient() {
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [digest, setDigest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleIngest = async () => {
    if (!repositoryUrl) {
      toast({
        title: 'Error',
        description: 'Please enter a repository URL.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setDigest('');

    try {
      const input: DigestRepositoryInput = { repositoryUrl };
      const result = await digestRepository(input);
      setDigest(result.digest);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to digest the repository. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <header className="mb-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <Sparkle color="#F472B6" /> Prompt-friendly{' '}
          <span className="block md:inline">codebase</span>{' '}
          <Sparkle color="#2DD4BF" />
        </h1>
        <p className="mt-4 text-lg text-foreground/70">
          Turn any Git repository into a simple text digest of its codebase.
          <br />
          This is useful for feeding a codebase into any LLM.
        </p>
      </header>

      <Card className="w-full border-2 border-border shadow-lg bg-card/50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              placeholder="https://github.com/..."
              value={repositoryUrl}
              onChange={(e) => setRepositoryUrl(e.target.value)}
              className="flex-grow bg-input border-2 border-border focus:bg-background"
              disabled={isLoading}
            />
            <Button
              onClick={handleIngest}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 border-2 border-border font-bold"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Ingest
            </Button>
          </div>
          <div className="mt-4 text-left">
            <p className="text-sm text-foreground/60 mb-2">
              Try these example repositories:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'firebase/genkit',
                'facebook/react',
                'vercel/next.js',
                'remix-run/remix',
              ].map((repo) => (
                <Button
                  key={repo}
                  variant="outline"
                  size="sm"
                  className="bg-secondary hover:bg-secondary/80 border-2 border-border"
                  onClick={() =>
                    setRepositoryUrl(`https://github.com/${repo}`)
                  }
                  disabled={isLoading}
                >
                  {repo.split('/')[1]}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {digest && (
        <div className="w-full mt-8">
          <h2 className="text-2xl font-bold text-left mb-2">Digest Result</h2>
          <Textarea
            value={digest}
            readOnly
            rows={10}
            className="w-full bg-secondary border-2 border-border"
          />
        </div>
      )}

      <footer className="mt-12 text-center text-foreground/60">
        <div className="flex justify-center items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
