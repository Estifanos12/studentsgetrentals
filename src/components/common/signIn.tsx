import Link from 'next/link';

import { Button } from '../ui/button';

export const SignIn = () => {
  return (
    <Link href={'/login'}>
      <Button>Sign In</Button>
    </Link>
  );
};
