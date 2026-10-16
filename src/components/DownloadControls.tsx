type DownloadControlsProps = {
  size: string;
  concurrency: string;
  downloading: boolean;
  onSizeChange: (value: string) => void;
  onConcurrencyChange: (value: string) => void;
  onDownload: () => void;
};

export default function DownloadControls({
  size,
  concurrency,
  downloading,
  onSizeChange,
  onConcurrencyChange,
  onDownload,
}: DownloadControlsProps) {
  const sizes = Array.from({ length: 15 }, (_, i) => 2 ** i);

  function formatSize(mib: number): string {
    if (mib >= 1024) {
      return `${mib / 1024} GiB`;
    }

    return `${mib} MiB`;
  }

  const concurrencyOptions = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

  return (
    <div className="mt-4 flex flex-col gap-2 text-white">
      <label htmlFor="sizes">Download size:</label>

      <select
        id="sizes"
        value={size}
        onChange={(event) => onSizeChange(event.target.value)}
        disabled={downloading}
        className="rounded border p-1 w-60 bg-dark"
      >
        {sizes.map((value) => (
          <option key={value} value={value}>
            {formatSize(value)}
          </option>
        ))}
      </select>

      <label htmlFor="concurrency">Concurrency:</label>

      <select
        id="concurrency"
        value={concurrency}
        onChange={(event) => onConcurrencyChange(event.target.value)}
        disabled={downloading}
        className="rounded border p-1 w-60 bg-dark"
      >
        {concurrencyOptions.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <button
        onClick={onDownload}
        disabled={downloading}
        className="rounded border p-1 disabled:opacity-50 bg-btn hover:bg-btn-hover text-dark w-60"
      >
        {downloading ? "Downloading..." : "Download"}
      </button>
    </div>
  );
}
