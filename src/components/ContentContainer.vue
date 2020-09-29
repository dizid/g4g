<template>
  <h1>The game is {{ $route.params.slug }}</h1>
  <h2>Search box</h2>
  <div class="gcse-searchbox-only"></div>
  <h2>Search results</h2>
  <div class="gcse-searchresults-only"></div>
</template>

<script>
export default {
  props: ["slug"],
  head: {
    script: [
      {
        type: "text/javascript",
        src: "https://cse.google.com/cse.js?cx=078e1680c0ebaf715",
        async: true,
        body: true,
      },
    ],
  },
};
</script>

<style></style>
