<template>
    <load-item v-if="isLoading"></load-item>
    <ul v-else-if="hasBooks">
        <product-item
        v-for="product in products" :key="product.id"
        :id="product.id"
        :image="product.image"
        :title="product.title"
        :author="product.author"
        :price="product.price"
        ></product-item>
    </ul>
</template>

<script>
import ProductItem from '../components/products/ProductItem.vue';

export default {
    components: {
        ProductItem
    },
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        products() {
            return this.$store.getters['home/books'];
        },
        hasBooks() {
            return !this.isLoading && this.$store.getters['home/hasBooks'];
        }
    },
    methods: {
        async loadBooks() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('home/loadBooks');
            } catch(error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },
         async loadCurrency() {
            try {
                await this.$store.dispatch('order/loadCurrency');
            } catch(error) {
                this.error = error.message || 'Something went wrong!';
            }
        },
        genCaptcha() {
            this.$store.dispatch('cart/captchaGenerator');
        }
    },
    created() {
        this.loadBooks();
        this.loadCurrency();
        this.genCaptcha();
    },
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 2rem auto;
    margin-top: 3rem;
    padding: 0;
    max-width: 40rem;
  }
</style>