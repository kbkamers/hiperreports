tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/src/firebase';

const LoginPage = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error: any) {
      console.error("Error signing in with Google", error);
      // Handle the error appropriately in your UI, e.g., display an error message.
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button onClick={signInWithGoogle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;