<template>
  <div class="flex flex-col h-screen">
    <nav class="flex items-center justify-start bg-gray-700 p-6">
      <img
        src="../assets/heart4.svg"
        alt="triangle with all three sides equal"
        height="33"
        width="33"
      />
      <router-link
        to="/"
        class="block lg:inline-block lg:mt-0 text-orange-500 hover:text-orange-900 mr-4"
      >
        <span class="ml-4 font-semibold text-2xl tracking-tight"
          >Google 4 Games</span
        ></router-link
      >
    </nav>
    <div class="flex flex-grow flex-wrap overflow-hidden sm:-mx-1 mt-3p">
      <div class="w-full overflow-hidden sm:my-1 sm:px-1 xl:w-1/5 p-6">
        <!-- ADS LEFT  -->
      </div>

      <div
        id="middle-column"
        class="w-full overflow-hidden sm:my-1 sm:px-1 xl:w-3/5 border rounded border-orange-500 p-1"
      >
        <!-- selectbox callt method changeRoute: router go to page /:slug (reloads page, through :key in App.vue)-->
        <div>
          <select
            @change="changeRoute()"
            v-model="selected"
            class="mx-4 bg-blue-800 py-2 px-4 font-bold text-blue-300 text-sm rounded-lg"
          >
            <option disabled value="">Select your game:</option>
            <option value="clashroyale">Clash Royale</option>
            <option value="fortnite">Fortnite</option>
            <option value="minecraft">Minecraft</option>
            <option value="destiny2">Destiny 2</option>
          </select>
        </div>
        <div class="text-blue-500 my-3 mx-6">Search in {{ PSEname }}:</div>
        <Searchbox :key="componentKey" />
        <div class="w-full overflow-hidden sm:my-1 sm:px-1 xl:w-1/5 p-6">
          <!-- ADS RIGHT -->
        </div>
      </div>
    </div>
    <footer
      class="mb-2 h-10 bg-gray-700 text-bold text-right text-xl tracking-wider"
    >
      <p>
        Made by
        <a class="text-orange-500 underline" href="https://dizid.com">dizid</a>
        2020
      </p>
    </footer>
  </div>
</template>

<script>
import Searchbox from "../components/Searchbox";
export default {
  components: {
    Searchbox,
  },
  props: { slug: "" },
  data() {
    return {
      selected: "",
      componentKey: 0,
      PSEname: "",
    };
  },
  methods: {
    changeRoute() {
      this.$router.push({ path: "/" + this.selected });
      this.componentKey += 1; /* I want to reload Searchbox component  */
    },
    choosePSE() {
      /* Decide which Google Programmable Search engine to load, based on slug */
      var scripturl = "";
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
      this.componentKey += 1; // I want to reload Searchbox component  */
    },
  },
  mounted: function() {
    this.choosePSE();
  },
};
</script>

<style></style>
