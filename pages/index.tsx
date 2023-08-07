import Image from 'next/image';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`grid place-items-center min-h-screen p-24`}>
      <div className="flex flex-col items-center">
        <h1 className="text-[50px] font-semibold">You not authorize</h1>
        <p>Please open in robust App</p>
      </div>
    </div>
  );
}
