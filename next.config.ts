import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};


const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypePrettyCode],
  },
});


export default withMDX(nextConfig);
