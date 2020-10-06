<template>
  <!-- Key:refreshes Home component when another Programmable Search Engine is selected, so right PSE is picked in 'mounted' 
  This in combination with <Searchbox :key="componentKey" /> in Home.vue. It works, not sure why :) -->
  <router-view :key="$route.fullPath" />
</template>
<script>
export default {
  name: "App"
};
</script>