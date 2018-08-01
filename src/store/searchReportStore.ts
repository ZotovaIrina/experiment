import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import {DeedDocumentEnum} from '@/store/types/DeedDocumentType';
import {USState} from '@/store/types/USState';

interface SearchReportType {
    currentDate: string | null;
    deedDocumentTypes: string[];
    deedDocumentType: DeedDocumentEnum | null;
    states: string[];
    state: USState | null;
    phone: string | null;
    currency: number | null;
}

const searchReportState: SearchReportType = {
    currentDate: null,
    deedDocumentTypes: Object.keys(DeedDocumentEnum).map((key) => DeedDocumentEnum[key as any]),
    deedDocumentType: null,
    states: Object.keys(USState),
    state: null,
    phone: null,
    currency: null
};

const gettersSearchReport: GetterTree<SearchReportType, any> = {
    getCurrentDate: (state: SearchReportType) => state.currentDate,
    getDeedDocumentTypes: (state: SearchReportType) => state.deedDocumentTypes,
    getDeedDocumentType: (state: SearchReportType) => state.deedDocumentType,
    getStates: (state: SearchReportType) => state.states,
    getState: (state: SearchReportType) => state.state,
    getPhone: (state: SearchReportType) => state.phone,
    getCurrency: (state: SearchReportType) => state.currency
};

const mutationsSearchReport: MutationTree<any> = {
    setNewDocumentType: (state, payload: DeedDocumentEnum | null) => {
        searchReportState.deedDocumentType = payload;
    },
    setNewState: (state, payload: USState | null) => {
        searchReportState.state = payload;
    },
    setCurrentDate: (state, payload: string | null) => {
        searchReportState.currentDate = payload;
    },
    setPhone: (state, payload: string | null) => {
        searchReportState.phone = payload;
    },
    setCurrency: (state, payload: number | null) => {
        searchReportState.currency = payload;
    }
};

const actionsSearchReport: ActionTree<SearchReportType, any> = {
    setNewDocumentType: (searchReportStore: ActionContext<SearchReportType, any>, payload: DeedDocumentEnum | null) => {
        if (payload !== null && searchReportStore.state.deedDocumentTypes.indexOf(payload) === -1) {
            payload = null;
        }
        searchReportStore.commit('setNewDocumentType', payload);
    },
    setNewState: (searchReportStore: ActionContext<SearchReportType, any>, payload: string | null) => {
        let newState: USState | null;
        if (payload === null || searchReportStore.state.states.indexOf(payload) === -1) {
            newState = null;
        } else {
            newState = USState[payload];
        }
        searchReportStore.commit('setNewState', newState);
    },
    setCurrentDate: (searchReportStore: ActionContext<SearchReportType, any>, payload: string | null) => {
        searchReportStore.commit('setCurrentDate', payload);
    },
    setPhone: (searchReportStore: ActionContext<SearchReportType, any>, payload: string | null) => {
        searchReportStore.commit('setPhone', payload);
    },
    setCurrency: (searchReportStore: ActionContext<SearchReportType, any>, payload: number | null) => {
        searchReportStore.commit('setCurrency', payload);
    }
};

export const searchReportModule = {
    state: searchReportState,
    getters: gettersSearchReport,
    mutations: mutationsSearchReport,
    actions: actionsSearchReport
};
