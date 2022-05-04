export default {
    addToCart(state, payload) {
        const item = payload;
        const itemInCartIndex = state.items.findIndex(index => index.id === item.id);

        if(itemInCartIndex >= 0) {
            state.items[itemInCartIndex].quantity++;
        } else {
            const newItem = {
                id: item.id,
                isbn13: item.isbn13,
                title: item.title,
                image: item.image,
                author: item.author,
                price: item.price.replace('$',''),
                quantity: 1
            };
            state.items.push(newItem);
        } 
        state.quantity++;
        state.total += parseFloat(item.price.replace('$',''));
    },
    increase(state, payload) {
        const item = payload;
        const itemInCartIndex = state.items.findIndex(index => index.id === item.id);
        
        if(state.items[itemInCartIndex].quantity === 10) {
            state.items[itemInCartIndex].quantity = 10;
        } else {
            state.items[itemInCartIndex].quantity++;
            state.total += parseFloat(state.items[itemInCartIndex].price);
            state.quantity++;
        }
    },
    decrease(state, payload) {
        const item = payload;
        const itemInCartIndex = state.items.findIndex(index => index.id === item.id);
        
        if(state.items[itemInCartIndex].quantity > 0) {
            state.items[itemInCartIndex].quantity--;
            state.total -= parseFloat(state.items[itemInCartIndex].price);
            state.quantity--;
            if(state.items[itemInCartIndex].quantity === 0){
                //state.items[itemInCartIndex].quantity = 0;
                state.items.splice(itemInCartIndex, 1);
            }
        }
    },
    // removeOneElemnt(state) {
    //     state.items.splice(itemInCartIndex, 1);
    // },
    removeFromCart(state) {
        state.items = [];
        state.quantity = 0;
        state.total = 0;
    },
    captchaGenerator(state) {
        let randomChars = [];
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            randomChars = state.allCharacters[Math.floor(Math.random() * state.allCharacters.length)];
            captcha += `${randomChars} `;
        }
        state.captcha = captcha;
    },
};