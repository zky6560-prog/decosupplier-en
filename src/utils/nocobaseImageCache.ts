import { createHash } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const outputDirectory = path.join(process.cwd(), 'public', 'generated', 'nocobase-images');
const outputUrlPrefix = '/generated/nocobase-images';
const imageCache = new Map<string, Promise<string>>();
const maxConcurrentDownloads = 8;
let activeDownloads = 0;
const queuedDownloads: Array<() => void> = [];

function getFileName(sourceUrl: string): string {
  return `${createHash('sha256').update(sourceUrl).digest('hex').slice(0, 24)}.webp`;
}

async function limitDownloads<T>(task: () => Promise<T>): Promise<T> {
  if (activeDownloads >= maxConcurrentDownloads) {
    await new Promise<void>((resolve) => queuedDownloads.push(resolve));
  }

  activeDownloads += 1;
  try {
    return await task();
  } finally {
    activeDownloads -= 1;
    queuedDownloads.shift()?.();
  }
}

/**
 * Downloads a NocoBase image during the static build and stores a local WebP copy.
 * The returned URL is always site-local, so published HTML has no NocoBase image dependency.
 */
export function cacheNocoBaseImage(sourceUrl: string, token: string, nocobaseOrigin: string): Promise<string> {
  const cached = imageCache.get(sourceUrl);
  if (cached) return cached;

  const request = limitDownloads(async () => {
    const fileName = getFileName(sourceUrl);
    const outputPath = path.join(outputDirectory, fileName);
    const outputUrl = `${outputUrlPrefix}/${fileName}`;

    await mkdir(outputDirectory, { recursive: true });
    const sourceOrigin = new URL(sourceUrl).origin;
    const headers: Record<string, string> = {
      Accept: 'image/avif,image/webp,image/jpeg,image/png,image/*',
    };
    if (sourceOrigin === nocobaseOrigin) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(sourceUrl, {
      headers,
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      throw new Error(`NocoBase image request failed (${response.status}): ${sourceUrl}`);
    }

    const sourceBuffer = Buffer.from(await response.arrayBuffer());
    await sharp(sourceBuffer).webp({ quality: 82, effort: 4 }).toFile(outputPath);
    return outputUrl;
  });

  imageCache.set(sourceUrl, request);
  return request;
}
