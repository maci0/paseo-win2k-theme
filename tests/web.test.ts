import { afterAll, beforeAll, expect, mock, test } from "bun:test";
import { Window } from "happy-dom";

const window = new Window();
const { document } = window;
Object.assign(globalThis, {
  document,
  getComputedStyle: window.getComputedStyle.bind(window),
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
  MutationObserver: window.MutationObserver,
});
mock.module("react-native", () => ({ Platform: { OS: "web" } }));
const { default: contribute } = await import("../index.client");

// Marking runs on the animation frame after a DOM change; a few frames cover it.
const FRAMES_TO_SETTLE = 3;
async function settle(): Promise<void> {
  for (let frame = 0; frame < FRAMES_TO_SETTLE; frame += 1) {
    await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
  }
}

function add(html: string): void {
  document.body.insertAdjacentHTML("beforeend", html);
}

const themes: unknown[] = [];
let cleanup: () => void | Promise<void>;

beforeAll(() => {
  cleanup = contribute({
    addTheme(theme) {
      themes.push(theme);
      return () => {};
    },
  });
});

afterAll(() => window.happyDOM.close());

test("registers the Windows Standard palette", () => {
  expect(themes).toEqual([
    {
      id: "windows-2000",
      name: "Windows 2000",
      appearance: "light",
      colors: {
        background: "#d4d0c8",
        foreground: "#000000",
        raised: "#ffffff",
        control: "#ffffff",
        border: "#808080",
        accent: "#0a246a",
        mutedForeground: "#404040",
        ring: "#808080",
      },
    },
  ]);
});

test("injects the chrome stylesheet scoped to the palette", () => {
  const css = [...document.head.querySelectorAll("style")].map((style) => style.textContent).join("");
  expect(css).toContain("@container style(--colors-surface0: #d4d0c8)");
});

test("marks nothing while another theme is active", async () => {
  add('<button id="idle" style="border: 1px solid rgb(128, 128, 128)">Idle</button>');
  await settle();
  expect(document.getElementById("idle")?.getAttribute("data-w2k-push")).toBeNull();
});

test("marks bordered buttons as push buttons once the theme is active", async () => {
  document.body.style.setProperty("--w2k-active", "1");
  add('<button id="push" style="border: 1px solid rgb(128, 128, 128)">OK</button>');
  add('<button id="row" style="border: 0">Row</button>');
  await settle();
  expect(document.getElementById("push")?.getAttribute("data-w2k-push")).toBe("true");
  expect(document.getElementById("row")?.getAttribute("data-w2k-push")).toBe("false");
});

test("frames the first opaque panel of a dialog whose role is set after mount", async () => {
  add(
    '<div id="dialog"><div style="background-color: rgba(0, 0, 0, 0.5)"></div>' +
      '<div id="panel" style="background-color: rgb(212, 208, 200)"></div></div>',
  );
  await settle();
  document.getElementById("dialog")?.setAttribute("role", "dialog");
  await settle();
  expect(document.getElementById("panel")?.hasAttribute("data-w2k-dialog-panel")).toBe(true);
});

test("cleanup removes the stylesheet and stops marking", async () => {
  await cleanup();
  expect(document.head.querySelectorAll("style").length).toBe(0);
  add('<button id="late" style="border: 1px solid rgb(128, 128, 128)">Late</button>');
  await settle();
  expect(document.getElementById("late")?.getAttribute("data-w2k-push")).toBeNull();
});
