import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// Для деплоя в подпапку (напр. GitHub Pages: /pavel-psychologist/) задайте
// NEXT_PUBLIC_BASE_PATH="/pavel-psychologist" при сборке. Боевая сборка под
// собственный домен (корень) — с пустой переменной, никаких префиксов.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  // Явный корень проекта: рядом (в профиле пользователя) есть чужой package-lock.json,
  // без этого Next неверно определяет workspace root.
  outputFileTracingRoot: projectRoot,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
