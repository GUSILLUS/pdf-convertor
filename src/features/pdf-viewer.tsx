import { Viewer, Worker } from "@react-pdf-viewer/core";
import packageJson from "../../package.json";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];

type PDFViewerProps = {
  fileUrl: string | null;
};

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
  });

  return (
    <div className="flex min-w-[300px] grow basis-2/3 flex-col rounded-3xl border border-lynx-white border-neutral-800 border-solid bg-white px-2 pb-4 md:px-4">
      <h2 className="p-4 font-bold text-2xl">PDF Viewer</h2>

      {fileUrl && (
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            borderRadius: "15px",
            overflow: "hidden",
            minHeight: "750px",
            height: "100%",
            width: "100%",
            minWidth: "280px",
          }}
        >
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </div>
      )}
    </div>
  );
};

export { PDFViewer };
