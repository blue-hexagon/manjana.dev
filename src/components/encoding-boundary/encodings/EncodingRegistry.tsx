import {DecodeEncoding} from "./DecodeEncoding";

interface EncodingMeta {
  id: DecodeEncoding
  label: string
  description: string
  group: string
  risk?: "low" | "medium" | "high"
  common?: boolean
}

export const ENCODINGS: EncodingMeta[] = [
  // 🟢 Unicode
  {
    id: "utf-8",
    label: "UTF-8",
    description: "Unicode (recommended, web standard)",
    group: "Unicode",
    risk: "low",
    common: true,
  },
  {
    id: "utf-16le",
    label: "UTF-16 LE",
    description: "Unicode (little-endian)",
    group: "Unicode",
    risk: "medium",
    common: true,
  },
  {
    id: "utf-16be",
    label: "UTF-16 BE",
    description: "Unicode (big-endian)",
    group: "Unicode",
    risk: "medium",
  },

  // 🟡 Western legacy
  {
    id: "windows-1252",
    label: "Windows-1252",
    description: "Western legacy (common mojibake source)",
    group: "Western legacy",
    risk: "medium",
    common: true,
  },
  {
    id: "iso-8859-1",
    label: "ISO-8859-1",
    description: "Western legacy (often mis-declared)",
    group: "Western legacy",
    risk: "medium",
    common: true,
  },
  {
    id: "iso-8859-15",
    label: "ISO-8859-15",
    description: "Latin-1 with Euro sign",
    group: "Western legacy",
    risk: "medium",
  },

  // 🟠 Cyrillic / Eastern Europe
  {
    id: "windows-1251",
    label: "Windows-1251",
    description: "Cyrillic legacy",
    group: "Cyrillic / Eastern Europe",
    risk: "high",
  },
  {
    id: "iso-8859-2",
    label: "ISO-8859-2",
    description: "Central/Eastern Europe",
    group: "Cyrillic / Eastern Europe",
    risk: "high",
  },
  {
    id: "koi8-r",
    label: "KOI8-R",
    description: "Historic Cyrillic encoding",
    group: "Cyrillic / Eastern Europe",
    risk: "high",
  },

  // 🔵 East Asian
  {
    id: "shift_jis",
    label: "Shift_JIS",
    description: "Japanese legacy (variable-length)",
    group: "East Asian",
    risk: "high",
  },
  {
    id: "euc-jp",
    label: "EUC-JP",
    description: "Japanese Unix legacy",
    group: "East Asian",
    risk: "high",
  },
  {
    id: "euc-kr",
    label: "EUC-KR",
    description: "Korean legacy",
    group: "East Asian",
    risk: "high",
  },
  {
    id: "big5",
    label: "Big5",
    description: "Traditional Chinese",
    group: "East Asian",
    risk: "high",
  },
  {
    id: "gb2312",
    label: "GB2312",
    description: "Simplified Chinese (legacy)",
    group: "East Asian",
    risk: "high",
  },
  {
    id: "gbk",
    label: "GBK",
    description: "GB2312 superset",
    group: "East Asian",
    risk: "high",
  },
  {
    id: "gb18030",
    label: "GB18030",
    description: "Full Unicode (China standard)",
    group: "East Asian",
    risk: "medium",
  },
]
