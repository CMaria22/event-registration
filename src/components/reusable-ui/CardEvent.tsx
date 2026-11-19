import Link from "next/link";
import { Event } from "@/schemas/event";
import { RegisterButton } from "./RegisterButton";

interface EventCardProps {
  event: Event;
  colorIndex?: number; // opțional, pentru alternarea culorilor banner-ului
}

const BANNER_THEMES = [
  "bg-gradient-to-br from-[#4738C8] via-[#7A5AF8] to-[#A678F9]", // purple
  "bg-gradient-to-br from-[#23649E] via-[#4CA0C2] to-[#87D6DF]", // blue
  "bg-gradient-to-br from-[#8F4158] via-[#C77378] to-[#F7B69B]", // coral
  "bg-gradient-to-br from-[#1C646B] via-[#49A59B] to-[#8EDEC2]", // teal
];

function formatEventDate(dateStr: string) {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    return { month: "TBA", day: "--" };
  }
  const month = new Intl.DateTimeFormat("en-US", { month: "short" })
    .format(parsed)
    .toUpperCase();
  const day = String(parsed.getDate()).padStart(2, "0");
  return { month, day };
}

function getAvailabilityBadge(event: Event) {
  if (event.availability === "unlimited") {
    return {
      label: "Unlimited",
      className: "bg-[#EDE9FE] text-[#6338F5]",
    };
  }

  if (event.availability === "unspecified") {
    return {
      label: "Availability pending",
      className: "bg-[#EDE9FE] text-[#6338F5]",
    };
  }

  // availability === "limited"
  const seats = event.availableSeats ?? 0;
  if (seats <= 0) {
    return {
      label: "Sold out",
      className: "bg-[#FEE2E2] text-[#D94343]",
    };
  }

  return {
    label: `${seats} ${seats === 1 ? "seat" : "seats"} left`,
    className: "bg-[#DCF5E7] text-[#1D7A4C]",
  };
}

function formatFee(fee: number) {
  if (fee === 0) return "Free";
  return `$${fee}`; // poți schimba în `${fee} RON` sau `€${fee}` după preferință
}

export function EventCard({ event, colorIndex = 0 }: EventCardProps) {
  const { month, day } = formatEventDate(event.date);
  const badge = getAvailabilityBadge(event);
  const themeClass = BANNER_THEMES[colorIndex % BANNER_THEMES.length];

  return (
    <article className="group flex flex-col bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs hover:shadow-md hover:border-slate-300/90 transition-all">

      <div
        className={`relative h-40 w-full rounded-xl p-4 flex flex-col justify-end overflow-hidden ${themeClass}`}
      >
     
        <div
          className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-white/10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-8 -bottom-10 h-32 w-32 rounded-full bg-white/10 pointer-events-none"
          aria-hidden="true"
        />

  
        <div className="absolute top-3 right-3 bg-white rounded-xl px-2.5 py-1.5 text-center shadow-xs min-w-[44px]">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6338F5] leading-none">
            {month}
          </span>
          <span className="block text-sm font-extrabold text-slate-800 leading-tight mt-0.5">
            {day}
          </span>
        </div>

  
        <p className="relative z-10 max-w-[75%] text-white font-black uppercase text-base leading-[1.12] tracking-tight line-clamp-3 drop-shadow-xs">
          {event.name}
        </p>
      </div>


      <div className="flex flex-col flex-1 pt-4 px-1">
        <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-[#6338F5] transition-colors line-clamp-1">
          {event.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
          <span className="whitespace-nowrap">
            {event.startTime} – {event.endTime}
          </span>
          <span>·</span>
          <span className="truncate">{event.location}</span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3.5">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {event.type}
          </span>
        </div>


        <div className="flex items-center justify-between pt-4 mt-auto">
          <span className="text-sm font-bold text-slate-900">
            {formatFee(event.fee)}
          </span>

          <RegisterButton event={event}/>

          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EFEAFE] hover:bg-[#E3DAFD] text-[#6338F5] text-xs font-semibold transition-colors"
          >
            <span>View details</span>
            
          </Link>
        </div>
      </div>
    </article>
  );
}
