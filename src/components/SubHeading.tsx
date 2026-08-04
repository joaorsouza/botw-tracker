import type { ReactNode } from 'react';

export default function SubHeading({ children }: { children: ReactNode }) {
  return <div className="text-xs uppercase tracking-wide text-stone-400 mb-2 mt-3">{children}</div>;
}
