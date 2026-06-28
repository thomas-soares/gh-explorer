import React from 'react';

type ErrorMessageProps = {
  message?: string;
  children?: React.ReactNode;
};

export default function ErrorMessage({ message, children }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700"
      aria-live="assertive"
    >
      <span className="text-2xl flex-shrink-0" aria-hidden="true">
        ⚠️
      </span>
      <div className="flex-1 text-sm sm:text-base">
        {message ?? children ?? 'Something went wrong.'}
      </div>
    </div>
  );
}
