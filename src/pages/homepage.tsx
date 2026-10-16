import { useState } from "react";
import DownloadControls from "../components/DownloadControls";
import DownloadProgress from "../components/DownloadProgress";
import { useDownload } from "../hooks/useDownload";

export default function Homepage() {
  const [size, setSize] = useState("32");
  const [concurrency, setConcurrency] = useState("4");

  const {
    downloading,
    received,
    error,
    averageMbps,
    averageMiBs,
    elapsedSeconds,
    startDownload,
  } = useDownload();

  const targetBytes = Number(size) * 1024 ** 2;

  function handleDownload() {
    void startDownload(targetBytes, Number(concurrency));
  }

  return (
    <section className="w-full h-full flex flex-row justify-center items-center">
      <div className="bg-section border border-section-border p-8 w-100 rounded-2xl">
        <DownloadControls
          size={size}
          concurrency={concurrency}
          downloading={downloading}
          onSizeChange={setSize}
          onConcurrencyChange={setConcurrency}
          onDownload={handleDownload}
        />

        <DownloadProgress
          received={received}
          targetBytes={targetBytes}
          error={error}
          downloading={downloading}
          averageMbps={averageMbps}
          averageMiBs={averageMiBs}
          elapsedSeconds={elapsedSeconds}
        />
      </div>
    </section>
  );
}
