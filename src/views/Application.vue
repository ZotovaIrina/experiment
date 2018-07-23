<template>
    <div class="hello">
        <!--<h2 v-if="!!currentDate">-->
        <!--{{currentDate.toLocaleString('en-En', options)}}-->
        <!--</h2>-->
        <!--<calendar :input-date="currentDate"-->
        <!--:set-new-date="setNewDate"/>-->
        <SelectOption :options="getDeedDocumentTypes"
                      :input-value="getDeedDocumentType"
                      :empty-value="true"
                      :place-holder="'Select'"
                      @changeValue="setNewDeedDocumentType"/>
        <SelectOption :options="getStates"
                      :input-value="getState.name"
                      :empty-value="false"
                      :place-holder="'Select'"
                      @changeValue="setState"/>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Getter, Action} from 'vuex-class';
    // import Calendar from '../components/fields/Calendar';
    import SelectOption from '@/components/fields/SelectOption.vue';
    import {USState} from '../store/types/USState';

    @Component({
        components: {SelectOption}
    })
    export default class Application extends Vue {
        @Getter public getDeedDocumentTypes: string[];
        @Getter public getDeedDocumentType: string;
        @Action public setNewDocumentType: (newValue: string | null) => void;
        @Getter public getStates: string[];
        @Getter public getState: USState | null;
        @Action public setNewState: (newValue: string | null) => void;

        public setNewDeedDocumentType(newValue: string | null) {
            this.setNewDocumentType(newValue);
        }
        public setState(newValue: string | null) {
            this.setNewState(newValue);
        }

    }
</script>
