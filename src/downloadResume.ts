import { RESUME_DATA_URI, RESUME_FILENAME } from "./resumePdf";

let cachedUrl: string | null = null;

function getBlobUrl(): string {
  if (cachedUrl) return cachedUrl;
  const base64 = RESUME_DATA_URI.split(",")[1];
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  cachedUrl = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
  return cachedUrl;
}

function inSandboxedFrame(): boolean {
  try {
    if (window.self === window.top) return false;
    // cross-origin/sandboxed parent throws on access
    void window.top!.location.href;
    return false;
  } catch {
    return true;
  }
}

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/**
 * Robust resume download.
 * - Normal browsers: Blob + <a download> → saves "Arun_Wakekar_Resume.pdf".
 * - Sandboxed iframes (previews) & iOS Safari: downloads are blocked/ignored,
 *   so open the PDF in a new tab where the user can view/save it.
 */
export function downloadResume(e?: { preventDefault: () => void }) {
  e?.preventDefault();
  try {
    const url = getBlobUrl();

    if (inSandboxedFrame() || isIOS()) {
      // download attribute is ignored here — show the PDF instead
      const w = window.open(url, "_blank");
      if (!w) window.location.href = url; // popup blocked → same-tab view
      return;
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = RESUME_FILENAME;
    a.rel = "noopener";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch {
    // last-resort fallback
    window.open(RESUME_DATA_URI, "_blank");
  }
}
