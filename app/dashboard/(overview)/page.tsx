import { fugaz } from "@/app/ui/fonts";
import { Suspense } from "react";
import { CardsSkeleton, DataSkeleton, QuickActionsSkeleton } from "@/app/ui/dashboard/skeletons";
import CardWrapper from "@/app/ui/dashboard/card-wrapper";
import QuickActions from "@/app/ui/dashboard/quick-actions";

export default function DASHBOARD() {
    return (
        <div className="w-full min-h-full py-4">
            <h1 className={`${fugaz.className} text-center mb-4 text-xl md:text-2xl`}>DASHBOARD</h1>
            <p className={`${fugaz.className} text-center md:text-left text-main mb-1 text-xl md:text-2xl md:px-4`}>RANDOM PLAYERS</p>
            <div className="grid px-8 gap-6 sm:grid-cols-2 md:px-4 lg:grid-cols-4">
                {
                    <Suspense fallback={<CardsSkeleton />}>
                        <CardWrapper />
                    </Suspense>
                }
            </div>
            <div className="w-full my-8 px-4">
                <Suspense fallback={<QuickActionsSkeleton />}>
                    <QuickActions />
                </Suspense>
            </div>
        </div>
    );
}