<template>
    <h1>Fill in the next fields</h1>
    <base-card>
        <cart-form></cart-form>
    </base-card>
</template>

<script>
import CartForm from '../components/cart/CartForm.vue';

export default {
    components: {
        CartForm
    },
};
</script>

<style scoped>
h1 {
    margin-top: 40px;
    text-align: center;
}
</style>