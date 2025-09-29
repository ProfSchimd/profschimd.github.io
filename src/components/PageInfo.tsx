import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

const RepoLink = ({repo} : {repo:string}) => {
    return(
        <Link href={repo} target="_blank"><FaGithub /></Link>
    );
}

interface PageInfoProps {
    repo?: string;
    tags?: string[];
}

const PageInfo = ({repo, tags} : PageInfoProps) => {
    const hasInfo = (repo || tags);
    return(
        hasInfo ? 
            <div>
                {repo ? <RepoLink repo={repo} /> : <></>}
            </div> : 
            <></>
    );
}

export default PageInfo;