import { Footer as FooterStyle, Content } from "@/app/styles"
import { Author, Social } from "../../site.config";
import SocialLinks from "./SocialLinks";

export default function Footer() {
    return (
        <footer className={`${FooterStyle.CONTAINER}`}>
            <div className={`${Content.CONTAINER}`}>
                <div className="text-center">
                    <p>&copy; {(new Date().getFullYear())} {Author}</p>
                    <SocialLinks className="text-xl" social={Social} />
                </div>
            </div>
        </footer>
    )
}