<template lang="pug">
.user
  VListItem
    template(#prepend)
      .container(ref="avatarRef")
        VAvatar(@click="showContext")
          VImg(:src="user.avatar")
    VListItemTitle(v-html="user.title")
    VListItemSubtitle(v-html="user.subtitle")
  .teleport(v-if="isVisible", ref="teleportContentRef")
    .item.country
      .label Country:
      .value {{ user.country }}
    .item.street(v-if="user.address")
      .label Address:
      .value {{ user.address }}
</template>

<script lang="ts">
import { toRefs, type PropType } from "vue";
import { defineComponent, ref, onBeforeUnmount, onMounted, computed } from "vue";
import type { UserInfo } from "@/types/users";
import { teleportPopupApi } from "@/store/teleport";
import { useStore } from "effector-vue/composition";

export default defineComponent({
  name: "UserList",
  components: {},
  props: {
    user: {
      type: Object as PropType<UserInfo>,
      default: () => {},
    },
    teleportName: {
      type: String,
      default: "AvatarDetail",
    },
  },
  setup(props) {
    const { openTeleportPopup, teleportPopupStore, cleanedData } = teleportPopupApi;

    const teleportPopup = useStore(teleportPopupStore);

    const { teleportName } = toRefs(props);

    const avatarRef = ref<HTMLElement | null>(null);
    const teleportContentRef = ref<HTMLElement | null>(null);

    const isVisible = computed(() => teleportPopup.value && teleportPopup.value.name === teleportName.value);

    onMounted(() => {
      window.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("click", handleClickOutside);
    });

    const showContext = () => {
      isVisible.value
        ? cleanedData()
        : openTeleportPopup({
            name: teleportName.value,
          });
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (!teleportContentRef.value) return;
      const { target } = event;

      if (
        teleportContentRef.value !== target &&
        !teleportContentRef.value?.contains(target as HTMLElement) &&
        avatarRef.value !== target &&
        !avatarRef.value?.contains(target as HTMLElement)
      ) {
        cleanedData();
      }
    };

    return {
      avatarRef,
      teleportContentRef,
      isVisible,
      showContext,
    };
  },
});
</script>

<style scoped>
.user {
  position: relative;

  & .container {
    margin-right: 8px;
    cursor: pointer;
  }

  & .teleport {
    position: absolute;
    top: 20px;
    left: 40px;
    background-color: var(--bg-color);
    box-shadow: var(--box-shadow);
    padding: 16px;
    z-index: 1;

    & .item {
      display: flex;
      gap: 8px;
      & .label {
        color: gray;
      }

      &.country {
        text-transform: capitalize;
      }
    }
  }
}
</style>
