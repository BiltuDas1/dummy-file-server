type DownloadProgressProps = {
  received: number;
  targetBytes: number;
  error: string;
  downloading: boolean;
  averageMbps: number | null;
  averageMiBs: number | null;
  elapsedSeconds: number;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024 ** 2) {
    return `${(bytes / 1024).toFixed(2)} KiB`;
  }

  if (bytes < 1024 ** 3) {
    return `${(bytes / 1024 ** 2).toFixed(2)} MiB`;
  }

  return `${(bytes / 1024 ** 3).toFixed(2)} GiB`;
}

function formatSpeed(mbps: number, miBs: number): string {
  const networkSpeed =
    mbps >= 1000
      ? `${(mbps / 1000).toFixed(2)} Gbps`
      : `${mbps.toFixed(2)} Mbps`;

  const dataSpeed =
    miBs >= 1024
      ? `${(miBs / 1024).toFixed(2)} GiB/s`
      : `${miBs.toFixed(2)} MiB/s`;

  return `${networkSpeed} (${dataSpeed})`;
}

export default function DownloadProgress({
  received,
  targetBytes,
  error,
  downloading,
  averageMbps,
  averageMiBs,
  elapsedSeconds,
}: DownloadProgressProps) {
  return (
    <>
      <p className="mt-3">
        Progress: {formatBytes(received)} / {formatBytes(targetBytes)}
      </p>

      {downloading && (
        <p className="mt-2 text-sm">
          Elapsed: {elapsedSeconds.toFixed(2)} seconds
        </p>
      )}

      {!downloading && averageMbps !== null && averageMiBs !== null && (
        <p className="mt-2">
          Average speed: {formatSpeed(averageMbps, averageMiBs)}
        </p>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
