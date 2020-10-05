<template>
    <div>
        <div class="w-full mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
                Email
            </label>
            <t-input name="email" v-model="email" placeholder="Email..." />
        </div>
        <div class="w-full mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
                Password
            </label>
            <t-input name="password" type="password" v-model="password" placeholder="******" />
        </div>
        <t-alert variant="error" class="mb-3 flex-grow text-red-700" show v-if="messageText">
            {{ messageText }}
        </t-alert>
        <t-button @click="submit" class="transform ease-in-out duration-100 bg-orange-500 hover:bg-orange-700 text-white uppercase text-sm py-2 px-4 rounded">{{ isLoading ? 'Loading...':'Login' }}</t-button>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters, mapMutations } from 'vuex'

export default {
    created() {
        if (this.isAuth) {
            this.$router.push({name: 'Home'})
        }
    },
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
            messageText: null
        }
    },
    computed: {
        ...mapGetters(['isAuth'])
    },
    methods: {
        ...mapMutations(['SET_TOKEN']),
        submit() {
            if (!this.isLoading) {
                this.isLoading = true
                this.messageText = null
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
                    this.isLoading = false
                    localStorage.setItem('fb-token', user.user.refreshToken)
                    this.SET_TOKEN(user.user.refreshToken)
                    this.$router.push({name: 'Home'})
                }).catch(() => {
                    this.isLoading = false
                    this.messageText = 'Email/Password is Wrong'
                })
            }
        }
    }
}
</script>