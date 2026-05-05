export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  author?: string
  tags?: string[]
  coverImage?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
}
