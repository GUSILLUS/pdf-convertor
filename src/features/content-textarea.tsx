import { Textarea, Button } from "components/ui";
import { type ChangeEvent, useState } from "react";

type ContentTextareaProps = {
  onConvert: (text: string) => void;
  isLoading: boolean;
};

const ContentTextarea: React.FC<ContentTextareaProps> = ({ onConvert, isLoading }) => {
  const [text, setText] = useState("");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleConvert = () => {
    onConvert(text);
    setText("");
  };

  return (
    <div className="flex flex-col gap-2 grow px-6 py-4">
      <Textarea
        className="h-full w-full font-medium resize-none"
        placeholder="Type your message here."
        value={text}
        onChange={onChange}
      />

      <Button variant="default" className="w-[200px] ml-auto" onClick={handleConvert} disabled={!text || isLoading}>
        Convert to PDF
      </Button>
    </div>
  );
};

export { ContentTextarea };
