"use client";


interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function SearchInput({
  value,
  placeholder = "Search workshops, topics or hosts...",
  onChange
}: SearchInputProps) {
  return (
    <div className="relative flex-1 min-w-[260px]">
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200/80 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 shadow-xs transition-colors focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  );
}