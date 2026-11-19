"use client";

import { SearchInput } from "../reusable-ui/SearchInput";
import { FilterSelect } from "../reusable-ui/FilterSelect";
import { SearchButton } from "../reusable-ui/SearchButton";
import {  useState } from "react";
import { EventFilterValues , Event} from "@/schemas/event";
import { ApiError, getEventsFiltered } from "@/lib/events-api";

interface EventFiltersProps {
  onResults: (events: Event[])=>void;
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
type StatType = {
  status: "idle" | "loading" | "error";
  message?: string;
};

export function EventFilters({ onResults }: EventFiltersProps) {
  const [status, setStatus] = useState<StatType>({status: "idle"});
  const [filters, setFilters] = useState<EventFilterValues>({
    query: "",
    category: "all",
    date: "anytime",
  });
  const update = (key: keyof EventFilterValues) => (value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ status: "loading" });

    try {
      const results = await getEventsFiltered(filters);
      onResults(results);
      setStatus({ status: "idle" });
    } catch (err) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Unknown error";
      setStatus({ status: "error", message });
    }
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

        <SearchButton
          label={status.status === "loading" ? "Searching..." : "Search"}
        />
      </form>
    </div>
  );
}
