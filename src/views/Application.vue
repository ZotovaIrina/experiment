<template>
    <div class="hello">
        <form name="applicationForm">
            <InputField :params="{
                        type: 'calendar',
                        label: 'Current date',
                        inputValue: getCurrentDate,
                        isRequired: true}"
                        @onChange="setCurrentDate" />
            <InputField :params="{
                        type: 'phone',
                        label: 'Phone',
                        inputValue: getPhone,
                        isRequired: false}"
                        @onChange="setPhone" />
            <InputField :params="{
                        type: 'selectOption',
                        label: 'Document type',
                        inputValue: getDeedDocumentType,
                        options: getDeedDocumentTypes,
                        emptyValue: true,
                        placeHolder: 'Select',
                        isRequired: false}"
                        @onChange="setNewDeedDocumentType" />
            <InputField :params="{
                        type: 'currency',
                        label: 'Price',
                        inputValue: getCurrency,
                        isRequired: false}"
                        @onChange="setCurrency" />
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Getter, Action} from 'vuex-class';
    import InputField from '@/components/fields/InputField.vue';
    import {USState} from '../store/types/USState';

    @Component({
        components: {
            InputField
        }
    })
    export default class Application extends Vue {
        @Getter public getCurrentDate: string | null;
        @Getter public getCurrency: number | null;
        @Action public setCurrency: number | null;
        @Action public setCurrentDate: string | null;
        @Getter public getDeedDocumentTypes: string[];
        @Getter public getDeedDocumentType: string | null;
        @Getter public getPhone: string | null;
        @Action public setNewDocumentType: (newValue: string | null) => void;
        @Getter public getStates: string[];
        @Getter public getState: USState | null;
        @Action public setNewState: (newValue: string | null) => void;
        @Action public setPhone: (newValue: string | null) => void;

        public setNewDeedDocumentType(newValue: string | null) {
            this.setNewDocumentType(newValue);
        }

        public setState(newValue: string | null) {
            this.setNewState(newValue);
        }
    }
</script>
