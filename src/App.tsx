import { useState } from "react";
import { PDFConvertor, PDFViewer } from "features";
import { blobToBase64 } from "shared/lib/utils";
import { useToast } from "shared/hooks";

function App() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleItemSelect = (fileUrl: string) => {
    setFileUrl(fileUrl);
  };

  const handleConvert = async (
    text: string,
    changeHistory: (text: string, base64: string) => void,
  ) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "/api/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4",
        {
          method: "POST",
          body: JSON.stringify({ text }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const blob = await response.blob();
      const base64 = await blobToBase64(blob);

      changeHistory(text, base64);

      setFileUrl(base64);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full-screen w-full grow flex-col justify-center gap-4 overflow-hidden bg-white-solid p-3 md:h-full-screen md:flex-row md:p-6">
      <PDFConvertor
        onConvert={handleConvert}
        onItemSelect={handleItemSelect}
        isLoading={isLoading}
      />

      <PDFViewer fileUrl={fileUrl} />
    </div>
  );
}

export default App;
