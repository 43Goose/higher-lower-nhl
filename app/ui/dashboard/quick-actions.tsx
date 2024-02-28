import { fugaz } from "../fonts";

export default async function QuickActions() {
    return (
        <div className={`${fugaz.className} w-full flex justify-evenly bg-slate-900 rounded-lg p-4`}>
            <div className="p-4 rounded-xl bg-slate-950">
                <button className="btn-primary">UPDATE ALL</button>
            </div>
            <div className="p-4 rounded-xl bg-slate-950">
                <button className="btn-primary">CLOWN HORN</button>
            </div>
        </div>
    );
}