'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errMsg = searchParams.get('error');

  return (
    <div>
      <h1>{errMsg}</h1>

      <button onClick={() => router.back()}>try again</button>
    </div>
  );
};

export default page;
