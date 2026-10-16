import { useState } from "react";
import { downloadBytes } from "../lib/download";

export function useDownload() {
  const [downloading, setDownloading] = useState(false);
  const [received, setReceived] = useState(0);
  const [error, setError] = useState("");

  const [averageMbps, setAverageMbps] = useState<number | null>(null);
  const [averageMiBs, setAverageMiBs] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  async function startDownload(
    targetBytes: number,
    concurrency: number,
  ): Promise<void> {
    setDownloading(true);
    setReceived(0);
    setError("");
    setAverageMbps(null);
    setAverageMiBs(null);
    setElapsedSeconds(0);

    let startTime = 0;

    try {
      await downloadBytes(targetBytes, concurrency, setReceived, (time) => {
        startTime = time;
      });

      const elapsed = (performance.now() - startTime) / 1000;
      const seconds = Math.max(elapsed, 0.001);

      setElapsedSeconds(elapsed);

      // Network speed uses decimal bits per second.
      setAverageMbps((targetBytes * 8) / seconds / 1_000_000);

      // Data transfer speed uses binary bytes per second.
      setAverageMiBs(targetBytes / seconds / 1024 ** 2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setDownloading(false);
    }
  }

  return {
    downloading,
    received,
    error,
    averageMbps,
    averageMiBs,
    elapsedSeconds,
    startDownload,
  };
}
