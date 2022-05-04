export default {
    addToCart(context, payload) {
        const itemId = payload.id;
        const products = context.rootGetters['home/books'];
        const item = products.find(i => i.id === itemId);

        context.commit('addToCart', item);
    },
    removeFromCart(context) {
        context.commit('removeFromCart');
    },
    captchaGenerator(context) {
        context.commit('captchaGenerator');
    },
    increase(context, payload) {
        context.commit('increase', payload);
    },
    decrease(context, payload) {
        context.commit('decrease', payload);
    }
};