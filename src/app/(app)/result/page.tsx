'use client';

import { getResult } from '@/lib/getResult';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const { data: session } = useSession();
  const [result, setResult] = useState<
    Array<{ category: string; score: string }>
  >([]);

  const fetchResult = async () => {
    try {
      const { result } = await getResult(session?.user.email as string);
      setResult(result);
    } catch (error) {
      setResult([]);
    }
  };

  useEffect(() => {
    if (session) fetchResult();
  }, [session]);

  return (
    <div>
      {result.length !== 0 ? (
        <>
          {result.map((item, index) => {
            return (
              <div key={index}>
                <span>
                  {item.category} : {item.score}
                </span>
              </div>
            );
          })}
        </>
      ) : (
        <div>
          <p>No test taken</p>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
