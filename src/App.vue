<template>
  <div id="app" class="col-md-8 mx-auto">
    <Report v-for="report in reports"   
      v-bind:id="report.id"
      v-bind:state="report.state"
      v-bind:type="report.type"
      v-bind:message="report.message"
      v-bind:key="report.id"
      v-on:reload-reports="fetchReports">
    </Report>
  </div>
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import Report from './components/Report.vue';
export default {
  name: 'App',
  components: {
    Report
  },
   mounted() {
     this.fetchReports()
   
  },
  data: function () {
    return {
      reports: []
    }
  },
  methods: 
  {
    fetchReports: async function () {
     const response = await fetch('http://localhost:3000/reports');
     const reports = await response.json();
     this.reports = reports;
    }
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  justify-content: center;
}
</style>
