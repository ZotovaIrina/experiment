<template>
    <div class="hello">
        <form name="applicationForm">
            <InputField v-for="field in fieldArray"
                        :params="field"
                        :inputValue="getParams(field.dataPath)"
                        @onChange="setValue"/>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {Getter, Action} from 'vuex-class';
    import InputField from '@/components/fields/InputField.vue';
    import {FormPayload, SearchReportType} from '../store/searchReportStore';
    import {DeedDocumentMap} from '../store/types/DeedDocumentType';

    @Component({
        components: {
            InputField
        }
    })
    export default class Application extends Vue {
        @Getter public getSearchReportData: SearchReportType;
        @Action public setSearchReportValue: (payload: FormPayload) => void;

        get fieldArray() {
            return Object.keys(this.formConfig()).map((key) => this.formConfig()[key as any]);
        }

        public getParams(fieldID: string) {
            return this.getData()[this.formConfig()[fieldID].dataPath];
        }

        public setValue(payload: FormPayload) {
            return this.setSearchReportValue(payload);
        }

        private formConfig() {
            return {
                currentDay: {
                    type: 'calendar',
                    label: 'Current date',
                    dataPath: 'currentDay',
                    isRequired: true
                },
                phone: {
                    type: 'phone',
                    label: 'Phone',
                    dataPath: 'phone',
                    isRequired: false
                },
                deedDocumentType: {
                    type: 'selectOption',
                    label: 'Document type',
                    options: Object.keys(DeedDocumentMap).map((key) => DeedDocumentMap[key as any]),
                    emptyValue: true,
                    placeHolder: 'Select',
                    isRequired: false,
                    dataPath: 'deedDocumentType'
                },
                currency: {
                    type: 'currency',
                    label: 'Price',
                    dataPath: 'currency',
                    isRequired: false
                }

            };
        }

        private getData() {
            return this.getSearchReportData;
        }
    }
</script>
