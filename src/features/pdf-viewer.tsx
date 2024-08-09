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
    <div className="flex flex-col border-lynx-white border border-solid border-neutral-800 bg-white grow basis-2/3 rounded-3xl min-w-[320px] px-4 pb-4">
      <h2 className="text-2xl font-bold p-4">PDF Viewer</h2>

      {fileUrl && (
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            minHeight: "750px",
            height: "100%",
            width: "100%",
            minWidth: "300px",
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
