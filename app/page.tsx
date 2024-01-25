import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center w-1/2 max-w-500px">
        <h1 className="my-4">NHL HIGHER LOWER</h1>
        <h2 className="my-4">Who has better stats?</h2>
        <p className="my-4 text-center">A clone of the popular Higher Lower game by Gabritrav01 that uses NHL player stats instead of google searches.</p>
        <div className="flex flex-row w-full items-center justify-center">
          <a href="/classic" className="flex justify-center items-center m-4 w-32 h-14 bg-cyan-700 rounded-full">CLASSIC</a>
          <a href="/classic" className="flex justify-center items-center m-4 w-32 h-14 bg-cyan-700 rounded-full">GOALS</a>
        </div>
      </div>
    </main>
  );
}
