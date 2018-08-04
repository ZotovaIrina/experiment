import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import {USState} from '@/store/types/USState';

export interface SearchReportType {
    openMortgages: number | null;
    bankruptcies: number | null;
    judgements: number | null;
    otherLiens: number | null;
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
    openMortgages: 1,
    bankruptcies: 2,
    judgements: 3,
    otherLiens: 4,
    currentDate: '2018-02-02',
    deedDocumentType: null,
    state: null,
    phone: '1111111111',
    currency: 10000000
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
