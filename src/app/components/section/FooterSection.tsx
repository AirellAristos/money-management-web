import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
    return <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8 px-10 mt-20 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            Money Management App Made With ❤️ by Airell
        </div>
        <div className="flex flex-col items-start">
            <div className="flex justify-center mb-2">
                <Github className="inline mr-2" />
                <Link href="github.com/airell/money-management-app" target="_blank" rel="noopener noreferrer">Source Code</Link>
            </div>
            <div className="flex justify-center">
                <Linkedin className="inline mr-2" />
                <Link href="www.linkedin.com/in/airellaristo" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
            </div>
        </div>
    </footer>
}