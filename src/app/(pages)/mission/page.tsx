import { Badge } from "@/components/ui/badge";

export default function MissionPage() {
  const keywords = ["autonomy", "inclusion", "clarity", "flow", "emotion-safe"];

  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-[60vh] py-16 overflow-hidden">
      <div 
        className="absolute inset-0 bg-repeat -z-10 opacity-5" 
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E2E2E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}
        data-ai-hint="scribbled texture"
      ></div>

      <blockquote className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
          To build tech that <span className="text-primary">creates space</span> — especially for those navigating invisible struggles.
        </h1>
      </blockquote>

      <div className="mt-12 flex flex-wrap justify-center items-center gap-4">
        {keywords.map((keyword, i) => (
          <Badge 
            key={keyword}
            variant="outline"
            className="hand-drawn-accent text-lg bg-accent/10 text-accent-foreground px-4 py-2 animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  );
}
