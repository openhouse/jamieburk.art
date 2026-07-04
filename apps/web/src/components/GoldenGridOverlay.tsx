'use client';

import { useEffect, useState } from 'react';
import { visualSystem } from '@/data/visual-system';

export function GoldenGridOverlay() {
  const [visible, setVisible] = useState(process.env.NEXT_PUBLIC_SHOW_GOLDEN_GRID === 'true');

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === 'g' && event.altKey) {
        setVisible((current) => !current);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!visible || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] mx-auto max-w-[72rem]" aria-hidden="true">
      {visualSystem.guidePositions.map((position) => (
        <span key={position} className="absolute top-0 h-full w-px bg-error/40" style={{ left: position }} />
      ))}
    </div>
  );
}

