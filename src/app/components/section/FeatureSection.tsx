import { motion } from "framer-motion"

export default function FeatureSection() {
    return <section
        id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                What Do You Get<br />From Using Our App?
            </h2>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col p-8 rounded-lg shadow-lg bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out">
                    <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-6">
                        <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Simple</h3>
                    <p className="text-gray-600">
                        Easily add, track, and categorize your income and expenses
                    </p>
                </div>

                <div className="flex flex-col p-8 rounded-lg shadow-lg bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                        <span className="text-2xl">🧠</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Smart</h3>
                    <p className="text-gray-600">
                        Get insights on your spending habits and trends
                    </p>
                </div>

                <div className="flex flex-col p-8 rounded-lg shadow-lg bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Effortless</h3>
                    <p className="text-gray-600">
                        Manage your finances anytime, anywhere available on web and android devices
                    </p>
                </div>

            </motion.div>
        </div>
    </section>
}