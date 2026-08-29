import * as React from "react";
import { Button } from "@/src/components/ui/Button";
import { PackageOpen, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-14 text-center rounded-3xl border border-pink-200/60 dark:border-pink-900/40 bg-linear-to-b from-card/80 to-pink-50/30 dark:to-card/50 space-y-4 my-6 shadow-xs",
        className,
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-500 border border-pink-200 dark:border-pink-900/60 shadow-xs">
        {icon || <PackageOpen className="h-8 w-8 text-pink-500" />}
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {actionLabel && onAction && (
            <Button
              variant="dengo"
              size="sm"
              onClick={onAction}
              className="gap-1.5 font-bold"
            >
              <Sparkles className="h-4 w-4" />
              <span>{actionLabel}</span>
            </Button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" size="sm" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
