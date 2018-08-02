import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import {USState} from '@/store/types/USState';

export interface SearchReportType {
    currentDate: string | null;
    deedDocumentType: string | null;
    state: USState | null;
    phone: string | null;
    currency: number | null;
}

export interface FormPayload {
   field: string;
   data: any;
}

const searchReportState: SearchReportType = {
    currentDate: null,
    deedDocumentType: null,
    state: null,
    phone: '11111111',
    currency: null
};

const gettersSearchReport: GetterTree<SearchReportType, any> = {
    getSearchReportData: (state: SearchReportType) => state
};

const mutationsSearchReport: MutationTree<any> = {
    setSearchReportValue: (state, payload: FormPayload) => {
        searchReportState[payload.field] = payload.data;
    }
};

const actionsSearchReport: ActionTree<SearchReportType, any> = {
    setSearchReportValue: (searchReportStore: ActionContext<SearchReportType, any>, payload: FormPayload) => {
        searchReportStore.commit('setSearchReportValue', payload);
    }
};

export const searchReportModule = {
    state: searchReportState,
    getters: gettersSearchReport,
    mutations: mutationsSearchReport,
    actions: actionsSearchReport
};
