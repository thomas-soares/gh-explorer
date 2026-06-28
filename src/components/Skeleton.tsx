import React from 'react';

type SkeletonProps = {
  rows?: number;
  className?: string;
};

export default function Skeleton({ rows = 3, className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`} aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-slate-200 rounded mb-2" />
      ))}
    </div>
  );
}
