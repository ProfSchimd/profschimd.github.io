interface DescriptionProps {
    children: React.ReactNode;
    className?: string;
}

const Description = ({ children, className } : DescriptionProps) => {
    return(
        <div className={className || "text-xl font-thin tracking-wide"}>
            {children}
        </div>
    );
};

export default Description;
