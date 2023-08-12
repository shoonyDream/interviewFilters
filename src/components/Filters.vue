<template lang="pug">
.filters
  VSelect(
    v-for="(filter, index) in filters",
    :clearable="true",
    :model-value="filter.value",
    :items="filter.values",
    :label="filter.label",
    @update:modelValue="onFilterUpdate($event, filter)"
  )
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent, onMounted, watch, ref, toRefs } from "vue";
import { useStore } from "effector-vue/composition";
import type { FilterOption } from "@/types/filters";
import { filtersApi } from "@/store/filters";
import { REGULAR } from "@/Constants";
import { hideLoader, showLoader } from "@/store/uiState";

export default defineComponent({
  name: "Filters",
  components: {},
  props: {
    items: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { filterStore, updateFilter, initFilters } = filtersApi;
    const filters = useStore(filterStore);

    const { items } = toRefs(props);

    onMounted(() => {
      prepareInitFilters(items.value);
    });

    const prepareInitFilters = (filters: string[]) => {
      const scoreFilters = filters.filter((item) => item.match(REGULAR));
      const countryFilters = filters.filter((item) => !scoreFilters.includes(item));

      initFilters([
        {
          type: "country",
          label: "Filter by country",
          value: "",
          values: countryFilters,
        },
        {
          type: "score",
          label: "Filter by score",
          value: "",
          values: scoreFilters,
        },
      ]);
    };

    const onFilterUpdate = (value: string, filter: FilterOption) => {
      showLoader();
      const newFilter = {
        ...filter,
        value,
      };
      updateFilter(newFilter);
      setTimeout(() => {
        hideLoader();
      }, 1000);
    };

    return {
      onFilterUpdate,
      filters,
    };
  },
});
</script>

<style scoped></style>
