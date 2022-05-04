<template>
     <div class="captcha-area">
      <div class="captcha-img">
        <span class="captcha">{{ captchaText }}</span>
      </div>
      <button class="reload-btn" @click.prevent="refreshCaptcha"><i class='fas fa-redo-alt'></i></button>
    </div>
    <form action="#" class="input-area">
      <input class="inputField" type="text" v-model="userInput" placeholder="Enter captcha" maxlength="6" spellcheck="false" required>
      <button @click.prevent="checkCaptcha" class="check-btn">Check</button>
    </form>
    <div class="status-text">{{ status }}</div>
</template>

<script>
export default {
    emits: ['captcha-validation'],
    data() {
        return {
            userInput: '',
            status: '',
            captchaJoined: '',
            captchaIsValid: false
        };
    },
    computed: {
        captchaText() {
            return this.$store.getters['cart/captcha'];
        }
    },
    methods: {
        generateNewCaptcha() {
            this.$store.dispatch('cart/captchaGenerator');
        },
        refreshCaptcha() {
            this.removeContent();
            this.generateNewCaptcha();
        },
        checkCaptcha() {
            this.captchaJoined = this.captchaText.replace(/[ ]/gi, '');
            if(this.userInput === this.captchaJoined) {
                this.status = "Congratulations! You are human 👨";
                this.captchaIsValid = true;
            } else {
                this.refreshCaptcha();
                this.status = "Blip-blop-bup 🤖";
                this.captchaIsValid = false;  
            }
            this.$emit('captcha-validation', this.captchaIsValid);
        },
        removeContent(){
            this.userInput = "";
            this.captcha = "";
            this.status = "";
        },
    }
}
</script>

<style scoped>
.captcha-area {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    margin: 20px 0 5px 0;
}
.captcha-img {
    height: 50px;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('../../img/captcha_bg.png');
    font-weight: 700;
    font-size: 19px;
}
.status-text {
    display: block;
}

i {
    font-size: 15px;
}

.inputField {
    width: 20%;
}

</style>