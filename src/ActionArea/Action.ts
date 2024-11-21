export type ActionDisabled = { disabledReason: string };
export type ActionDownload = { download: string; url: string };
export type ActionHandler = (() => void) | { mousedown: () => void };
export type ActionSubmit = "submit";
export type ActionUrl =
  // string & {} is a hack that still accepts strings,
  // but does not swallow the union with "submit"
  (string & {}) | { newWindow: string } | { replace: string };

export type Action =
  | ActionDisabled
  | ActionDownload
  | ActionHandler
  | ActionSubmit
  | ActionUrl;
