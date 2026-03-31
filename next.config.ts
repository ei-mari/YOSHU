import type { NextConfig } from "next";

function getBasePath() {
  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    return "";
  }

  const [, repo] = repository.split("/");

  if (!repo || repo.endsWith(".github.io")) {
    return "";
  }

  return `/${repo}`;
}

const basePath = process.env.NODE_ENV === "production" ? getBasePath() : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
};

export default nextConfig;
