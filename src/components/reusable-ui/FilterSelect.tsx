"use client";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  prefix: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export function FilterSelect({
  prefix,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="relative w-full sm:w-auto min-w-[175px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={prefix}
        className="w-full h-12 pl-4 pr-9 bg-white border border-slate-200/80 rounded-xl text-sm text-slate-500 font-medium shadow-xs appearance-none cursor-pointer transition-colors hover:border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {prefix}: {option.label}
          </option>
        ))}
      </select>

      {/* Triunghiul mic din dreapta, exact ca în design */}
      <span
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"
        aria-hidden="true"
      >
        ▼
      </span>
    </div>
  );
}