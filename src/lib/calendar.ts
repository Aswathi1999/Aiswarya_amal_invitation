import { wedding } from "@/config/wedding";
const stamp = (date: string) => new Date(date).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const escape = (text: string) => text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
export function calendarUrl() {
  return `https://calendar.google.com/calendar/render?${new URLSearchParams({ action: "TEMPLATE", text: `${wedding.names} — Wedding`, dates: `${stamp(wedding.start)}/${stamp(wedding.end)}`, ctz: wedding.timezone, location: wedding.ceremony.venue, details: wedding.invitation })}`;
}
export function calendarFile() {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Aiswarya and Amal Raj//Wedding//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", "UID:aiswarya-amal-20270109@wedding", "DTSTAMP:20261116T000000Z", `DTSTART:${stamp(wedding.start)}`, `DTEND:${stamp(wedding.end)}`, `SUMMARY:${escape(`${wedding.names} — Wedding`)}`, `LOCATION:${escape(wedding.ceremony.venue)}`, `DESCRIPTION:${escape(wedding.invitation)}`, "END:VEVENT", "END:VCALENDAR"];
  return lines.map(line => { let result = "", bytes = 0; for (const char of line) { const length = new TextEncoder().encode(char).length; if (bytes + length > 73) { result += "\r\n "; bytes = 1; } result += char; bytes += length; } return result; }).join("\r\n") + "\r\n";
}
