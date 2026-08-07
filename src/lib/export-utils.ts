import {
  type ThemeConfig,
  generateSchemeFromConfig,
  generateTypeScale,
  generateSpacingScale,
  DEFAULT_KEY_COLORS,
} from "@/theme/scheme";

export type TokenScope = "all" | "color" | "typography" | "spacing" | "radius" | "shadow";
export type TokenFormat = "json" | "css" | "tailwind";

const SHAPE_SCALE = [
  { name: "none", value: 0 },
  { name: "extraSmall", value: 4 },
  { name: "small", value: 8 },
  { name: "medium", value: 12 },
  { name: "large", value: 16 },
  { name: "extraLarge", value: 24 },
  { name: "full", value: 9999 },
];

const SHADOW_LEVELS = [
  { level: 0, shadow: "none" },
  {
    level: 1,
    shadow: "0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)",
  },
  {
    level: 2,
    shadow: "0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)",
  },
  {
    level: 3,
    shadow: "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px rgba(0,0,0,0.3)",
  },
  {
    level: 4,
    shadow: "0px 6px 10px 4px rgba(0,0,0,0.15), 0px 2px 3px rgba(0,0,0,0.3)",
  },
  {
    level: 5,
    shadow: "0px 8px 12px 6px rgba(0,0,0,0.15), 0px 4px 4px rgba(0,0,0,0.3)",
  },
];

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}

export function generateTokenExport(config: ThemeConfig, scope: TokenScope, format: TokenFormat): string {
  if (scope === "all") {
    return generateAllTokens(config, format);
  }

  if (scope === "color") {
    return generateColorTokens(config, format);
  }
  if (scope === "typography") {
    return generateTypographyTokens(config, format);
  }
  if (scope === "spacing") {
    return generateSpacingTokens(config, format);
  }
  if (scope === "radius") {
    return generateRadiusTokens(format);
  }
  if (scope === "shadow") {
    return generateShadowTokens(format);
  }

  return generateAllTokens(config, format);
}

function generateAllTokens(config: ThemeConfig, format: TokenFormat): string {
  const parts = [
    generateColorTokens(config, format),
    generateTypographyTokens(config, format),
    generateSpacingTokens(config, format),
    generateRadiusTokens(format),
    generateShadowTokens(format),
  ];

  if (format === "json") {
    const combined: Record<string, unknown> = {};
    for (const part of parts) {
      try {
        const parsed = JSON.parse(part);
        Object.assign(combined, parsed);
      } catch {
        // ignore parse errors for non-json parts
      }
    }
    return JSON.stringify(combined, null, 2);
  }

  return parts.join("\n\n");
}

function generateColorTokens(config: ThemeConfig, format: TokenFormat): string {
  const lightScheme = generateSchemeFromConfig(config, "light");
  const darkScheme = generateSchemeFromConfig(config, "dark");
  const keyColors = { ...DEFAULT_KEY_COLORS, ...config.keyColors };

  if (format === "json") {
    return JSON.stringify(
      {
        colors: {
          keyColors,
          scheme: {
            light: lightScheme,
            dark: darkScheme,
          },
        },
      },
      null,
      2
    );
  }

  if (format === "css") {
    let css = ":root {\n";
    for (const [k, v] of Object.entries(lightScheme)) {
      const cssKey = camelToKebab(k);
      css += `  --md-sys-color-${cssKey}-light: ${v};\n`;
    }
    for (const [k, v] of Object.entries(darkScheme)) {
      const cssKey = camelToKebab(k);
      css += `  --md-sys-color-${cssKey}-dark: ${v};\n`;
    }
    css += "}\n\n";

    css += "@media (prefers-color-scheme: light) {\n  :root {\n";
    for (const [k] of Object.entries(lightScheme)) {
      const cssKey = camelToKebab(k);
      css += `    --md-sys-color-${cssKey}: var(--md-sys-color-${cssKey}-light);\n`;
    }
    css += "  }\n}\n\n";

    css += "@media (prefers-color-scheme: dark) {\n  :root {\n";
    for (const [k] of Object.entries(darkScheme)) {
      const cssKey = camelToKebab(k);
      css += `    --md-sys-color-${cssKey}: var(--md-sys-color-${cssKey}-dark);\n`;
    }
    css += "  }\n}";
    return css;
  }

  if (format === "tailwind") {
    const lines: string[] = [
      "// Generated Tailwind config extension",
      "module.exports = {",
      "  theme: {",
      "    extend: {",
      "      colors: {",
    ];
    for (const [k, v] of Object.entries(lightScheme)) {
      const key = k.replace(/([A-Z])/g, "-$1").toLowerCase();
      lines.push(`        "${key}": "${v}",`);
    }
    lines.push("      },");
    lines.push("    },");
    lines.push("  },");
    lines.push("};");
    return lines.join("\n");
  }

  return "";
}

