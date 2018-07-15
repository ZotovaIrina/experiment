<template>
    <input v-model="localDate">
</template>

<script>
  export default {
    name: 'CalendarInput.vue',
    props: {
      inputDate: Date,
      setNewDate: Function
    },
    computed: {
      localDate() {
        return this.inputDate.toLocaleString('En-en');
      }
    }
  };
</script>

<style scoped>

</style>
