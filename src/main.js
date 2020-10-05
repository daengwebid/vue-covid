import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'
import firebase from 'firebase'

import Router from 'vue-router'
import '@/assets/css/tailwind.css'

import Home from './pages/Home.vue'
import ByCountry from './pages/ByCountry.vue'
import ByDay from './pages/ByDay.vue'
import Login from './pages/Login.vue'

let config = {
  apiKey: "AIzaSyC-PHNUH4jYlYM2BUws4zN8g-iCv1dbfyU",
  authDomain: "drivemark-f2240.firebaseapp.com",
  databaseURL: "https://drivemark-f2240.firebaseio.com",
  projectId: "drivemark-f2240",
  storageBucket: "drivemark-f2240.appspot.com",
  messagingSenderId: "68151402796"
};
firebase.initializeApp(config);

Vue.config.productionTip = false

const settings = {
  TTable: {
    classes: {
      table: 'shadow min-w-full divide-y divide-gray-200',
      tbody: 'bg-white divide-y divide-gray-200',
      td: 'px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700',
      theadTh: 'px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider'
    },
    variants: {
      thin: {
        td: 'p-1 whitespace-no-wrap text-sm leading-4 text-gray-700',
        theadTh: 'p-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider'
      }
    }
  },
  TCard: {
    fixedClasses: {
      wrapper: 'rounded max-w-lg mx-auto shadow',
      body: 'p-4',
      header: 'p-4 border-b',
      footer: 'p-4 border-t'
    },
    classes: {
      wrapper: 'bg-white',
      body: '',
      header: '',
      footer: ''
    },
    variants: {
      danger: {
        wrapper: 'bg-red-100 text-red-700',
        header: 'border-red-200 text-red-700',
        footer: 'border-red-200 bg-red-100 text-red-700'
      },
      clean: {
        wrapper: 'rounded',
        footer: 'bg-gray-100 ',
        body: 'p-4 text-sm text-gray-700'
      }
    },
    TButton: {
      fixedClasses: 'focus:outline-none focus:shadow-outline inline-flex items-center transition ease-in-out duration-150',
      classes: 'text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
      variants: {
        error: 'text-white bg-red-600 hover:bg-red-500 focus:border-red-700  active:bg-red-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
        success: 'text-white bg-green-600 hover:bg-green-500 focus:border-green-700 active:bg-green-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
        funny: 'text-white bg-orange-600 hover:bg-orange-500 focus:border-orange-700 active:bg-orange-700 text-sm font-medium uppercase border-orange-200 px-4 py-2 border-2 rounded-full shadow',
        link: 'underline text-orange-500 px-3 py-2 hover:bg-orange-100 rounded'
      }
    }
  },
  TSelect: {
    fixedClasses: 'block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3',
    classes: '',
    variants: {
      danger: 'border-red-300 bg-red-100',
      success: 'border-green-300 bg-green-100'
    }
  },
  TInput: {
    classes: 'bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full leading-normal',
    variants: {
      error: 'text-red-600 bg-red-100 focus:outline-none focus:shadow-outline border border-red-300 rounded py-2 px-4 block w-full leading-normal placeholder-red-300',
      success: 'text-green-600 bg-green-100 focus:outline-none focus:shadow-outline border border-green-300 rounded py-2 px-4 block w-full leading-normal placeholder-green-300',
      fun: 'bg-orange-100 block border-2 border-orange-300 focus:border-orange-500 focus:outline-none leading-normal px-4 py-3 rounded-full shadow-inner w-full placeholder-orange-300'
    }
  },
  TAlert: {
    fixedClasses: {
      wrapper: 'rounded p-4 flex text-sm border-l-4',
      body: 'flex-grow',
      close: 'ml-4 rounded',
      closeIcon: 'h-5 w-5 fill-current'
    },
    classes: {
      wrapper: 'bg-blue-100 border-blue-500',
      body: 'text-blue-700',
      close: 'text-blue-700 hover:text-blue-500 hover:bg-blue-200',
      closeIcon: 'h-5 w-5 fill-current'
    },
    variants: {
      danger: {
        wrapper: 'bg-red-100 border-red-500',
        body: 'text-red-700',
        close: 'text-red-700 hover:text-red-500 hover:bg-red-200'
      },
      success: {
        wrapper: 'bg-green-100 border-green-500',
        body: 'text-green-700',
        close: 'text-green-700  hover:text-green-500 hover:bg-green-200'
      }
    }
  }
}

Vue.use(VueTailwind, settings)
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home},
  { path: '/login', name: 'Login', component: Login},
  { path: '/by-country', name: 'ByCountry', component: ByCountry},
  { path: '/by-day', name: 'ByDay', component: ByDay},
]

const router = new Router({
  mode: 'history',
  routes
})


router.beforeEach((to, from, next) => {
  console.log(from)
  if (to.name != 'Login' && !store.getters.isAuth) {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
