import { cn } from "@/lib/utils"

export function SketchyEmailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transform transition-transform duration-200 hover:scale-110", className)}
    >
      <path d="M4.5 7.5L12 13.5L19.5 7.5" transform="rotate(-1 12 12)" />
      <path d="M4 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7" transform="rotate(1 12 12)"/>
      <path d="M20 7L12 13 4 7" transform="rotate(0.5 12 12)"/>
    </svg>
  )
}
