import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostFrontmatter } from '@/types'

const POSTS_DIR = path.join(process.cwd(), 'posts')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'))
  const now = new Date()

  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, frontmatter: data as PostFrontmatter, content }
    })
    .filter(post => new Date(post.frontmatter.date) <= now)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as PostFrontmatter

  if (new Date(frontmatter.date) > new Date()) return null

  return { slug, frontmatter, content }
}
