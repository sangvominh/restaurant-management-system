import type { NextConfig } from 'next';
import path from 'node:path';

const repositoryRoot = path.resolve(__dirname, '../..');

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: repositoryRoot,
  turbopack: {
    root: repositoryRoot,
  },
};

export default nextConfig;
