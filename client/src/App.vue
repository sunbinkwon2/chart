<template>
  <div>
    <HomeView/>
  </div>
  <div>
    <h2>🌍 Env</h2>
    <ul>
      <li v-for="(v, k) in env" :key="k">
        {{ k }} : {{ String(v) }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import HomeView from './views/HomeView.vue'
  const env = {
    ENV: import.meta.env.VITE_APP_ENV,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL
  };
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
