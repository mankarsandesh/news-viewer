<template>
  <div class="w-full h-screen flex flex-col">
    <Header />
    <div class="app-body w-full h-full flex border">
      <main class="min-h-full w-full border mt-20">
        <div class="p-5">
          <nuxt />
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";

export default {
  name: "default",
  async fetch() {},
  components: {
    Header,
  },
  data() {
    return {};
  },
};
</script>
