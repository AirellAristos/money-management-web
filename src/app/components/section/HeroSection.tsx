import NavigationBar from "../NavigationBar";
import { motion } from "framer-motion";

interface HeroSectionProps {
    onButtonClick: () => void
}

export default function HeroSection({ onButtonClick }: Readonly<HeroSectionProps>) {
    return <section id="hero" className="flex flex-col min-h-screen bg-[linear-gradient(135deg,#ec4899,#6366f1)] mb-10">
        <NavigationBar onButtonClick={onButtonClick} />
        <div className="my-auto mx-auto flex flex-col px-4 lg:px-0 md:flex-row items-center justify-between gap-12 max-w-7xl w-full">

            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                viewport={{ once: true }}
                className="flex flex-col items-start max-w-xl">
                <h1 className="text-4xl md:text-5xl text-left text-white font-bold mb-8">
                    Simple, Smart, Effortless Financial Management
                </h1>
                <p className="text-lg text-white text-left mb-8">
                    Easily track your income and expenses in one place.
                </p>
                <button className="bg-[#F7B731] px-6 py-4 text-lg text-white rounded-lg hover:bg-[#e6a820] transition-colors">
                    Try Web Version - Free
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-white">
                    Image
                </div>
            </motion.div>

        </div>
    </section>
}