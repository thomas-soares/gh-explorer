import React from 'react';
import { Link } from 'react-router-dom';

type EmptyStateProps = {
  message?: string;
  actionLabel?: string;
  actionTo?: string;
};

export default function EmptyState({ message, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="text-center py-8 px-4" role="status" aria-live="polite">
      <div className="text-4xl mb-4" aria-hidden="true">
        📭
      </div>
      <p className="text-slate-700 text-sm sm:text-base">{message ?? 'Nothing to display.'}</p>
      {actionTo && actionLabel && (
        <div className="mt-6">
          <Link
            to={actionTo}
            className="inline-block rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 text-sm sm:text-base"
          >
            {actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
