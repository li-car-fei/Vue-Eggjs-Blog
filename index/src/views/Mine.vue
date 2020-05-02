<template>
  <div>
    <div v-if="islogin">
      <mineinfo></mineinfo>
    </div>
    <div v-else>
      <login :islogin="islogin"></login>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login";
import Mineinfo from "@/components/Mineinfo";
export default {
  components: { Login, Mineinfo },

  //  data() {
  //    return {
  //    islogin: undefined
  //    };
  //  },
  computed: {
    islogin: {
      get() {
        return !!(sessionStorage.getItem("token") || "");
      },
      set(val) {
        console.log(val);
      }
    }
  },

  created() {
    this.islogin = !!(sessionStorage.getItem("token") || "");
    //this.username = sessionStorage.getItem("username") || "";
  }
};
</script>

<style>
</style>