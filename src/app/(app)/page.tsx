'use client'


import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  if (session?.user) { 
    return (
      <main>
        <h1>Home page logged in {session?.user.name}</h1>
      </main>
    );

  }
  
  return (
    <main>
      <h1>Home page</h1>
    </main>
  )

}
