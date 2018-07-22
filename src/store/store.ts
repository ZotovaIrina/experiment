import Vue from 'vue';
import Vuex from 'vuex';
import {DeedDocumentEnum} from '@/store/enams/DeedDocumentType';

Vue.use(Vuex);

type NullableDate = Date | null;

interface SearchReportState {
    currentDate: NullableDate;
    deedDocumentTypes: string[];
    deedDocumentType: DeedDocumentEnum;
}

export default new Vuex.Store<SearchReportState>({
    state: {
        currentDate: new Date(),
        deedDocumentTypes: Object.keys(DeedDocumentEnum).map((key) => DeedDocumentEnum[key as any]),
        deedDocumentType: DeedDocumentEnum.certificate_of_title
    },
    getters: {
        getDeedDocumentTypes(state): string[] {
            return state.deedDocumentTypes;
        },
        getDeedDocumentType(state): string {
            return state.deedDocumentType;
        }
    },
    mutations: {
        setNewDate(state: SearchReportState, newDate: NullableDate) {
            state.currentDate = newDate;
        },
        setNewDocumentType(state: SearchReportState, newValue: DeedDocumentEnum) {
            if (state.deedDocumentTypes.indexOf(newValue) !== -1) {
                state.deedDocumentType = newValue;
            }
        }
    },
    actions: {
        setNewDocumentType(store, newValue: string) {
            if (store.getters.getDeedDocumentTypes.indexOf(newValue) !== -1) {
                store.commit('setNewDocumentType', newValue);
            }
        }
    }
});
