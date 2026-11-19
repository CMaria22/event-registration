"use client";

interface FilterOption {
  label: string;
  value: string;
 
}
interface FilterSelectProps {
  prefix: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export function FilterSelect({
  prefix,
  options,
  onChange
}: FilterSelectProps) {
  return (
    <div className="relative w-full sm:w-auto min-w-[175px]">
      <select
        aria-label={prefix}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-4 pr-9 bg-white border border-slate-200/80 rounded-xl text-sm text-slate-500 font-medium shadow-xs appearance-none cursor-pointer transition-colors hover:border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {prefix}: {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}