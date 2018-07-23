<template>
    <div class="hello">
        <!--<h2 v-if="!!currentDate">-->
        <!--{{currentDate.toLocaleString('en-En', options)}}-->
        <!--</h2>-->
        <!--<calendar :input-date="currentDate"-->
        <!--:set-new-date="setNewDate"/>-->
        <SelectOption :options="getDeedDocumentTypes"
                      :input-value="getDeedDocumentType"
                      @changeValue="setNewDeedDocumentType"/>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Getter, Action} from 'vuex-class';
    // import Calendar from '../components/fields/Calendar';
    import SelectOption from '@/components/fields/SelectOption.vue';

    @Component({
        components: {SelectOption}
    })
    export default class Application extends Vue {
        @Getter public getDeedDocumentTypes: string[];
        @Getter public getDeedDocumentType: string;
        @Action public setNewDocumentType: (newValue: string) => void;

        public setNewDeedDocumentType(newValue: string) {
            this.setNewDocumentType(newValue);
        }

    }
</script>
