import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  const bounded = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-full bg-slate-200", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-brandBlue to-brandGold transition-all duration-500"
        style={{ width: `${bounded}%` }}
      />
    </div>
  );
}
