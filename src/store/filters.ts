import type { FilterOption } from "@/types/filters";
import { createEvent, createStore } from "effector";

const filterStore = createStore<FilterOption[]>([]);
const initFilters = createEvent<FilterOption[]>();
const updateFilter = createEvent<FilterOption>();

filterStore.on(initFilters, (_, payload) => {
  return [...payload];
});

filterStore.on(updateFilter, (state, payload) => {
  const itemIndex = state.findIndex((item) => item.type === payload.type);

  state[itemIndex] = payload;
  return [...state];
});

export const filtersApi = {
  filterStore,
  initFilters,
  updateFilter,
};
