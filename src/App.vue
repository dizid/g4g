<template>
  <!--   Key:refreshes the ContentContainer component when another PSE is selected, so the right PSE is picked in 'mounted' -->
  <router-view :key="$route.fullPath" />
</template>
<script>
export default {
  name: "App"
};
</script>

<style></style>
