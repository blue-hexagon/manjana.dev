export function rfcUrl(rfcId) {
  const num = rfcId.replace(/^RFC/i, "");
  return `https://www.rfc-editor.org/rfc/rfc${num}.txt`;
}