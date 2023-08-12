<template lang="pug">
.content-block
  VContainer(v-if="!pendingGet")
    VRow.ma-4(align="center", justify="center")
      VCol(cols="12")
        VImg.my-3(src="../src/assets/logo.svg", contain, height="200")
      VCol(cols="12", md="4")
        Filters(:items="items")
      VCol(cols="12", md="4")
        .user-loading(v-if="state.isLoaderShown") Loading...
        UserList(v-show="!state.isLoaderShown", :users="filteredUsers")
  .loading(v-else) Loading...
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "effector-vue/composition";
import { usersApi } from "@/store/users";
import { filtersApi } from "@/store/filters";
import { items } from "@/store/mockData";
import Filters from "@/components/Filters.vue";
import UserList from "@/components/UserList.vue";
import type { FilterKey } from "@/types/filters";
import { uiStateStore } from "@/store/uiState";
import type { UserInfo } from "@/types/users";

export default defineComponent({
  name: "ContentBlock",
  components: {
    Filters,
    UserList,
  },
  setup() {
    const { getUsersFx, usersStore } = usersApi;
    const state = useStore(uiStateStore);

    const { filterStore } = filtersApi;
    const users = useStore(usersStore);
    const filters = useStore(filterStore);
    const pendingGet = useStore(getUsersFx.pending);

    const filtersValue = computed(() =>
      filters.value?.reduce((acc, item) => {
        if (item.value) return [...acc, { type: item.type, value: item.value }];
        return [...acc];
      }, [] as FilterKey[])
    );

    const filteredUsers = computed(() => {
      if (!filtersValue.value.length) return users.value;

      return users.value?.filter((user) => checkUserKey(user));
    });

    onMounted(async () => {
      await getUsersFx();
    });

    const checkUserKey = (user: UserInfo) => {
      let isChecked = true;

      filtersValue.value.forEach((filter) => {
        if (!isChecked) return;
        isChecked = user[filter.type] === filter.value ? true : false;
      });

      return isChecked;
    };

    return {
      items,
      users,
      filteredUsers,
      pendingGet,
      state,
    };
  },
});
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
