<template>
    <div class="hello">
        <!--<h2 v-if="!!currentDate">-->
        <!--{{currentDate.toLocaleString('en-En', options)}}-->
        <!--</h2>-->
        <!--<calendar :input-date="currentDate"-->
        <!--:set-new-date="setNewDate"/>-->
        <SelectOption :options="getDeedDocuments"
                      :input-value="currentDeedDocumentType"
                      @changeValue="setNewDeedDocumentType"/>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    // import Calendar from '../components/fields/Calendar';
    import HelloWorld from '@/components/HelloWorld.vue';
    import SelectOption from '@/components/fields/SelectOption.vue';
    import {DeedDocumentEnum} from '../store/enams/DeedDocumentType';

    @Component({
        components: {SelectOption}
    })
    export default class Application extends Vue {

        public setNewDeedDocumentType(newValue: string) {
            this.$store.dispatch('setNewDocumentType', newValue);
        }

        get getDeedDocuments(): string[] {
            return this.$store.getters.getDeedDocumentTypes;
        }

        get currentDeedDocumentType(): string {
            return this.$store.getters.getDeedDocumentType;
        }


    }
</script>

<!--import Calendar from '../components/fields/Calendar';-->
<!--import SelectOption from '../components/fields/SelectOption';-->
<!--import deedDocumentTypes, {default as DeedDocumentType} from '../store/enams/DeedDocumentType';-->

<!--export default {-->
<!--name: 'HelloWorld',-->
<!--components: {-->
<!--Calendar,-->
<!--SelectOption-->
<!--},-->
<!--data() {-->
<!--return {-->
<!--msg: 'Welcome to Your Vue.js App',-->
<!--options: {weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'},-->
<!--deedDocumentTypes-->
<!--};-->
<!--},-->
<!--computed: {-->
<!--currentDate() {-->
<!--return this.$store.state.currentDate;-->
<!--},-->
<!--currentDeedDocumentType() {-->
<!--return this.$store.state.deedDocumentType;-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--setNewDate(newDate) {-->
<!--this.$store.commit('setNewDate', newDate);-->
<!--},-->
<!--setNewDeedDocumentType(newValue) {-->
<!--this.$store.commit('setNewDocumentType', newValue);-->
<!--}-->
<!--}-->
<!--};-->
