import Vue from 'vue';
import Vuex from 'vuex';
import DeedDocumentType from '@/store/enams/DeedDocumentType';

Vue.use(Vuex);

type NullableDate = Date | null;

interface SearchReportState {
    currentDate: NullableDate;
    deedDocumentType: DeedDocumentType;
}

export default new Vuex.Store<SearchReportState>({
    state: {
        currentDate: new Date(),
        deedDocumentType: null
    },
    mutations: {
        setNewDate(state: SearchReportState, newDate: NullableDate) {
            state.currentDate = newDate;
        },
        setNewDocumentType(state: SearchReportState, newValue: DeedDocumentType) {
            state.deedDocumentType = newValue;
        }
    }
});
