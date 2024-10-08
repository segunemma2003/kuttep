import React, { useCallback, useState } from "react";

const useClipboardPaste = () => {
  const [pastedText, setPastedText] = useState();
  const pasteFromClipboard = useCallback(async () => {
    if (navigator.clipboard) {
      const text = await navigator.clipboard.readText();
      setPastedText(text);
    } else {
      console.log("Clipboard Api not available");
    }
  }, []);
  return [pastedText, pasteFromClipboard];
};

export default useClipboardPaste;
