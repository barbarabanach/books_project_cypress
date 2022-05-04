import { createStore } from 'vuex';

import cartModule from './modules/cart/index.js';
import homeModule from './modules/home/index.js';
import orderModule from './modules/order/index.js';

const store = createStore({
  modules: {
    cart: cartModule,
    home: homeModule,
    order: orderModule
  }
});

export default store;