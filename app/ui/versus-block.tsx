import { fugaz } from "./fonts";
import { motion } from "framer-motion";

// My favourite component (don't tell the rest) that shows the fun little check mark and x animations after user input
export default function VersusBlock({ versusState }: { versusState: number }) {

    // Object that controls how SVGs are drawn when displayed
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (delay: number) => {
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 0.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 },
                },
            };
        },
    };

    // Checkmark component
    function Checkmark() {
        return (
            <div className='w-full h-full flex flex-center absolute top-0 left-0'>
                <motion.svg width="50" height="50" viewBox="0 0 50 50" initial="hidden" animate="visible">
                    <motion.line x1="10" y1="30" x2="20" y2="40" strokeWidth="6px" strokeLinecap="round" stroke="#fff" variants={draw} custom={0.1} />
                    <motion.line x1="20" y1="40" x2="40" y2="10" strokeWidth="6px" strokeLinecap="round" stroke="#fff" variants={draw} custom={0.2} />
                </motion.svg>
            </div>
        );
    }

    // X component
    function XGraphic() {
        return (
            <div className='w-full h-full flex flex-center absolute top-0 left-0'>
                <motion.svg width="50" height="50" viewBox="0 0 50 50" initial="hidden" animate="visible">
                    <motion.line x1="10" y1="10" x2="40" y2="40" strokeWidth="6px" strokeLinecap="round" stroke="#fff" variants={draw} custom={0.1} />
                    <motion.line x1="10" y1="40" x2="40" y2="10" strokeWidth="6px" strokeLinecap="round" stroke="#fff" variants={draw} custom={0.2} />
                </motion.svg>
            </div>
        );
    }

    let overlayBgColor = versusState == 1 ? 'bg-main' : versusState == 2 ? 'bg-sec' : 'bg-white';
    let overlayPos = versusState == 0 ? 'translate-y-0' : '-translate-y-full';

    return (
        <div className={`w-16 h-16 text-black absolute top-0 bottom-0 left-0 right-0 m-auto rounded-full overflow-hidden`}>
            <div className={`w-full h-full relative flex flex-center text-2xl bg-white`}>
                <p className={`${fugaz.className}`}>VS</p>
            </div>
            <div className={`w-full h-full ${overlayBgColor} relative transition-all duration-300 ease-in-out ${overlayPos}`}></div>
            {versusState == 1 ? <Checkmark /> : versusState == 2 ? <XGraphic /> : null}
        </div>
    );
}