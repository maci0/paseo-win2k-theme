import type { PluginClientContext } from "@getpaseo/plugin/client";

// Windows 2000 "Windows Standard" scheme, HKCU\Control Panel\Colors defaults.
export default function contribute(client: PluginClientContext) {
  client.addTheme({
    id: "windows-2000",
    name: "Windows 2000",
    appearance: "light",
    colors: {
      background: "#d4d0c8", // ButtonFace
      foreground: "#000000", // WindowText
      raised: "#ffffff", // Window
      control: "#ffffff", // Window
      border: "#808080", // ButtonShadow
      accent: "#0a246a", // Hilight
      mutedForeground: "#404040", // ButtonDkShadow
      ring: "#808080", // GrayText
    },
  });
  return () => {};
}
