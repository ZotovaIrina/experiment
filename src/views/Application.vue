<template>
    <div class="hello">
        <form name="applicationForm">
            <GroupField :params="formConfig()"
                         :data="getData"
                         @onChange="setValue"/>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {Getter, Action} from 'vuex-class';
    import {FormPayload, SearchReportType} from '../store/searchReportStore';
    import {DeedDocumentMap} from '../store/types/DeedDocumentType';
    import GroupField from '@/components/fields/GroupField.vue';

    @Component({
        components: {
            GroupField
        }
    })
    export default class Application extends Vue {
        @Getter public getSearchReportData: SearchReportType;
        @Action public setSearchReportValue: (payload: FormPayload) => void;

        get fieldArray() {
            return Object.keys(this.formConfig()).map((key) => this.formConfig()[key as any]);
        }

        public getParams(fieldID: string | null) {
            if (fieldID === null) {
                return null;
            } else {
                return this.getData[this.formConfig()[fieldID].dataPath];
            }
        }

        public setValue(payload: FormPayload) {
            return this.setSearchReportValue(payload);
        }

        private formConfig() {

            return {
                fields: {
                    // summary: {
                    //     type: 'group',
                    //     layout: 'column',
                    //     title: 'Summary',
                    //     dataPath: null,
                    //     fields: {
                    //         line1: {
                    //             type: 'group',
                    //             layout: 'row',
                    //             fields: {
                    //                 openMortgages: {
                    //                     type: 'number',
                    //                     title: 'Open mortgages',
                    //                     dataPath: 'openMortgages',
                    //                     isRequired: false
                    //                 },
                    //                 bankruptcies: {
                    //                     type: 'number',
                    //                     title: 'Bankruptcies',
                    //                     dataPath: 'bankruptcies',
                    //                     isRequired: false
                    //                 },
                    //                 judgements: {
                    //                     type: 'number',
                    //                     title: 'judgements',
                    //                     dataPath: 'judgements',
                    //                     isRequired: false
                    //                 },
                    //                 otherLiens: {
                    //                     type: 'number',
                    //                     title: 'otherLiens',
                    //                     dataPath: 'otherLiens',
                    //                     isRequired: false
                    //                 }
                    //             }
                    //         },
                    //         currentDay: {
                    //             type: 'calendar',
                    //             title: 'Current date',
                    //             dataPath: 'currentDay',
                    //             isRequired: true
                    //         }
                    //     }
                    // },
                    mortgageInformation: {
                        type: 'array',
                        title: 'Mortgage information',
                        dataPath: 'mortgageInformation',
                        itemTitle: 'Mortgage No.$index',
                        fields: {
                            documentType: {
                                type: 'selectOption',
                                title: 'Document type',
                                options: Object.keys(DeedDocumentMap).map((key) => DeedDocumentMap[key as any]),
                                emptyValue: false,
                                placeHolder: 'Select',
                                isRequired: true,
                                dataPath: 'deedDocumentType'
                            },
                            mortgageDate: {
                                type: 'calendar',
                                title: 'Mortgage date',
                                dataPath: 'mortgageDate',
                                isRequired: false
                            }
                        }
                    }
                    // ,
                    // currentDay: {
                    //     type: 'calendar',
                    //     title: 'Current date',
                    //     dataPath: 'currentDay',
                    //     isRequired: true
                    //
                    // },
                    // phone: {
                    //     type: 'phone',
                    //     title: 'Phone',
                    //     dataPath: 'phone',
                    //     isRequired: false
                    // },
                    // deedDocumentType: {
                    //     type: 'selectOption',
                    //     title: 'Document type',
                    //     options: Object.keys(DeedDocumentMap).map((key) => DeedDocumentMap[key as any]),
                    //     emptyValue: true,
                    //     placeHolder: 'Select',
                    //     isRequired: true,
                    //     dataPath: 'deedDocumentType'
                    // },
                    // currency: {
                    //     type: 'currency',
                    //     title: 'Price',
                    //     dataPath: 'currency',
                    //     isRequired: false
                    // }
                }
            };
        }

        get getData() {
            return this.getSearchReportData;
        }
    }
</script>
