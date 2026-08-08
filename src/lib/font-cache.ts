const fontCache = new Map<string, { base64: string; family: string }>();

export function registerCustomFont(family: string, base64: string): void {
  const existing = fontCache.get(family);
  if (existing && existing.base64 === base64) return;

  const style = document.createElement('style');
  style.setAttribute('data-custom-font', family);
  style.textContent = `
    @font-face {
      font-family: '${family}';
      src: url(data:${base64});
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
  fontCache.set(family, { base64, family });
}

export function unregisterCustomFont(family: string): void {
  const el = document.querySelector(`style[data-custom-font="${family}"]`);
  el?.remove();
  fontCache.delete(family);
}

export function getCustomFont(family: string): { base64: string; family: string } | undefined {
  return fontCache.get(family);
}

export function hasCustomFont(family: string): boolean {
  return fontCache.has(family);
}
