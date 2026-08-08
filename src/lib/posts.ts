import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import type { Post, PostFrontmatter } from '@/types'

const POSTS_DIR = path.join(process.cwd(), 'content/blog')

/**
 * Merge a post's categories, legacy singular `category`, and tags into a single
 * de-duplicated label list, preserving first-seen order. Posts commonly set both
 * `category` and `categories` to the same value, so exact-string duplicates are
 * collapsed here rather than repeated in the UI.
 */
export function getPostLabels(frontmatter: PostFrontmatter): string[] {
  const labels = [
    ...(frontmatter.categories ?? []),
    ...(frontmatter.category ? [frontmatter.category] : []),
    ...(frontmatter.tags ?? []),
  ]
  return Array.from(new Set(labels))
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
  const now = new Date()

  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
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

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as PostFrontmatter

  if (new Date(frontmatter.date) > new Date()) return null

  const processed = await remark().use(remarkHtml).process(content)
  const htmlContent = processed.toString()

  return { slug, frontmatter, content: htmlContent }
}
