import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import {DeedDocumentEnum} from '@/store/types/DeedDocumentType';
import {USState} from '@/store/types/USState';

interface SearchReportType {
    currentDate: Date | null;
    deedDocumentTypes: string[];
    deedDocumentType: DeedDocumentEnum | null;
    states: string[];
    state: USState | null;
}

const searchReportState: SearchReportType = {
    currentDate: new Date(),
    deedDocumentTypes: Object.keys(DeedDocumentEnum).map((key) => DeedDocumentEnum[key as any]),
    deedDocumentType: null,
    states: Object.keys(USState),
    state: null
};

const gettersSearchReport: GetterTree<SearchReportType, any> = {
    getDeedDocumentTypes: (state: SearchReportType) => state.deedDocumentTypes,
    getDeedDocumentType: (state: SearchReportType) => state.deedDocumentType,
    getStates: (state: SearchReportType) => state.states,
    getState: (state: SearchReportType) => state.state
};

const mutationsSearchReport: MutationTree<any> = {
    setNewDocumentType: (state, payload: DeedDocumentEnum | null) => {
        searchReportState.deedDocumentType = payload;
    },
    setNewState: (state, payload: USState | null) => {
        searchReportState.state = payload;
    }
};

const actionsSearchReport: ActionTree<SearchReportType, any> = {
    setNewDocumentType: (searchReportStore: ActionContext<SearchReportType, any>, payload: DeedDocumentEnum | null) => {
        if (payload !== null && searchReportStore.state.deedDocumentTypes.indexOf(payload) === -1) {
            payload = null;
        }
        searchReportStore.commit('setNewDocumentType', payload);
    },
    setNewState: (searchReportStore: ActionContext<SearchReportType, any>, payload: string) => {
        let newState: USState | null;
        if (payload === null || searchReportStore.state.states.indexOf(payload) === -1) {
            newState = null;
        } else {
            newState = USState[payload];
        }
        searchReportStore.commit('setNewState', newState);
    }
};

export const searchReportModule = {
    state: searchReportState,
    getters: gettersSearchReport,
    mutations: mutationsSearchReport,
    actions: actionsSearchReport
};
