import Vue from 'vue';
import Vuex from 'vuex';
import {searchReportModule} from '@/store/searchReportStore';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        searchReportStore: searchReportModule
    }
});
