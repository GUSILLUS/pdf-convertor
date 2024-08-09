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
    <div className="flex max-h-[50vh] min-h-[50vh] grow basis-1/3 flex-col overflow-hidden rounded-3xl border border-lynx-white border-neutral-800 border-solid bg-white pb-4 md:h-auto md:max-h-max">
      <h2 className="p-4 font-bold text-2xl">PDF Converter</h2>

      <ToggleButtonGroup
        options={Object.values(TabsOptions)}
        selectedOption={titleOfToggleButtonGroup}
        onSelect={onTabsSelect as (value: string) => void}
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