import React from "react";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-slate-700/60 rounded ${className}`}
    />
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

