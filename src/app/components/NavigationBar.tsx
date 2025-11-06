import { ArrowUpRight, DollarSignIcon } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import { motion, useScroll, useTransform } from "framer-motion";

interface NavigationBarProps {
    onButtonClick: () => void
}

export default function NavigationBar({ onButtonClick }: Readonly<NavigationBarProps>) {
    const { scrollY } = useScroll()
    const background = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.3)"])
    const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"])

    return <motion.nav
        style={{ background, backdropFilter: blur }}
        className="sticky z-20 top-0 px-10 py-5 flex flex-wrap items-center justify-between text-white">
        <div className="flex flex-row items-center">
            <DollarSignIcon className="h-12 w-12" />
            <div className="ml-2 font-bold text-xl leading-tight">
                <p>Money</p>
                <p>Management</p>
            </div>
        </div>
        <div className="flex gap-8 text-lg">
            <AnimatedButton label="About" id="about" onClick={onButtonClick} />
            <AnimatedButton label="Portfolio" id="portfolio" onClick={onButtonClick} />
            <AnimatedButton label="Contact" id="contact" onClick={onButtonClick} />
        </div>

        <div className="flex items-center gap-8 text-lg ">
            <AnimatedButton label="Login" id="login" onClick={onButtonClick} />
            <div className="group flex items-center gap-2 border border-white rounded-md p-4">
                <button >Try Mobile Version</button>
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
        </div>
    </motion.nav>
}