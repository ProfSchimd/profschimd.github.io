interface PageTitleProps {
    children: React.ReactNode;
    className?: string;
}

const PageTitle = ({children, className} : PageTitleProps) => {
    return(
        <h1 className={className || "text-2xl md:text-3xl"}>{children}</h1>
    )
}

export default PageTitle;