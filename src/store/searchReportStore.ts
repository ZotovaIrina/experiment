import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import {USState} from '@/store/types/USState';
import {Vue} from 'vue-property-decorator';

export interface SearchReportType {
    data: any;
}

export interface FormPayload {
   field: string;
   data: any;
}

const searchReportState: SearchReportType = {
    data: {}
};

const gettersSearchReport: GetterTree<SearchReportType, any> = {
    getSearchReportData: (state: SearchReportType) => state.data
};

const mutationsSearchReport: MutationTree<any> = {
     setSearchReportValue: (state, payload: FormPayload) => {
    //     searchReportState.data = {
    //         ...searchReportState.data,
    //         ...payload
    //     };
        for (var key in payload) {
            console.log('searchReportState.data',key,  searchReportState.data[key]);
            Vue.set(searchReportState.data, key, payload[key]);
            console.log('searchReportState.data',key,  searchReportState.data[key]);
        }

        //  for (const attrname in payload) { searchReportState.data[attrname] = payload[attrname]; }
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
