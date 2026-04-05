export const copyToClipboard = (text: string, cb?: () => void) => {
  if (navigator.clipboard && navigator.permissions) {
    navigator.clipboard.writeText(text).then(cb);
  } else if (document.queryCommandSupported('copy')) {
    const ele = document.createElement('textarea');
    ele.value = text;
    document.body.appendChild(ele);
    ele.select();
    document.execCommand('copy');
    document.body.removeChild(ele);
    cb?.();
  }
};

export const pasteFromClipboard = async (cb?: (text: string) => void): Promise<string | null> => {
  try {
    if (navigator.clipboard && navigator.permissions) {
      const text = await navigator.clipboard.readText();
      cb?.(text);
      return text;
    } else if (document.queryCommandSupported('paste')) {
      const ele = document.createElement('textarea');
      document.body.appendChild(ele);
      ele.focus();
      document.execCommand('paste');
      const text = ele.value;
      document.body.removeChild(ele);
      cb?.(text);
      return text;
    }
    return null;
  } catch (error) {
    console.error('Failed to read clipboard:', error);
    return null;
  }
};
