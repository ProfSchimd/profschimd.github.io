import type { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCallouts from "rehype-callouts";
import ImageWithCaption from "./components/ImageWithCaption";
 
const components: MDXComponents = {
  h2: ({ id, children }) => (
    <h2 id={id} className="text-xl md:text-2xl font-normal">{children}</h2>
  ),
  p: ({ children }) => (
    <div className="my-3">{children}</div>
  ),
  img: ({src, alt, title}) => (
    <ImageWithCaption src={src} alt={alt} title={title} />
  )
} satisfies MDXComponents;
 
export function useMDXComponents(): MDXComponents {
  return components
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