import type { MDXComponents } from 'mdx/types'
 
const components: MDXComponents = {
  h2: ({ children }) => (
    <h1 className="text-xl md:text-2xl font-normal">{children}</h1>
  ),
  p: ({ children }) => (
    <div className="my-3">{children}</div>
  )
} satisfies MDXComponents;
 
export function useMDXComponents(): MDXComponents {
  return components
}