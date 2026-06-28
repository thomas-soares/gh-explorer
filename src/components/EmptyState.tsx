import React from 'react';
import { Link } from 'react-router-dom';

type EmptyStateProps = {
  message?: string;
  actionLabel?: string;
  actionTo?: string;
};

export default function EmptyState({ message, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="text-center text-slate-700">
      <p>{message ?? 'Nothing to display.'}</p>
      {actionTo && actionLabel && (
        <div className="mt-3">
          <Link to={actionTo} className="text-blue-600 hover:underline">
            {actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
