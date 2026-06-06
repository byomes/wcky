'use client';

import { useEffect } from 'react';

export default function DashboardPage() {
  useEffect(() => {
    window.location.replace('https://watson.tail0243ff.ts.net');
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center">
      <p className="text-navy-200 text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Opening Watson…
      </p>
    </div>
  );
}
