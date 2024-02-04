import { fugaz } from "./fonts";
import { motion } from "framer-motion";

export default function VersusBlock({ versusState }: { versusState: number }) {
    function Checkmark() {
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

        return(
            <div className={`w-full h-full flex justify-center items-center absolute top-0 left-0`}>
                <motion.svg width="50" height="50" viewBox="0 0 50 50" initial="hidden" animate="visible">
                    <motion.line x1="10" y1="30" x2="20" y2="40" stroke-width="6px" stroke-linecap="round" stroke="#fff" variants={draw} custom={0.25} />
                    <motion.line x1="20" y1="40" x2="40" y2="10" stroke-width="6px" stroke-linecap="round" stroke="#fff" variants={draw} custom={0.5} />
                </motion.svg>
            </div>
        );
    }
    
    return(
        <div className={`w-16 h-16 text-black absolute top-1/2 left-1/2 rounded-full overflow-hidden`}>
            <div className={`w-full h-full relative flex justify-center items-center text-2xl bg-white`}>
                <p className={`${fugaz.className}`}>VS</p>
            </div>
            <div className={`w-full h-full bg-cyan-600 relative transition-transform duration-500 ease-in-out ${versusState == 0 ? 'translate-y-0' : '-translate-y-full'}`}></div>
            {versusState == 1 ? <Checkmark /> : null}
        </div>
    );
}