<template lang="pug">
svg(:width="width" :height="height")
  use(:href='`#${name}`' :height="height")
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      name: {
        type: String,
        required: true,
      },
      width: {
        type: [String, Number],
        default: '20px',
      },
      height: {
        type: [String, Number],
        default: '20px',
      },
    },
  });
</script>

<style scoped></style>
