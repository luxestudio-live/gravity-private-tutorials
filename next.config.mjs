/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const hasCustomDomain = process.env.CUSTOM_DOMAIN === 'true'
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'gravity-private-tutorials'
const useRepoBasePath = isGithubActions && !hasCustomDomain

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: useRepoBasePath ? `/${repositoryName}` : '',
  },
  basePath: useRepoBasePath ? `/${repositoryName}` : '',
  assetPrefix: useRepoBasePath ? `/${repositoryName}/` : undefined,
  trailingSlash: true,
  output: 'export',
}

export default nextConfig
