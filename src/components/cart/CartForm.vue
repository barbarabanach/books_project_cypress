<template>
    <base-dialog :show="formIsValid" title="THANKS FOR ORDER" @close="closeDialog">
    <h3>SUMMARY:</h3>
       <ul>
              <li><span>First Name:</span> {{ name.value }}</li>
              <li><span>Last Name:</span> {{ surname.value }}</li>
              <li><span>Place:</span> {{ place.value }}</li>
              <li><span>Postal Code:</span> {{ postalCode.value }}</li>
              <li><span>Phone number:</span> {{ number.value }}</li>
              <li><span>E-Mail:</span> {{ email.value }}</li>
              <li><span>Total:</span> {{ summaryTotal }} zł</li>
          </ul>
    </base-dialog>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !name.isValid}">
            <label for="name">First Name</label>
            <input 
            type="text" 
            id="name" 
            v-model.trim="name.value"
            @blur="clearValidity('name')" 
            />
            <div v-if="!name.isValid">First Name must not be empty.</div>
        </div>
        <div class="form-control" :class="{invalid: !surname.isValid}">
            <label for="surname">Last Name</label>
            <input 
            type="text" 
            id="surname" 
            v-model.trim="surname.value"
            @blur="clearValidity('surname')"
            />
            <div v-if="!surname.isValid">Last Name must not be empty.</div>
        </div>
        <div class="form-control" :class="{invalid: !place.isValid}">
            <label for="place">Place</label>
            <input 
            type="text" 
            id="place" 
            v-model.trim="place.value"
            @blur="clearValidity('place')"
            />
            <div v-if="!place.isValid">Place field must not be empty.</div>
        </div>
        <div class="form-control" :class="{invalid: !postalCode.isValid}">
            <label for="postalCode">Postal Code</label>
            <input 
            type="text" 
            placeholder="xx-xxx"
            pattern="[0-9]{2}[-]{1}[0-9]{3}"
            id="postalCode" 
            @input="postalCodeChecker"
            @blur="clearValidity('postalCode')"
            />
            <div v-if="!postalCode.isValid">Postal Code must not be empty (example: 01-234).</div>
        </div>
        <div class="form-control" :class="{invalid: !number.isValid}">
            <label for="number">Phone number</label>
            <input 
            type="tel" 
            placeholder="+XX YYY YYY YYY" 
            pattern="[+]{1}[0-9]{2}[' ']{1}[0-9]{3}[' ']{1}[0-9]{3}[' ']{1}[0-9]{3}"
            id="number" 
            v-model.trim="number.value"
            @blur="clearValidity('number')"
            />
            <div v-if="!number.isValid">Number field must not be empty (example: +48 123 345 678).</div>
        </div>
        <div class="form-control" :class="{invalid: !email.isValid}">
            <label for="email">E-Mail</label>
            <input 
            type="email" 
            id="email" 
            placeholder="xxx@yyy.zz"
            v-model.trim="email.value"
            @blur="clearValidity('email')"
            />
            <div v-if="!email.isValid">E-Mail field must not be empty (example joe@localhost.com).</div>
        </div>
        <div class="form-control">
            <base-captcha @captcha-validation="checkValidation"></base-captcha>
        </div>
        <div class="discount_field" :class="{invalid: !discountCode.isValid}">
            <label for="discountCode" v-if="!discountCode.isValid">Invalid code.</label>
            <input 
            placeholder="DISCOUNT CODE" 
            type="text" 
            id="discountCode" 
            v-model.trim="discountCode.value">
            <button v-if="!discount" @click.prevent="checkDiscountCode">Check code</button>
        </div>
        <h3 :class="discount ? 'divided' : ''">PLN {{ convertTotal }}</h3>
        <h2 v-if="discount">PLN {{ totalAfterDiscount }}</h2>
        <base-button>ORDER AND PAY</base-button>
    </form>
</template>

<script>
import BaseCaptcha from '../ui/BaseCaptcha.vue';

export default {
    components: {
        BaseCaptcha
    },
    data() {
        return {
            name: {
                value: '',
                isValid: true
            },
            surname: {
                value: '',
                isValid: true
            },
            place: {
                value: '',
                isValid: true
            },
            postalCode: {
                value: '',
                isValid: true
            },
            number: {
                value: '',
                isValid: true
            },
            email: {
                value: '',
                isValid: true
            },
            discountCode: {
                value: '',
                isValid: true
            },
            formIsValid: false,
            total: (this.$store.getters['cart/total']).toFixed(2),
            currency: this.$store.getters['order/currency'],
            discount: false,
            totalAfterDiscount: 0,
            captchaIsValid: false
        }
    },
    computed: {
        summaryTotal() {
            return this.discount ? this.totalAfterDiscount : this.convertTotal;
        },
        convertTotal() {
            return (this.total * this.currency[1].mid).toFixed(2);
        }
    },
    methods: {
        checkValidation(captcha) {
            if(captcha) {
                this.captchaIsValid = true;
            } else {
                 this.captchaIsValid = false;
            }
        },
        postalCodeChecker(event) {
            if(event.target.value.length == 2) {
               event.target.value += '-';
            }
            this.postalCode.value = event.target.value;
        },
        checkDiscountCode() {
            this.discountCode.isValid = true;
            if(this.discountCode.value !== 'TUTORE12') {
                this.totalAfterDiscount = (this.total * this.currency[1].mid).toFixed(2);
                this.discountCode.isValid = false;
            } else {
                this.totalAfterDiscount = ((this.total -(this.total * 0.10))*this.currency[1].mid).toFixed(2);
                this.discount = true;
            }
        },
        validateForm() {
            this.formIsValid = true;
            if(this.name.value === '') {
                this.name.isValid = false;
                this.formIsValid = false;
            }
            if(this.surname.value === '') {
                this.surname.isValid = false;
                this.formIsValid = false;
            }
            if(this.place.value === '') {
                this.place.isValid = false;
                this.formIsValid = false;
            }
            if(this.postalCode.value === '' || this.postalCode.value.length > 6 || this.postalCode.value.length < 6) {
                this.postalCode.isValid = false;
                this.formIsValid = false;
            }
            if(this.number.value === '' || this.number.value.length < 15 || this.number.value.length > 15) {
                this.number.isValid = false;
                this.formIsValid = false;
            }
            if(this.email.value.includes('.')) {
                this.email.isValid = true;
                this.formIsValid = true;
            } else {
                this.email.isValid = false;
                this.formIsValid = false;
            }
            if(!this.captchaIsValid) {
                this.formIsValid = false;
            }
            if(this.total === 0) {
                this.formIsValid = false;
            }
        },
        clearValidity(input) {
            this[input].isValid = true;
        },
        closeDialog() {
            this.formIsValid = false;
            this.$router.replace('/home');
            setTimeout(function() {
                window.location.reload(true);
            }, 1000)
        },
        submitForm() {
            this.validateForm();
            if (!this.formIsValid) {
                console.log("NOT SUBMITED");
                return;
            }
            console.log("SUBMITED");
        },
    }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

h2 {
    color: green;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

button {
    margin-top: 2%;
}

.divided {
    text-decoration: line-through;
}

.discount_field {
    margin-top: 7%;
    width: 25%;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}

li {
    margin-top: 7px;
}

span {
    font-weight: 600;
}


</style>