<template>
  <h1>The game is {{ $route.params.slug }}</h1>
  <h2>Search box</h2>
  <div class="gcse-searchbox-only"></div>
  <h2>Search results</h2>
  <div class="gcse-searchresults"></div>
</template>

<script>
export default {
  props: ["slug"],
  mounted() {
    let PSEScript = document.createElement("script");
    PSEScript.setAttribute(
      "src",
      "https://cse.google.com/cse.js?cx=078e1680c0ebaf715"
    );
    document.head.appendChild(PSEScript);
  },
  head: {
    title: {
      inner: "It will be a pleasure",
    },
    script: [
      {
        type: "text/javascript",
        src: "https://cse.google.com/cse.js?cx=078e1680c0ebaf715",
        async: true,
      },
    ],
  },
};
</script>

<style></style>
