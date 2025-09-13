interface ImageWithCaptionProps {
    src: string;
    alt: string;
    title?: string;
    className?: string;
    captionClassName?: string;
}

const ImageWithCaption = ({ src, alt, title, className, captionClassName }: ImageWithCaptionProps) => {
    return (
        <>
            <div className={className || "flex-col p-1 justify-center bg-white rounded-2xl shadow-lg dark:shadow-gray-500"}>
                <img className="w-full px-1" src={src} alt={alt} />
                <div className={captionClassName || "flex justify-center font-base font-thin text-gray-800"}>
                    {title || ""} {alt}
                </div>
            </div>

        </>
    );
}

export default ImageWithCaption;