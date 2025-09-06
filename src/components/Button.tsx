import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

const Button = ({children, href, className} : ButtonProps) => {
    return(
        <Link className={
            className || 
            "rounded-xl text-sky-100 bg-sky-700 dark:bg-sky-800 mx-1 px-4 py-2 hover:bg-sky-600"} href={href}>
            {children}
        </Link>
    );
};

export default Button;