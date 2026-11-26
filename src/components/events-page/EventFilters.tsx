"use client";

import { SearchInput } from "../reusable-ui/SearchInput";
import { FilterSelect } from "../reusable-ui/FilterSelect";
import { SearchButton } from "../reusable-ui/SearchButton";
import {  useState } from "react";
import { EventFilterValues } from "@/schemas/event";


interface EventFiltersProps {
  onSearch: (filters: EventFilterValues) => void;
}

const CATEGORY_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Workshop", value: "workshop" },
  { label: "Conference", value: "conference" },
  { label: "Meetup", value: "meetup" },
];

const DATE_OPTIONS = [
  { label: "Anytime", value: "anytime" },
  { label: "Today", value: "today" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

export function EventFilters({ onSearch }: EventFiltersProps) {
  const [filters, setFilters] = useState<EventFilterValues>({
    query: "",
    category: "all",
    date: "anytime",
  });
  const update = (key: keyof EventFilterValues) => (value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(filters);
  };


  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      >
        <SearchInput
          value={filters.query}
          placeholder="Search workshops, topics or hosts..."
          onChange={update("query")}
        />

        <FilterSelect
          prefix="Category"
          options={CATEGORY_OPTIONS}
          onChange={update("category")}
        />

        <FilterSelect
          prefix="Date"
          options={DATE_OPTIONS}
          onChange={update("date")}
        />

        <SearchButton label={"Search"} />
      </form>
    </div>
  );
}