function generateTypographyTokens(config: ThemeConfig, format: TokenFormat): string {
  const typeScale = generateTypeScale(config.typography);
  const fontFamily = config.typography.fontFamily?.trim()
    ? `'${config.typography.fontFamily.trim()}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
    : "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  if (format === "json") {
    return JSON.stringify(
      {
        typography: {
          baseSize: config.typography.baseSize,
          scale: config.typography.scale,
          fontFamily: config.typography.fontFamily || "Inter",
          letterSpacingOverrides: config.typography.letterSpacingOverrides || {},
          styles: Object.fromEntries(typeScale.map((s) => [s.name, s])),
        },
      },
      null,
      2
    );
  }

  if (format === "css") {
    let css = ":root {\n";
    css += `  --md-sys-typography-font-family: ${fontFamily};\n\n`;
    for (const s of typeScale) {
      const token = s.name.replace(/\s+/g, "-").toLowerCase();
      css += `  --md-sys-typography-${token}-font-size: ${s.fontSize}px;\n`;
      css += `  --md-sys-typography-${token}-line-height: ${s.lineHeight};\n`;
      css += `  --md-sys-typography-${token}-font-weight: ${s.fontWeight};\n`;
      css += `  --md-sys-typography-${token}-letter-spacing: ${s.letterSpacing}em;\n\n`;
    }
    css += "}";
    return css;
  }

  if (format === "tailwind") {
    const lines: string[] = [
      "// Generated Tailwind config extension",
      "module.exports = {",
      "  theme: {",
      "    extend: {",
      `      fontFamily: {`,
      `        sans: [${JSON.stringify(config.typography.fontFamily || "Inter")}, "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],`,
      "      },",
      "      fontSize: {",
    ];
    for (const s of typeScale) {
      const key = s.name.replace(/\s+/g, "-").toLowerCase();
      lines.push(
        `        "${key}": ["${s.fontSize}px", { lineHeight: "${s.lineHeight}", fontWeight: "${s.fontWeight}", letterSpacing: "${s.letterSpacing}em" }],`
      );
    }
    lines.push("      },");
    lines.push("    },");
    lines.push("  },");
    lines.push("};");
    return lines.join("\n");
  }

  return "";
}

function generateSpacingTokens(config: ThemeConfig, format: TokenFormat): string {
  const spacingScale = generateSpacingScale(config.spacing.baseUnit);

  if (format === "json") {
    return JSON.stringify(
      {
        spacing: {
          baseUnit: config.spacing.baseUnit,
          scale: Object.fromEntries(spacingScale.map((s) => [s.label, s.px])),
        },
      },
      null,
      2
    );
  }

  if (format === "css") {
    let css = ":root {\n";
    for (const s of spacingScale) {
      css += `  --md-sys-spacing-${s.label.replace(".", "-")}: ${s.px}px;\n`;
    }
    css += "}";
    return css;
  }

  if (format === "tailwind") {
    const lines: string[] = [
      "// Generated Tailwind config extension",
      "module.exports = {",
      "  theme: {",
      "    extend: {",
      "      spacing: {",
    ];
    for (const s of spacingScale) {
      const key = s.label === "0.5" ? "0-5" : s.label;
      lines.push(`        "${key}": "${s.px}px",`);
    }
    lines.push("      },");
    lines.push("    },");
    lines.push("  },");
    lines.push("};");
    return lines.join("\n");
  }

  return "";
}

function generateRadiusTokens(format: TokenFormat): string {
  if (format === "json") {
    return JSON.stringify(
      {
        radius: Object.fromEntries(SHAPE_SCALE.map((s) => [s.name, s.value])),
      },
      null,
      2
    );
  }

  if (format === "css") {
    let css = ":root {\n";
    for (const s of SHAPE_SCALE) {
      css += `  --md-sys-shape-${s.name}: ${s.value === 9999 ? "9999px" : `${s.value}px`};\n`;
    }
    css += "}";
    return css;
  }

  if (format === "tailwind") {
    const lines: string[] = [
      "// Generated Tailwind config extension",
      "module.exports = {",
      "  theme: {",
      "    extend: {",
      "      borderRadius: {",
    ];
    for (const s of SHAPE_SCALE) {
      const key = s.name === "extraSmall" ? "xs" : s.name === "extraLarge" ? "xl" : s.name;
      lines.push(
        `        "${key}": "${s.value === 9999 ? "9999px" : `${s.value}px`}",`
      );
    }
    lines.push("      },");
    lines.push("    },");
    lines.push("  },");
    lines.push("};");
    return lines.join("\n");
  }

  return "";
}

function generateShadowTokens(format: TokenFormat): string {
  if (format === "json") {
    return JSON.stringify(
      {
        shadows: Object.fromEntries(
          SHADOW_LEVELS.filter((s) => s.level <= 5).map((s) => [s.level, s.shadow])
        ),
      },
      null,
      2
    );
  }

  if (format === "css") {
    let css = ":root {\n";
    for (const s of SHADOW_LEVELS.filter((s) => s.level <= 5)) {
      css += `  --md-sys-elevation-level-${s.level}: ${s.shadow};\n`;
    }
    css += "}";
    return css;
  }

  if (format === "tailwind") {
    const lines: string[] = [
      "// Generated Tailwind config extension",
      "module.exports = {",
      "  theme: {",
      "    extend: {",
      "      boxShadow: {",
    ];
    for (const s of SHADOW_LEVELS.filter((s) => s.level <= 5)) {
      lines.push(`        "elevation-${s.level}": "${s.shadow}",`);
    }
    lines.push("      },");
    lines.push("    },");
    lines.push("  },");
    lines.push("};");
    return lines.join("\n");
  }

  return "";
}
