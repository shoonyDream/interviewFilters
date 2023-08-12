<template lang="pug">
.user-list
  VCard.mx-auto(max-width="450")
    VList(three-line)
      template(v-for="(item, index) in preparedData")
        VCardTitle(v-if="item.header", :key="item.header", v-text="item.header")
        VDivider(v-else-if="item.divider", :key="index", :inset="item.inset")
        User(v-else, :key="item.title", :user="item", :teleport-name="`AvatarDetail-${index}`")
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent, computed, toRefs } from "vue";
import type { UserInfo, UserListType } from "@/types/users";
import User from "@/components/User.vue";

export default defineComponent({
  name: "UserList",
  components: {
    User,
  },
  props: {
    users: {
      type: Array as PropType<UserInfo[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { users } = toRefs(props);

    const preparedData = computed(() => {
      const prepareUsers =
        users.value?.reduce((acc, item) => {
          if (!Object.keys(item).includes("divider")) return [...acc, item, { divider: true, inset: true }];
          return [...acc];
        }, [] as UserListType[]) || [];

      return [{ header: "List" }, ...prepareUsers] as UserListType[];
    });

    return {
      preparedData,
    };
  },
});
</script>

<style scoped></style>
