import { Platform } from "react-native";
import { CHROME_CSS, DIALOG_PANEL_ATTRIBUTE, PUSH_BUTTON_ATTRIBUTE } from "./chrome";

interface StyleElement {
  textContent: string | null;
  remove(): void;
}

interface DomElement {
  setAttribute(name: string, value: string): void;
  querySelectorAll(selector: string): Iterable<DomElement>;
}

declare const document: {
  body: DomElement;
  documentElement: DomElement;
  head: { append(node: StyleElement): void };
  createElement(tagName: "style"): StyleElement;
  querySelectorAll(selector: string): Iterable<DomElement>;
};
declare function getComputedStyle(element: DomElement): {
  backgroundColor: string;
  borderTopWidth: string;
  getPropertyValue(property: string): string;
};
declare function requestAnimationFrame(callback: () => void): number;
declare function cancelAnimationFrame(handle: number): void;
declare class MutationObserver {
  constructor(callback: () => void);
  observe(
    target: DomElement,
    options: { childList?: boolean; subtree?: boolean; attributes?: boolean; attributeFilter?: string[] },
  ): void;
  disconnect(): void;
}

const DIALOG_SCANNED_ATTRIBUTE = "data-w2k-dialog-scanned";

// CSS cannot select on computed styles, so mark what the chrome needs: push
// buttons (the only <button>s Paseo draws with a border) and each dialog's
// painted panel (role="dialog" wraps it in transparent layers). Each element
// is measured once, and only while the chrome's style query matches.
function markElements(): void {
  if (!getComputedStyle(document.body).getPropertyValue("--w2k-active")) return;
  for (const button of document.querySelectorAll(`button:not([${PUSH_BUTTON_ATTRIBUTE}])`)) {
    const bordered = getComputedStyle(button).borderTopWidth !== "0px";
    button.setAttribute(PUSH_BUTTON_ATTRIBUTE, String(bordered));
  }
  for (const dialog of document.querySelectorAll(`[role="dialog"]:not([${DIALOG_SCANNED_ATTRIBUTE}])`)) {
    const panel = firstOpaque(dialog);
    if (!panel) continue;
    panel.setAttribute(DIALOG_PANEL_ATTRIBUTE, "");
    dialog.setAttribute(DIALOG_SCANNED_ATTRIBUTE, "");
  }
}

// The backdrop is translucent rgba(); the panel is the first opaque rgb() fill.
function isOpaque(element: DomElement): boolean {
  return getComputedStyle(element).backgroundColor.startsWith("rgb(");
}

function firstOpaque(root: DomElement): DomElement | undefined {
  if (isOpaque(root)) return root;
  for (const element of root.querySelectorAll("*")) {
    if (isOpaque(element)) return element;
  }
  return undefined;
}

/** Adds the window chrome on web and desktop; native apps get the palette only. */
export function installChrome(): () => void {
  if (Platform.OS !== "web") return () => {};
  const style = document.createElement("style");
  style.textContent = CHROME_CSS;
  document.head.append(style);

  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      markElements();
    });
  };
  const observer = new MutationObserver(schedule);
  // Dialogs get role="dialog" in an attribute update after their nodes mount.
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["role"] });
  // Selecting a theme swaps the root class without adding nodes.
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  schedule();

  return () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
    style.remove();
  };
}
