<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.6rem 1.5rem;
  font: inherit;
  background-color: #016d67;
  border: 1px solid #003a37;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #05386B;
  border-color: #EDF5E1 
}

.flat {
  background-color: transparent;
  color: #ffffff;
  border-color: none
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: transparent;
  border-color: #003a37;
}
</style>