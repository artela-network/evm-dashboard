<script setup lang="ts">
import { themeChange } from 'theme-change';
import { onMounted } from 'vue';
import TxDialog from './components/TxDialog.vue';

onMounted(() => {
  themeChange(false);
  document.documentElement.setAttribute('data-theme', 'light');
});
</script>

<template>
  <div>
    <RouterView />
    <TxDialog />
  </div>
</template>
