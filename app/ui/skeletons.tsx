import { fugaz } from "./fonts";

// Shimmer effect for loading components
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// Skeleton component for card while data is being grabbed
export function CardSkeleton() {
  return (
    <div className={`${shimmer} flex flex-row flex-center rounded-xl bg-slate-900 p-2 shadow-sm`}>
      <div className="w-1/3">
        <div className="w-24 h-24 bg-slate-700 rounded-full overflow-hidden md:w-full md:h-auto" />
      </div>
      <div className="w-2/3 h-full">
        <div className="w-full flex flex-row justify-evenly md:justify-between text-center p-2">
          <span className="flex flex-col">
            <p className="text-main">{'P'}</p>
            <div className="w-7 h-6 bg-slate-700 rounded-full" />
          </span>
          <span className="flex flex-col">
            <p className="text-main">{'G'}</p>
            <div className="w-7 h-6 bg-slate-700 rounded-full" />
          </span>
          <span className="flex flex-col">
            <p className="text-main">{'A'}</p>
            <div className="w-7 h-6 bg-slate-700 rounded-full" />
          </span>
        </div>
        <div className="w-full flex justify-center">
          <div className='w-20 h-8 rounded-full bg-slate-700' />
        </div>
      </div>
    </div>
  );
}

// Skeleton for cards wrapper
export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

// WIP
export function QuickActionsSkeleton() {
  return (
    <>
    </>
  );
}

// WIP
export function DataSkeleton() {
  return (
    <>
    </>
  );
}

// Skeleton for Player cards while game loads
export function PlayerSkeleton() {
  return (
    <div className={`flex flex-col flex-center bg-slate-950 md:h-full md:w-1/3 h-1/3 w-full text-lg text-center`}>
      <div className="flex flex-col flex-center">
        <p className={`${fugaz.className} ${shimmer} text-4xl`}>{`"Loading..."`}</p>
        <p className="">has</p>
      </div>
    </div>
  );
}

export function GameSkeleton() {
  return (
    <div className={`md:h-full md:w-[150%] h-[150%] w-full flex md:flex-row flex-col`}>
      <PlayerSkeleton />
      <PlayerSkeleton />
      <PlayerSkeleton />
    </div>
  );
}

// Skeleton for dashboard page while data is loading
export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <QuickActionsSkeleton />
        <DataSkeleton />
      </div>
    </>
  );
}