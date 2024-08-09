import { Textarea, Button } from "components/ui";
import { type ChangeEvent, useState } from "react";

type ContentTextareaProps = {
  onConvert: (text: string) => void;
  isLoading: boolean;
};

const ContentTextarea: React.FC<ContentTextareaProps> = ({
  onConvert,
  isLoading,
}) => {
  const [text, setText] = useState("");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleConvert = () => {
    onConvert(text);
    setText("");
  };

  return (
    <div className="flex grow flex-col gap-2 px-6 py-4">
      <Textarea
        className="flex grow resize-none font-medium"
        placeholder="Type your message here."
        value={text}
        onChange={onChange}
        data-testid="content-textarea"
      />

      <Button
        variant="default"
        className="ml-auto min-w-[150px] max-w-[200px]"
        onClick={handleConvert}
        disabled={!text || isLoading}
      >
        Convert to PDF
      </Button>
    </div>
  );
};

export { ContentTextarea };
