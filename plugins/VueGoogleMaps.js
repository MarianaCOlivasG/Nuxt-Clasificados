import Vue from 'vue'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyA3mcj07-7u_nSPUosA0IuwIU3WPnP0D6I",
        //key: 'AIzaSyADZSylzV3r0t5dueHTeq89R5w_8za7_Ic',
        libraries: 'geocoder,places',
    },
});