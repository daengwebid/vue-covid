import Vue from 'vue'
import Vuex from 'vuex'

import covid from './store/covid'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        covid
    },
    state: {
        sideBarOpen: false,
        token: localStorage.getItem('fb-token')
    },
    getters: {
        sideBarOpen: state => {
            return state.sideBarOpen
        },
        isAuth: state => {
            return state.token != '' && state.token != null
        }
    },
    mutations: {
        toggleSidebar (state) {
            state.sideBarOpen = !state.sideBarOpen
        },
        SET_TOKEN: (state, payload) => {
            state.token = payload
        }
    },
    actions: {
        toggleSidebar(context) {
            context.commit('toggleSidebar')
        }
    }
})
