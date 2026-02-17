import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function withBasePath(path: string) {
  if (!path) return path
  if (/^(https?:|data:|blob:|\/\/)/.test(path)) return path

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  if (!basePath) return path

  if (path === basePath || path.startsWith(`${basePath}/`)) return path
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`
}
