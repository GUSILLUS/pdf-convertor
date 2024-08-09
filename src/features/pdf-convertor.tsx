import { Separator, ToggleButtonGroup } from "components/ui";
import { useState } from "react";
import { useLocalStorage } from "shared/hooks";
import { type HistoryItem, TabsOptions } from "shared/types";
import { ContentTextarea } from "./content-textarea";
import { HistoryList } from "./history-list";

type PDFConvertorProps = {
  onItemSelect: (fileUrl: string) => void;
  onConvert: (text: string, changeHistory: (text: string, base64: string) => void) => void;
  isLoading: boolean;
};

const PDFConvertor: React.FC<PDFConvertorProps> = ({ onItemSelect, onConvert, isLoading }) => {
  const [titleOfToggleButtonGroup, setTitleOfToggleButtonGroup] =
    useState<TabsOptions>(TabsOptions.Message);
  const onTabsSelect = (value: TabsOptions) => {
    setTitleOfToggleButtonGroup(value);
  };
  const [history, setHistory] = useLocalStorage<HistoryItem[]>("history", []);

  const onItemDelete = (fileUrl: string) => {
    setHistory((prev) => prev.filter((item) => item.fileUrl !== fileUrl));
  };

  const changeHistory = (text: string, base64: string) => {
    setHistory((prev) => [
      ...prev,
      { text, fileUrl: base64, createdAt: new Date().toLocaleString() },
    ]);
  }

  const handleConvert = async (text: string) => {
    onConvert(text, changeHistory);
  }

  return (
    <div className="flex flex-col border-lynx-white border border-solid border-neutral-800 bg-white grow basis-1/3 rounded-3xl pb-4">
      <h2 className="text-2xl font-bold p-4">PDF Converter</h2>

      <ToggleButtonGroup
        options={Object.values(TabsOptions)}
        selectedOption={titleOfToggleButtonGroup}
        onSelect={onTabsSelect as (value: string) => void}
        className="mb-2"
      />

      <Separator />

      {titleOfToggleButtonGroup === TabsOptions.Message && (
        <ContentTextarea onConvert={handleConvert} isLoading={isLoading} />
      )}
      {titleOfToggleButtonGroup === TabsOptions.History && (
        <HistoryList
          history={history}
          onSelect={onItemSelect}
          onDelete={onItemDelete}
        />
      )}
    </div>
  );
};

export { PDFConvertor };