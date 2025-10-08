import type { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCallouts from "rehype-callouts";
import ImageWithCaption from "./components/ImageWithCaption";
import StackedTooltip from "./components/StackedTooltip";
import InteractiveLinkedList from "./components/InteractiveLinkedList";
 
const components: MDXComponents = {
  h2: ({ id, children }) => (
    <h2 id={id} className="text-xl md:text-2xl font-normal">{children}</h2>
  ),
  p: ({ children }) => (
    <div className="my-3">{children}</div>
  ),
  img: ({src, alt, title}) => (
    <ImageWithCaption src={src} alt={alt} title={title} />
  ),
  ul: ({ children, ...props }) => (
    <ul className="marker:text-inherit dark:marker:text-inherit" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li {...props}>
      {children}
    </li>
  ),
} satisfies MDXComponents;
 
export function useMDXComponents(): MDXComponents {
  return {
    InteractiveLinkedList,
    StackedTooltip,
    ...components}
}

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeCallouts,
      rehypeSlug,
      rehypePrettyCode,
      rehypeKatex,
    ],
  },
};