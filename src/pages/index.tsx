import { useEffect } from 'react';
import { useRouter } from 'next/router';

function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/specie');
  }, [router]);

  console.log('/ page go on /specie');

  return null;
}

export default IndexPage;
