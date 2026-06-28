import React from 'react';

type ErrorMessageProps = {
  message?: string;
  children?: React.ReactNode;
};

export default function ErrorMessage({ message, children }: ErrorMessageProps) {
  return (
    <div role="alert" className="text-rose-600">
      {message ?? children ?? 'Something went wrong.'}
    </div>
  );
}
