<template>
     <li class="product">
        <div class="product__data">
            <div class="product__image">
                <img :src="image" alt="title" />
            </div>
            <div class="product__text">
                <h3>{{ title }}</h3>
                <h5>Author: {{ author }}</h5>
            </div>
            <div class="summary">
                <div class="price">${{ totalPrice }}</div>
                <div class="qty-actions">
                  <div @click="increase" class="plus-alt"></div>
                  <div class="qty">Quantity: {{ quantity }}</div>
                  <div @click="decrease" class="minus-alt"></div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: ['id', 'image', 'title', 'author', 'price', 'quantity'],
    computed: {
        totalPrice() {
            return (this.price * this.quantity).toFixed(2);
        }
    },
    methods: {
      increase() {
        this.$store.dispatch('cart/increase', {id: this.id});
      },
      decrease() {
        this.$store.dispatch('cart/decrease', {id: this.id});
      }
    },
}
</script>

<style scoped>
li {
  margin: 1.5rem auto;
  border: 1.5px solid #003a37;
  padding: 1rem;
}

p {
  font-size: 13px;
}

.product__data {
  display: flex;
}

.product__image {
  margin-right: 1rem;
}

.product__image img {
  height: 11rem;
  width: 11rem;
  object-fit: cover;
}
.product__text {
    margin-top: 10px;
    margin-left: 10px;
}
.product__text h3 {
  margin: 0 0 0.5rem 0;
}

.product__text h5, h6 {
  margin: 0;
}

.summary {
    display: flex;
    width: 40%;
    padding: 10px 15px 10px 15px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}

.price {
    font-size: 22px;
    font-weight: 700;
}

.qty-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.qty-actions .qty {
    text-align: center;
    width: 80%;
}

.plus-alt {
  width: 30px;
  height: 30px;
  background: linear-gradient(#000 0 0),
              linear-gradient(#000 0 0);
  background-position: center;
  background-size: 50% 2px, 2px 50%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.minus-alt {
  width: 30px;
  height: 30px;
  background: linear-gradient(#000 0 0);
  background-position: center;
  background-size: 50% 2px;
  background-repeat: no-repeat;
  cursor: pointer;
}


</style>