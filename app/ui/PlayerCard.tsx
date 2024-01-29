import { fugaz } from "./fonts";

function ComparableBody({ stat }: { stat: number }) {
    return(
        <>
            <p className={`${fugaz.className} text-5xl text-cyan-600`}>{stat.toLocaleString('en-US', {style: 'decimal'})}</p>
            <p>average monthly searches</p>
        </>
    );
}

function ComparedBody() {
    return(
        <>
            <a className={`higher`}>Higher</a>
            <a className={`lower`}>Lower</a>
        </>
    );
}

export default function PlayerCard({
    title,
    stat,
    picture,
    type
}: {
    title: string,
    stat: number,
    picture: string,
    type: 'comparable' | 'compared' | 'nextup'
}) {
    return (
        <div className={`${type} flex flex-col justify-center items-center h-full w-1/2`}>
            <p className={`${fugaz.className} text-4xl`}>"{title}"</p>
            <p>has</p>
            {type == 'comparable' ? <ComparableBody stat={stat} /> : type == 'compared' ? <ComparedBody /> : null}
        </div>
    );
}