// Windows 2000 window chrome for the web and desktop apps: the parts eight
// palette colors cannot express. Edge model, scrollbars, cursors and menu
// colors follow maci0/clanker themes/win2k.css. The style query matches only
// while this plugin's palette is active, so other themes are untouched.

// 6x6 two-tone bevels sliced 2px per side by border-image.
// Raised window frame: outer ButtonLight/ButtonDkShadow, inner ButtonHilight/ButtonShadow.
const RAISED_FRAME =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' shape-rendering='crispEdges'%3E%3Cpath d='M0 0h5v1H1v4H0z' fill='%23d4d0c8'/%3E%3Cpath d='M5 0h1v6H0V5h5z' fill='%23404040'/%3E%3Cpath d='M1 1h3v1H2v2H1z' fill='%23fff'/%3E%3Cpath d='M4 1h1v4H1V4h3z' fill='%23808080'/%3E%3C/svg%3E";
// Raised push button: outer ButtonHilight/ButtonDkShadow, inner ButtonLight/ButtonShadow.
const RAISED_BUTTON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' shape-rendering='crispEdges'%3E%3Cpath d='M0 0h5v1H1v4H0z' fill='%23fff'/%3E%3Cpath d='M5 0h1v6H0V5h5z' fill='%23404040'/%3E%3Cpath d='M1 1h3v1H2v2H1z' fill='%23d4d0c8'/%3E%3Cpath d='M4 1h1v4H1V4h3z' fill='%23808080'/%3E%3C/svg%3E";
// Sunken field: outer ButtonShadow/ButtonHilight, inner ButtonDkShadow/ButtonLight.
const SUNKEN_FIELD =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' shape-rendering='crispEdges'%3E%3Cpath d='M0 0h5v1H1v4H0z' fill='%23808080'/%3E%3Cpath d='M5 0h1v6H0V5h5z' fill='%23fff'/%3E%3Cpath d='M1 1h3v1H2v2H1z' fill='%23404040'/%3E%3Cpath d='M4 1h1v4H1V4h3z' fill='%23d4d0c8'/%3E%3C/svg%3E";

const ARROW_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath d='M0,0 L0,18 L4,14 L7,20 L10,19 L7,13 L12,13 Z' fill='white' stroke='black' stroke-width='1' stroke-linejoin='miter'/%3E%3C/svg%3E") 0 0, default`;
const HAND_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath d='M8,1 L8,8 L5,8 L5,9 L4,9 L4,11 L3,11 L3,13 L4,13 L4,14 L5,14 L5,15 L4,15 L4,21 L14,21 L14,15 L15,15 L15,13 L16,13 L16,11 L14,11 L14,8 L11,8 L11,6 L10,6 L10,1 Z' fill='black'/%3E%3Cpath d='M9,2 L9,9 L6,9 L6,10 L5,10 L5,12 L4,12 L4,13 L5,13 L5,14 L6,14 L6,15 L5,15 L5,20 L13,20 L13,15 L14,15 L14,13 L15,13 L15,12 L13,12 L13,9 L11,9 L11,6 L10,6 L10,9 L9,9 Z' fill='white'/%3E%3C/svg%3E") 9 1, pointer`;
const BEAM_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='3' y='3' width='11' height='1' fill='black'/%3E%3Crect x='8' y='4' width='1' height='16' fill='black'/%3E%3Crect x='3' y='20' width='11' height='1' fill='black'/%3E%3Crect x='3' y='4' width='1' height='2' fill='black'/%3E%3Crect x='13' y='4' width='1' height='2' fill='black'/%3E%3Crect x='3' y='19' width='1' height='2' fill='black'/%3E%3Crect x='13' y='19' width='1' height='2' fill='black'/%3E%3C/svg%3E") 8 12, text`;

const ARROW_UP = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M4 9 L8 5 L12 9 Z' fill='black'/%3E%3C/svg%3E")`;
const ARROW_DOWN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M4 7 L8 11 L12 7 Z' fill='black'/%3E%3C/svg%3E")`;
const ARROW_LEFT = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M9 4 L5 8 L9 12 Z' fill='black'/%3E%3C/svg%3E")`;
const ARROW_RIGHT = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M7 4 L11 8 L7 12 Z' fill='black'/%3E%3C/svg%3E")`;

