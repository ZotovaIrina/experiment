import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import {DeedDocumentEnum} from '@/store/enams/DeedDocumentType';

interface SearchReportType {
    currentDate: Date | null;
    deedDocumentTypes: string[];
    deedDocumentType: DeedDocumentEnum | null;
}

const searchReportState: SearchReportType = {
    currentDate: new Date(),
    deedDocumentTypes: Object.keys(DeedDocumentEnum).map((key) => DeedDocumentEnum[key as any]),
    deedDocumentType: DeedDocumentEnum.certificate_of_title
};

const gettersSearchReport: GetterTree<SearchReportType, any> = {
    getDeedDocumentTypes: (state: SearchReportType) => state.deedDocumentTypes,
    getDeedDocumentType: (state: SearchReportType) => state.deedDocumentType
};

const mutationsSearchReport: MutationTree<any> = {
    setNewDocumentType: (state, payload: DeedDocumentEnum | null) => {
        searchReportState.deedDocumentType = payload;
    }
};

const actionsSearchReport: ActionTree<SearchReportType, any> = {
    setNewDocumentType: (searchReportStore: ActionContext<SearchReportType, any>, payload: DeedDocumentEnum | null) => {
        searchReportStore.commit('setNewDocumentType', payload);
    }
};

export const searchReportModule = {
    state: searchReportState,
    getters: gettersSearchReport,
    mutations: mutationsSearchReport,
    actions: actionsSearchReport
};
