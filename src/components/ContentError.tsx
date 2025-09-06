interface ContentErrorProps {
    className?: string;
    children?: React.ReactNode;
};

const ContentError = ({className, children} : ContentErrorProps) => {
    return(
        <div className={className || ""}>
            {children || "Errore"}
        </div>
    );
}

export default ContentError;