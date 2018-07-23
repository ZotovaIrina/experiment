<template>
    <div class="hello">
        <h2 v-if="!!getCurrentDate">
            {{getCurrentDate.toLocaleString('en-En', options)}}
        </h2>
        <Calendar />
        <SelectOption :options="getDeedDocumentTypes"
                      :input-value="getDeedDocumentType"
                      :empty-value="true"
                      :place-holder="'Select'"
                      @changeValue="setNewDeedDocumentType"/>
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
    import Calendar from '@/components/fields/Calendar.vue';
    import SelectOption from '@/components/fields/SelectOption.vue';
    import {USState} from '../store/types/USState';

    @Component({
        components: {
            SelectOption,
            Calendar
        }
    })
    export default class Application extends Vue {
        @Getter public getCurrentDate: Date;
        @Getter public getDeedDocumentTypes: string[];
        @Getter public getDeedDocumentType: string;
        @Action public setNewDocumentType: (newValue: string | null) => void;
        @Getter public getStates: string[];
        @Getter public getState: USState | null;
        @Action public setNewState: (newValue: string | null) => void;

        public options = {weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'};

        public setNewDeedDocumentType(newValue: string | null) {
            this.setNewDocumentType(newValue);
        }

        public setState(newValue: string | null) {
            this.setNewState(newValue);
        }

    }
</script>
