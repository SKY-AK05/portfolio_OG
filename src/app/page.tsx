import GitIngestClient from '@/components/git-ingest-client';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 lg:p-24">
      <GitIngestClient />
    </main>
  );
}
