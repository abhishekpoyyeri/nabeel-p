import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A parent folder (C:\Users\ACER) contains another project's lockfile, which
  // makes Next infer the wrong workspace root. Pin it to this project so the
  // build doesn't pull in unrelated files (e.g. that project's middleware).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
