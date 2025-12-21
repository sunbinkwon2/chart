<template>
  <h1>Home</h1>
  <HelloWorld msg="Vite + Vue" />
</template>
<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'

console.log('ENV:', import.meta.env.VITE_APP_ENV);
</script>