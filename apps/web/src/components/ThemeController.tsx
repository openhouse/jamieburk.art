'use client';

import { useEffect, useState } from 'react';

export function ThemeController() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.contrast = highContrast ? 'high' : 'standard';
  }, [highContrast]);

  function toggleContrast() {
    const next = !highContrast;
    setHighContrast(next);
  }

  return (
    <button className="btn btn-ghost btn-sm" type="button" aria-pressed={highContrast} onClick={toggleContrast}>
      Contrast
    </button>
  );
}
