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
        return !!(sessionStorage.getItem("user_id") || "");
      },
      set(val) {
        console.log(val);
      }
    }
  },

  created() {
    this.islogin = !!(sessionStorage.getItem("user_id") || "");
    this.username = sessionStorage.getItem("username") || "";
  }
};
</script>

<style>
</style>