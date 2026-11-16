"use client";

import { useState, FormEvent } from "react";
import { SearchInput } from "../reusable-ui/SearchInput";
import { FilterSelect } from "../reusable-ui/FilterSelect";
import { SearchButton } from "../reusable-ui/SearchButton";

export interface EventFilterValues {
  query: string;
  category: string;
  date: string;
}

interface EventFiltersProps {
  initialValues?: Partial<EventFilterValues>;
  onSearch?: (filters: EventFilterValues) => void;
}

const CATEGORY_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Design & UI", value: "design" },
  { label: "Development", value: "development" },
  { label: "Product", value: "product" },
  { label: "Marketing", value: "marketing" },
];

const DATE_OPTIONS = [
  { label: "Anytime", value: "anytime" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
];

export function EventFilters({ initialValues, onSearch }: EventFiltersProps) {
  const [query, setQuery] = useState(initialValues?.query ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "all");
  const [date, setDate] = useState(initialValues?.date ?? "anytime");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.({ query, category, date });
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      >
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search workshops, topics or hosts..."
        />

        <FilterSelect
          prefix="Category"
          value={category}
          options={CATEGORY_OPTIONS}
          onChange={setCategory}
        />

        <FilterSelect
          prefix="Date"
          value={date}
          options={DATE_OPTIONS}
          onChange={setDate}
        />

        <SearchButton label="Search" />
      </form>
    </div>
  );
}
