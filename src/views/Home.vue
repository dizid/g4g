<template>
  <nav class="flex items-center justify-between flex-wrap bg-gray-700 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <img
        src="../assets/heart4.svg"
        alt="triangle with all three sides equal"
        height="33"
        width="33"
      />
      <router-link
        to="/"
        class="block lg:inline-block lg:mt-0 text-orange-500 hover:text-white mr-4"
      >
        <span class="ml-4 font-semibold text-2xl tracking-tight"
          >Google 4 Games</span
        ></router-link
      >
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          to="/clashroyale"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Clash Royale</router-link
        >
        <router-link
          to="/fortnite"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Fortnite</router-link
        >
        <router-link
          to="/minecraft"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Minecraft</router-link
        >
        <router-link
          to="/destiny2"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Destiny 2</router-link
        >
      </div>
    </div>
  </nav>
  <div class="flex flex-wrap overflow-hidden sm:-mx-1  items-center mt-10">
    <div class="w-full overflow-hidden sm:my-1 sm:px-1 xl:w-1/5 p-6">
      <!-- ADS LEFT -->
    </div>

    <div
      id="middle-column"
      class="w-full overflow-hidden sm:my-1 sm:px-1 xl:w-3/5 border rounded border-orange-500 p-8"
    >
      <!-- selectbox callt method changeRoute: router go to page /:slug (reloads page, through :key in App.vue)-->
      <div>
        <select
          @change="changeRoute()"
          v-model="selected"
          class="m-4 bg-blue-800 py-2 px-4 text-gray-400 text-sm rounded-lg border-l-8"
        >
          <option disabled value="">Select game:</option>
          <option value="clashroyale">Clash Royale</option>
          <option value="fortnite">Fortnite</option>
          <option value="minecraft">Minecraft</option>
          <option value="destiny2">Destiny 2</option>
        </select>
      </div>
      <div class="text-blue-500 m-8">Search for {{ PSEname }}:</div>
      <div class="text-gray-700 m-8">
        <div id="searchbox" class="gcse-searchbox"></div>
      </div>
      <div class="m-8 bg-yellow-500">
        <div class="gcse-searchresults"></div>
      </div>
    </div>

    <div class="w-full overflow-hidden sm:my-1 sm:px-1 xl:w-1/5 p-6">
      <!-- ADS RIGHT -->
    </div>
  </div>
</template>

<script>
export default {
  props: { slug: "" },
  data() {
    return {
      selected: "",
      PSEname: "All Games"
    };
  },
  methods: {
    changeRoute() {
      this.$router.push({ path: "/" + this.selected });
    },
    choosePSE() {
      const startTime = performance.now(); // TODO remove TEST performance test

      /* Decide which Google Programmable Search engine to load, based on slug */
      /*   if (this.$route.params.slug) {
        var scripturl = this.$route.params.slug;
      } else {
        var scripturl = "a9a230432b58ecd21"; // This is the default engine
      } */
      var scripturl = "";
      /* var PSEname = ""; */
      switch (this.$route.params.slug) {
        case "clashroyale":
          scripturl = "078e1680c0ebaf715";
          this.PSEname = "Clash Royale";
          break;
        case "fortnite":
          scripturl = "22f2b892095830119";
          this.PSEname = "Fortnite";
          break;
        case "minecraft":
          scripturl = "9602c93f57213795b";
          this.PSEname = "Minecraft";
          break;
        case "destiny2":
          scripturl = "8ecad2f2d493f4ab5";
          this.PSEname = "Destiny 2";
          break;
        default:
          scripturl = "a9a230432b58ecd21";
          this.PSEname = "All games";
      }

      let PSEScript = document.createElement("script");
      PSEScript.setAttribute(
        "src",
        ["https://cse.google.com/cse.js?cx=", scripturl].join("")
      );
      document.head.appendChild(PSEScript);

      const duration = performance.now() - startTime; // TODO remove TEST performance test
      console.log(`someMethodIThinkMightBeSlow took ${duration}ms`); // TODO remove TEST performance test
    }
  },
  mounted: function() {
    this.choosePSE();
  }
};
</script>

<style></style>
