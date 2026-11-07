import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  className?: string;
}

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors";
  
  const variants = {
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border border-blue-200 dark:border-blue-800",
    secondary: "bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-gray-300 border border-gray-200 dark:border-slate-700",
    danger: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900",
    outline: "border border-gray-300 text-gray-700 dark:border-slate-600 dark:text-slate-300",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

