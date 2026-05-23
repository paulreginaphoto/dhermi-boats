const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    qualities: [50, 52, 58, 72, 75],
    deviceSizes: [360, 390, 430, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640]
  },
  experimental: {
    optimizePackageImports: ["lucide-react"]
  }
};

export default nextConfig;
