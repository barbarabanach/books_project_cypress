<template>
<h2>Your products</h2>
<div class="container">
    <div v-if="booksItem.length > 0">
        <ul>
            <cart-item
            v-for="item in booksItem" :key="item.id"
            :id="item.id"
            :image="item.image"
            :title="item.title"
            :author="item.author"
            :price="item.price"
            :quantity="item.quantity"
            ></cart-item>
        </ul>
        <div class="summary">
            <p>Total: ${{ roundTotal }}</p>
            <div>
                <base-button link to="/cart/order">NEXT STEP</base-button>
                <base-button @click="removeItems">REMOVE ITEMS</base-button>
            </div>
        </div>
    </div>
    <p v-else>You have no products in the cart yet!</p>
</div>
</template>

<script>
import CartItem from '../components/cart/CartItem.vue';
export default {
    components: {
        CartItem
    },
    computed: {
        booksItem() {
            return this.$store.getters['cart/products'];
        },
        total() {
            return this.$store.getters['cart/total'];
        },
        roundTotal() {
            return this.total.toFixed(2);
        },
    },
    methods: {
        removeItems() {
            this.$store.dispatch('cart/removeFromCart');
        }
    }
}
</script>

<style scoped>
.container {
  max-width: 50rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border: 2px solid #ccc;
  border-radius: 12px;
}
ul {
    list-style: none;
    margin: 2rem auto;
    margin-top: 3rem;
    padding: 0;
    max-width: 40rem;
}
h2, h3 {
    text-align: center;
}
p {
    font-size: 20px;
    font-weight: 700;
}
.summary {
    display: flex;
    padding: 10px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>