const SIDEBAR = `div:has(> [data-testid="sidebar-footer"])`;
const HEADER = `[data-testid="composer-dock-header"]`;
const TAB = `[data-testid^="workspace-tab-"][role="button"]`;
const SIDEBAR_FOCUSED = `#root:has([data-testid^="sidebar-"]:focus-within)`;
// Windows and their frames exist only in the wide layout; compact screens keep the chrome alone.
const SIDEBARS = `[data-testid="wide-shell"] :is(${SIDEBAR}, [data-testid="settings-sidebar"])`;
// A main window is the workspace deck (chat plus explorer), or on other screens
// (settings, new workspace) the pane that holds the caption header.
const DECK = `[data-testid^="workspace-deck-entry-"]`;
const MAIN_WINDOW = `[data-testid="wide-shell"] :is(${DECK}, div:has(> ${HEADER}):not(${DECK} *))`;

export const PUSH_BUTTON_ATTRIBUTE = "data-w2k-push";
export const DIALOG_PANEL_ATTRIBUTE = "data-w2k-dialog-panel";
const PUSH = `[${PUSH_BUTTON_ATTRIBUTE}="true"]:not(${TAB}):not(${HEADER} *)`;

export const CHROME_CSS = `
@container style(--colors-surface0: #d4d0c8) and style(--colors-surface2: #ffffff) and style(--colors-accent: #0a246a) {
  body {
    --w2k-face: #d4d0c8;
    --w2k-hilight: #ffffff;
    --w2k-shadow: #808080;
    --w2k-dk-shadow: #404040;
    --w2k-desktop: #3a6ea5;
    --w2k-title: #0a246a;
    --w2k-title-grad: #a6caf0;
    --w2k-ititle: #808080;
    --w2k-ititle-grad: #c0c0c0;
    --w2k-ititle-text: #d4d0c8;
    --w2k-sel: #0a246a;
    --w2k-sel-text: #ffffff;
    --w2k-info: #ffffe1;

    /* Shades Paseo derives from the palette that Windows 2000 draws differently. */
    --colors-accent-foreground: var(--w2k-sel-text);
    --colors-primary: var(--w2k-sel);
    --colors-primary-foreground: var(--w2k-sel-text);
    --colors-surface-sidebar-hover: var(--w2k-face);
    --colors-surface-sidebar-selected: var(--w2k-sel);
    --colors-surface3: var(--w2k-face);
    --enrm-selection-bg: var(--w2k-sel);
    /* Tahoma where installed, else the platform UI font. */
    --paseo-ui-font: Tahoma, "MS Sans Serif", "Microsoft Sans Serif", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

    cursor: ${ARROW_CURSOR};
    /* Read by client/web.ts to tell whether this query matches. */
    --w2k-active: 1;
  }

  /* body, not #root: dialogs mount in their own <body> child. */
  body * {
    border-radius: 0 !important;
    scrollbar-color: auto !important;
    scrollbar-width: auto !important;
  }

  ::selection {
    background: var(--w2k-sel);
    color: var(--w2k-sel-text);
  }

  /* Cursors: the arrow on controls, the hand on links, the I-beam in text fields. */
  body :is(button, [role="button"], [role="tab"], [role="menuitem"], [role="radio"], [role="checkbox"], [role="switch"]) {
    cursor: ${ARROW_CURSOR} !important;
  }
  body :is(a[href], [role="link"]) {
    cursor: ${HAND_CURSOR} !important;
  }
  body :is(textarea, input, [contenteditable="true"]) {
    cursor: ${BEAM_CURSOR} !important;
  }

  /* Desktop: the background shows between the sidebar and workspace windows. */
  [data-testid="wide-shell"] {
    background-color: var(--w2k-desktop) !important;
  }
  [data-testid="wide-shell"] :has(${HEADER}) {
    background-color: transparent !important;
  }
  :is(${SIDEBARS}, ${MAIN_WINDOW}) {
    margin: 5px;
    border-style: solid !important;
    border-width: 2px !important;
    border-image: url("${RAISED_FRAME}") 2 !important;
  }
  ${MAIN_WINDOW} {
    background-color: var(--w2k-face) !important;
  }

  /* Title bars: the active caption gradient on the focused window. */
  ${HEADER} {
    background: linear-gradient(to right, var(--w2k-title), var(--w2k-title-grad)) !important;
  }
  ${HEADER} :is([data-testid="workspace-header-title"], [data-testid="workspace-header-subtitle"]),
  ${HEADER} :is([data-testid="workspace-header-title"], [data-testid="workspace-header-subtitle"]) * {
    color: var(--w2k-sel-text) !important;
    font-weight: 700 !important;
  }
  ${SIDEBARS}::before {
    content: "Paseo";
    flex: none;
    height: 18px;
    padding: 0 4px;
    font: 700 11px/18px var(--paseo-ui-font);
    color: var(--w2k-ititle-text);
    background: linear-gradient(to right, var(--w2k-ititle), var(--w2k-ititle-grad));
  }
  ${SIDEBAR_FOCUSED} ${SIDEBARS}::before {
    color: var(--w2k-sel-text);
    background: linear-gradient(to right, var(--w2k-title), var(--w2k-title-grad));
  }
  /* Screens without a workspace title get the app name, settings its own. */
  ${HEADER}:not(:has([data-testid="workspace-header-title"]))::before {
    content: "Paseo";
    position: absolute;
    top: 0;
    left: 8px;
    line-height: 36px;
    font-weight: 700;
    color: var(--w2k-sel-text);
  }
  ${HEADER}:has([data-testid="menu-button"]):not(:has([data-testid="workspace-header-title"]))::before {
    left: 40px;
  }
  [data-testid="settings-detail-pane"] ${HEADER}::before {
    content: "Settings";
  }
  ${SIDEBAR_FOCUSED} ${HEADER} {
    background: linear-gradient(to right, var(--w2k-ititle), var(--w2k-ititle-grad)) !important;
  }
  ${SIDEBAR_FOCUSED} ${HEADER} :is([data-testid="workspace-header-title"], [data-testid="workspace-header-subtitle"]),
  ${SIDEBAR_FOCUSED} ${HEADER} :is([data-testid="workspace-header-title"], [data-testid="workspace-header-subtitle"]) * {
    color: var(--w2k-ititle-text) !important;
  }

  /* Caption buttons: face grey with the push-button bevel. */
  ${HEADER} [role="button"] {
    background-color: var(--w2k-face) !important;
    border-style: solid !important;
    border-width: 2px !important;
    border-image: url("${RAISED_BUTTON}") 2 !important;
  }
  ${HEADER} [role="button"]:active {
    border-image: url("${SUNKEN_FIELD}") 2 !important;
  }

  /* Flat toolbar buttons raise a 1px bevel under the pointer. */
  :is([data-testid="message-input-root"], [data-testid="sidebar-footer"], [data-testid="workspace-tabs-row"]) [role="button"]:not(${TAB}):hover {
    background-color: transparent !important;
    box-shadow: inset 1px 1px 0 var(--w2k-hilight), inset -1px -1px 0 var(--w2k-shadow);
  }
  :is([data-testid="message-input-root"], [data-testid="sidebar-footer"], [data-testid="workspace-tabs-row"]) [role="button"]:not(${TAB}):active {
    box-shadow: inset 1px 1px 0 var(--w2k-shadow), inset -1px -1px 0 var(--w2k-hilight);
  }

  /* Tab control: raised tabs, the selected one joined to the page below. */
  [data-testid="workspace-tabs-row"] {
    border-bottom-color: var(--w2k-hilight) !important;
  }
  ${TAB} {
    background-color: var(--w2k-face) !important;
    border-style: solid !important;
    border-width: 1px 1px 0 1px !important;
    border-color: var(--w2k-hilight) var(--w2k-dk-shadow) transparent var(--w2k-hilight) !important;
    box-shadow: inset -1px 0 0 var(--w2k-shadow);
    margin-top: 2px;
  }
  ${TAB}[aria-selected="true"] {
    margin-top: 0;
    margin-bottom: -1px;
    z-index: 1;
  }

  /* Selected list rows: Highlight navy with HighlightText. */
  [data-testid^="sidebar-"][aria-selected="true"],
  [data-testid^="sidebar-"][aria-selected="true"] * {
    color: var(--w2k-sel-text) !important;
  }

  /* Text fields: the sunken 2px well. */
  [data-testid="message-input-root"] > * > * > *:first-child,
  body :is(input, textarea):not([data-testid="message-input-root"] *) {
    background-color: var(--w2k-hilight) !important;
    border-style: solid !important;
    border-width: 2px !important;
    border-image: url("${SUNKEN_FIELD}") 2 !important;
  }

  /* The prompt reads back as a sunken read-only field. */
  [data-testid="user-message"] {
    --colors-surface3: var(--w2k-hilight);
  }
  [data-testid="user-message"] > * > *:first-child {
    border-style: solid !important;
    border-width: 2px !important;
    border-image: url("${SUNKEN_FIELD}") 2 !important;
  }

  /* Push buttons: face grey with the raised bevel, sunken while pressed. */
  body ${PUSH} {
    background-color: var(--w2k-face) !important;
    border-style: solid !important;
    border-width: 2px !important;
    border-image: url("${RAISED_BUTTON}") 2 !important;
  }
  body ${PUSH}:active {
    border-image: url("${SUNKEN_FIELD}") 2 !important;
  }
  body ${PUSH} * {
    color: #000000 !important;
  }

  /* Menus, popovers and dialogs: face grey in a raised window frame. */
  body :is([role="menu"], [${DIALOG_PANEL_ATTRIBUTE}], [data-testid="workspace-hover-card"], div:has(> div > div > [role="menuitem"]), div:has(> div > [role="menuitem"])) {
    background-color: var(--w2k-face) !important;
    border-style: solid !important;
    border-width: 2px !important;
    border-image: url("${RAISED_FRAME}") 2 !important;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.35) !important;
    --colors-surface1: var(--w2k-face);
  }
  /* Dialogs carry no title, so their caption bar shows the app name. */
  [${DIALOG_PANEL_ATTRIBUTE}]::before {
    content: "Paseo";
    flex: none;
    height: 18px;
    padding: 0 4px;
    font: 700 11px/18px var(--paseo-ui-font);
    color: var(--w2k-sel-text);
    background: linear-gradient(to right, var(--w2k-title), var(--w2k-title-grad));
  }
  body :is([role="menu"] [role="button"], [role="menuitem"]):is(:hover, :focus-visible, [aria-selected="true"]) {
    background-color: var(--w2k-sel) !important;
    border-color: transparent !important;
  }
  body :is([role="menu"] [role="button"], [role="menuitem"]):is(:hover, :focus-visible, [aria-selected="true"]) * {
    color: var(--w2k-sel-text) !important;
    stroke: var(--w2k-sel-text);
  }
  body [role="tooltip"] {
    background-color: var(--w2k-info) !important;
    color: #000000 !important;
    border: 1px solid #000000 !important;
  }

  /* Scrollbars: 16px, arrow buttons, beveled thumb on the dithered track. */
  body ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }
  body ::-webkit-scrollbar-track {
    background: repeating-conic-gradient(var(--w2k-face) 0 25%, var(--w2k-hilight) 0 50%) 0 0 / 2px 2px;
  }
  body ::-webkit-scrollbar-thumb,
  body ::-webkit-scrollbar-button {
    background-color: var(--w2k-face);
    border: 1px solid;
    border-color: var(--w2k-hilight) var(--w2k-dk-shadow) var(--w2k-dk-shadow) var(--w2k-hilight);
    box-shadow: inset -1px -1px 0 var(--w2k-shadow), inset 1px 1px 0 var(--w2k-face);
  }
  body ::-webkit-scrollbar-button {
    display: block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: center;
  }
  body ::-webkit-scrollbar-button:start:increment,
  body ::-webkit-scrollbar-button:end:decrement {
    display: none;
  }
  body ::-webkit-scrollbar-button:active {
    border-color: var(--w2k-shadow);
    box-shadow: none;
  }
  body ::-webkit-scrollbar-button:vertical:decrement { background-image: ${ARROW_UP}; }
  body ::-webkit-scrollbar-button:vertical:increment { background-image: ${ARROW_DOWN}; }
  body ::-webkit-scrollbar-button:horizontal:decrement { background-image: ${ARROW_LEFT}; }
  body ::-webkit-scrollbar-button:horizontal:increment { background-image: ${ARROW_RIGHT}; }
  body ::-webkit-scrollbar-corner {
    background-color: var(--w2k-face);
  }
}
`;
