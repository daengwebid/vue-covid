<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">
      <Sidebar v-if="isAuth"/>
      <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" :class="sideBarOpen ? 'overlay' : ''" id="main-content">
        <Navbar v-if="isAuth" />
        <div class="p-6 bg-gray-100 mb-20">
          <router-view />
        </div>
        <!-- <Footer /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
// import Footer from './Footer'

export default {
  name: 'Layouts',
  computed: {
    ...mapState(['sideBarOpen']),
    ...mapGetters(['isAuth'])
  },
  components: {
    Sidebar,
    Navbar,
    // Footer
  }
}
</script>
