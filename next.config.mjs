/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'gravity-private-tutorials'
const useRepoBasePath = isGithubActions

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: useRepoBasePath ? `/${repositoryName}` : '',
  assetPrefix: useRepoBasePath ? `/${repositoryName}/` : undefined,
  trailingSlash: true,
  output: 'export',
}

export default nextConfig
