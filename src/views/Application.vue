<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>
            {{currentDate.toLocaleString('en-En', options)}}
        </h2>
        <calendar :input-date="currentDate"
                  :set-new-date="setNewDate"/>
        <select-option :options="deedDocumentTypes"
                       :input-value="currentDeedDocumentType"
                       :change-value="setNewDeedDocumentType"
                       :empty-value="true"
                       :place-holder="'Select'"/>
    </div>
</template>

<script>
  import Calendar from '../components/fields/Calendar';
  import SelectOption from '../components/fields/SelectOption';
  import deedDocumentTypes from '../store/enams/deedDocumentType';

  export default {
    name: 'HelloWorld',
    components: {
      Calendar,
      SelectOption
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        options: {weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'},
        deedDocumentTypes
      };
    },
    computed: {
      currentDate() {
        return this.$store.state.currentDate;
      },
      currentDeedDocumentType() {
        return this.$store.state.deedDocumentType;
      }
    },
    methods: {
      setNewDate(newDate) {
        this.$store.commit('setNewDate', newDate);
      },
      setNewDeedDocumentType(newValue) {
        this.$store.commit('setNewDocumentType', newValue);
      }
    }
  };
</script>
