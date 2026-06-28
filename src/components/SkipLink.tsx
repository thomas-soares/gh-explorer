import React from 'react';

export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded focus:shadow focus:text-slate-900 focus:border focus:border-slate-300"
    >
      Pular para o conteúdo
    </a>
  );
}
