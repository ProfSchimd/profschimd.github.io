import Link from "next/link";
import { FaGithub, FaLinkedin, FaStackOverflow, FaBluesky, FaXTwitter } from "react-icons/fa6";

interface UserNameProps {
    userName: string
}

function GitHub({ userName }: UserNameProps) {
    return (
        <Link href={`https://github.com/${userName}/`} target="_blank">
            <FaGithub className="mr-1 inline" />
        </Link>
    );
}

function Twitter({ userName }: UserNameProps) {
    return (
        <Link href={`https://x.com/${userName}/`} target="_blank">
            <FaXTwitter className="mr-1 inline" />
        </Link>
    );
}

function BlueSky({ userName }: UserNameProps) {
    return (
        <Link href={`https://bsky.app/profile/${userName}/`} target="_blank">
            <FaBluesky className="mr-1 inline" />
        </Link>
    )
}

function Linkedin({ userName }: UserNameProps) {
    return (
        <Link href={`https://www.linkedin.com/in/${userName}/}`} target="_blank">
            <FaLinkedin className="mr-1 inline" />
        </Link>
    );
}

function StackOverflow({ userName }: UserNameProps) {
    return (
        <Link href={`https://stackoverflow.com/users/${userName}/}`} target="_blank">
            <FaStackOverflow className="mr-1 inline" />
        </Link>
    );
}

interface SocialProps {
    social: {[key: string]: string | null},
    className?: string
}

const SocialLinks = ({ social, className="" }: SocialProps) => {
    return (
        <div className={className}>
            {social.Github ? <GitHub userName={social.Github} /> : <></>}
            {social.Twitter ? <Twitter userName={social.Twitter} /> : <></>}
            {social.Bluesky ? <BlueSky userName={social.Bluesky} /> : <></>}
            {social.Linkedin ? <Linkedin userName={social.Linkedin} /> : <></>}
            {social.StackOverflow ? <StackOverflow userName={social.StackOverflow} /> : <></>}
        </div>
    );
}

export default SocialLinks;