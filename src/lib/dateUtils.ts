const KHMER_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

export function toKhmerNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => KHMER_DIGITS[parseInt(digit, 10)]);
}

export const KHMER_DAYS = [
  "ថ្ងៃអាទិត្យ",
  "ថ្ងៃចន្ទ",
  "ថ្ងៃអង្គារ",
  "ថ្ងៃពុធ",
  "ថ្ងៃព្រហស្បតិ៍",
  "ថ្ងៃសុក្រ",
  "ថ្ងៃសៅរ៍",
];

export const KHMER_MONTHS = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];

const KHMER_ZODIAC_ANIMALS = [
  "ជូត (កណ្ដុរ)",
  "ឆ្លូវ (គោ)",
  "ខាល (ខ្លា)",
  "ថោះ (ទន្សាយ)",
  "រោង (នាគ)",
  "ម្សាញ់ (ពស់)",
  "មមី (សេះ)",
  "មមែ (ពពែ)",
  "វក (ស្វា)",
  "រកា (មាន់)",
  "ច (ឆ្កែ)",
  "កុរ (ជ្រូក)",
];

/**
 * Formats a Date object or ISO string into a rich Khmer Solar Date with Buddhist Era.
 */
export function formatKhmerDate(inputDate: Date | string): string {
  const d = typeof inputDate === "string" ? new Date(inputDate) : inputDate;
  if (isNaN(d.getTime())) return "";

  const dayOfWeek = KHMER_DAYS[d.getDay()];
  const dayNumber = toKhmerNumber(d.getDate().toString().padStart(2, "0"));
  const monthName = KHMER_MONTHS[d.getMonth()];
  const yearNumber = toKhmerNumber(d.getFullYear());
  const buddhistYear = toKhmerNumber(d.getFullYear() + 544);

  const zodiacIndex = (d.getFullYear() - 4) % 12;
  const zodiac = KHMER_ZODIAC_ANIMALS[zodiacIndex >= 0 ? zodiacIndex : zodiacIndex + 12];

  return `${dayOfWeek} ទី${dayNumber} ខែ${monthName} ឆ្នាំ${yearNumber} (ព.ស. ${buddhistYear} ឆ្នាំ${zodiac.split(" ")[0]})`;
}

/**
 * Returns human-readable relative time (Khmer, English, or Chinese)
 */
export function formatRelativeTime(inputDate: Date | string, lang: string = "km"): string {
  const d = typeof inputDate === "string" ? new Date(inputDate) : inputDate;
  if (isNaN(d.getTime())) return "";

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    if (lang === "zh") return "刚刚";
    if (lang === "en") return "Just now";
    return "ទើបតែចេញផ្សាយ";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    if (lang === "zh") return `${diffInMinutes} 分钟前`;
    if (lang === "en") return `${diffInMinutes}m ago`;
    return `${toKhmerNumber(diffInMinutes)} នាទីមុន`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    if (lang === "zh") return `${diffInHours} 小时前`;
    if (lang === "en") return `${diffInHours}h ago`;
    return `${toKhmerNumber(diffInHours)} ម៉ោងមុន`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    if (lang === "zh") return `${diffInDays} 天前`;
    if (lang === "en") return `${diffInDays}d ago`;
    return `${toKhmerNumber(diffInDays)} ថ្ងៃមុន`;
  }

  if (lang === "zh") {
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  }

  return lang === "km"
    ? `${toKhmerNumber(d.getDate())} ${KHMER_MONTHS[d.getMonth()]} ${toKhmerNumber(d.getFullYear())}`
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
