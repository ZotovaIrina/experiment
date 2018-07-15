import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentDate: new Date(),
        deedDocumentType: null
    },
    mutations: {
        setNewDate(state, newDate) {
            state.currentDate = newDate;
        },
        setNewDocumentType(state, newValue) {
            state.deedDocumentType = newValue;
        }
    }
});
