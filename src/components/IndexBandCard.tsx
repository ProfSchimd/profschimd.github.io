interface IndexBandCardProps {
    children: React.ReactNode
}

const IndexBandCard = ({ children }: IndexBandCardProps) => {
    return (
        <div className="py-4 flex flex-col items-center font-bold">
            {children}
        </div>
    );
};

export default IndexBandCard;