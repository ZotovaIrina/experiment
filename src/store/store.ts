import Vue from 'vue';
import Vuex from 'vuex';
import DeedDocumentType, {DeedDocumentEnum} from '@/store/enams/DeedDocumentType';

Vue.use(Vuex);

type NullableDate = Date | null;

interface SearchReportState {
    currentDate: NullableDate;
    deedDocumentType: DeedDocumentEnum;
}

export default new Vuex.Store<SearchReportState>({
    state: {
        currentDate: new Date(),
        deedDocumentType: DeedDocumentEnum.certificate_of_title
    },
    getters: {
        getDeedDocumentType(state): string {
            return state.deedDocumentType;
        }
    },
    mutations: {
        setNewDate(state: SearchReportState, newDate: NullableDate) {
            state.currentDate = newDate;
        },
        setNewDocumentType(state: SearchReportState, newValue: DeedDocumentEnum) {
            state.deedDocumentType = newValue;
        }
    }
});
