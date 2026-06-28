import React from 'react';
import { Link } from 'react-router-dom';

export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded focus:shadow"
    >
      Skip to content
    </a>
  );
}
