interface SearchButtonProps {
  label?: string;
  isLoading?: boolean;
}

export function SearchButton({
  label = "Search",
  isLoading = false,
}: SearchButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="h-12 px-7  bg-primary hover:bg-deep-violet active:scale-[0.99] disabled:opacity-60 text-white text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
    >
      {isLoading ? "Searching..." : label}
    </button>
  );
}
