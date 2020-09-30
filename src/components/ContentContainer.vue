<template>
  <h1>Search in {{ $route.params.slug }}</h1>
  <div class="gcse-searchbox"></div>

  <div class="gcse-searchresults"></div>
</template>

<script>
export default {
  props: ["slug"],
  data() {
    return {
      /* testing */
      message: "Hello Vue.js!",
      cxclashroyale: "078e1680c0ebaf715",
      cxfortnite: "22f2b892095830119"
    };
  },

  mounted() {
    /* Decide which Google Programmable Search engine to load, based on slug */

    let scripturl = "";
    if (this.$route.params.slug === "clashroyale") {
      scripturl = "078e1680c0ebaf715";
    } else {
      scripturl = "22f2b892095830119";
    }
    let PSEScript = document.createElement("script");
    PSEScript.setAttribute(
      "src",
      ["https://cse.google.com/cse.js?cx=", scripturl].join("")
    );
    document.head.appendChild(PSEScript);
  }
};
</script>

<style></style>
