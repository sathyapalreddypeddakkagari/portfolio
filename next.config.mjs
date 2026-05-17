import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// If public/CNAME is present we're on a custom apex/root domain → no basePath.
// Otherwise we're on github.io/<repo>/ → prepend the repo name.
const REPO = 'portfolio'
const onCustomDomain = existsSync(join(__dirname, 'public', 'CNAME'))
const isProduction = process.env.NODE_ENV === 'production'
const basePath = isProduction && !onCustomDomain ? `/${REPO}` : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
