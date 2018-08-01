<template>
    <div class="hello">
        <CalendarInput @setNewDate="setCurrentDate"
                       :input-date="getCurrentDate"/>
        <SelectOption :options="getDeedDocumentTypes"
                      :input-value="getDeedDocumentType"
                      :empty-value="true"
                      :place-holder="'Select'"
                      @changeValue="setNewDeedDocumentType"/>
        <PhoneInput :input-value="getPhone"
                    @changePhoneValue="setPhone"/>
        <CurrencyInput :input-value="getCurrency"
                       @changeCurrencyValue="setCurrency"/>

        <!--<SelectOption :options="getStates"-->
        <!--:input-value="getState.name"-->
        <!--:empty-value="false"-->
        <!--:place-holder="'Select'"-->
        <!--@changeValue="setState"/>-->
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Getter, Action} from 'vuex-class';
    import CalendarInput from '@/components/fields/CalendarInput.vue';
    import SelectOption from '@/components/fields/SelectOption.vue';
    import PhoneInput from '@/components/fields/PhoneInput.vue';
    import CurrencyInput from '@/components/fields/CurrencyInput.vue';
    import {USState} from '../store/types/USState';

    @Component({
        components: {
            SelectOption,
            CalendarInput,
            PhoneInput,
            CurrencyInput
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
