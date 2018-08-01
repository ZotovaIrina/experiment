<template>
    <div class="hello">
        <h2>Date time: {{dateTime}}</h2>
        <h2 v-if="!!getCurrentDate">
            {{getCurrentDate.toLocaleString('en-En', options)}}
        </h2>
        <CalendarInput @setNewDate="setCurrentDate"
                       :input-date="getCurrentDate"/>
        <SelectOption :options="getDeedDocumentTypes"
                      :input-value="getDeedDocumentType"
                      :empty-value="true"
                      :place-holder="'Select'"
                      @changeValue="setNewDeedDocumentType"/>
        <PhoneInput :input-value="getPhone"
                    @changePhoneValue="setPhone"/>
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
    import {USState} from '../store/types/USState';

    @Component({
        components: {
            SelectOption,
            CalendarInput,
            PhoneInput
        }
    })
    export default class Application extends Vue {
        @Getter public getCurrentDate: string | null;
        @Action public setCurrentDate: string | null;
        @Getter public getDeedDocumentTypes: string[];
        @Getter public getDeedDocumentType: string | null;
        @Getter public getPhone: string | null;
        @Action public setNewDocumentType: (newValue: string | null) => void;
        @Getter public getStates: string[];
        @Getter public getState: USState | null;
        @Action public setNewState: (newValue: string | null) => void;
        @Action public setPhone: (newValue: string | null) => void;

        public options = {weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'};

        public dateTime = 'date';

        public setNewDeedDocumentType(newValue: string | null) {
            this.setNewDocumentType(newValue);
        }

        public setState(newValue: string | null) {
            this.setNewState(newValue);
        }

    }
</script>
