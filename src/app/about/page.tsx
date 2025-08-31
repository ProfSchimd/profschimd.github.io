import { Content } from "../styles";
import AboutMd from "./about.mdx";

const About = () => {
    return (
        <div className={`${Content.PROSE}`}>
            <AboutMd />
        </div>
    );
};

export default About;