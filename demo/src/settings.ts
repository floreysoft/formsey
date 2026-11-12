import type { Settings } from '@formsey/core';

/**
 * Theme settings for the native field library.
 *
 * `<formsey-styled-form>` copies every key starting with `--` from
 * `colors[mode]`, `fonts` and `spacing` into the form as CSS custom
 * properties. The native styles have no built-in palette, so a host
 * application always has to provide one — this is a neutral example.
 */
export function createSettings(mode: "light" | "dark"): Settings {
  const shared = {
    "--formsey-accent-color": "#d97706",
    "--formsey-accent-contrast": "#ffffff",
    "--formsey-error-text-color": "#dc2626",
    "--formsey-palette-1": "#2563eb",
    "--formsey-palette-2": "#059669",
    "--formsey-palette-3": "#9333ea",
    "--formsey-palette-4": "#db2777",
    "--formsey-palette-5": "#ca8a04"
  }
  return {
    mode,
    colors: {
      light: {
        ...shared,
        "--formsey-color": "#1f2933",
        "--formsey-background": "#ffffff",
        "--formsey-surface": "#f3f4f6",
        "--formsey-surface-hover": "#e5e7eb",
        "--formsey-shade": "#80808030",
        "--formsey-border": "#c5cad3",
        "--formsey-border-focus": "#d97706",
        "--formsey-bg-1": "#f9fafb",
        "--formsey-bg-2": "#f3f4f6"
      },
      dark: {
        ...shared,
        "--formsey-color": "#e5e7eb",
        "--formsey-background": "#1f2226",
        "--formsey-surface": "#2a2e34",
        "--formsey-surface-hover": "#353a42",
        "--formsey-shade": "#80808040",
        "--formsey-border": "#454b55",
        "--formsey-border-focus": "#d97706",
        "--formsey-bg-1": "#23272c",
        "--formsey-bg-2": "#2a2e34"
      }
    },
    fonts: {
      "--formsey-font": "14px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    },
    spacing: {
      "--formsey-space-narrow": "8px",
      "--formsey-space-wide": "16px",
      "--formsey-border-radius": "4px",
      "--formsey-input-height": "2.25em"
    }
  }
}
