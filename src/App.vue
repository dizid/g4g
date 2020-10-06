<template>
  <!-- Key:refreshes Home component when another Programmable Search Engine is selected, so right PSE is picked in 'mounted' -->
  <!-- :key="$route.fullPath" -->
  <router-view :key="$route.fullPath" />
</template>
<script>
export default {
  name: "App"
};
</script>