import Link from "next/link";

interface AnimatedButtonProps {
    label: React.ReactNode
    href?: string
    id?: string
    onClick?: (id?: string) => void
}

export default function AnimatedButton({ label, href, id, onClick }: Readonly<AnimatedButtonProps>) {
    const underlineSpan = (
        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
    )

    if (href) {
        return (
            <Link
                href={href}
                className="relative group"
            >
                {label}
                {underlineSpan}
            </Link>
        )
    }

    return (
        <button type="button" onClick={() => onClick?.(id)} className="relative group">
            {label}
            {underlineSpan}
        </button>
    )

}