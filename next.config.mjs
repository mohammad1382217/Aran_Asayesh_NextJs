import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(new URL("styles", import.meta.url).pathname)],
  },
};

export default nextConfig;
