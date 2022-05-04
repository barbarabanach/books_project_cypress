<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Books shop</router-link>
      </h1>
      <div class="cartEl">
        <base-button link mode="flat" to="/cart">Go to Cart</base-button>
        <span v-if="quantity!==0">{{ quantity }}</span> 
      </div>
    </nav>
  </header>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    quantity() {
      return this.$store.getters['cart/quantity'];
    },
  },
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #008d86;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #ffffff;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
  font-size: 35px;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header div {
  margin: 0 1rem;
  font-size: 25px;
  font-weight: 600;
}

.cartEl {
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: rgb(1, 68, 29) solid;
  border-radius: 100%;
  font-size: 20px;
  color: #ffffff;
}
</style>