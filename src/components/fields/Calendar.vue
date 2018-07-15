<template>
    <div class="calendar__container">
        <div class="calendar__header">
            <div v-on:click="changeMonth(month -1)">
                <img src="../../static/images/caret-back.svg"/>
            </div>
            <div class="calendar__header-text">
                <select-option :options="monthList"
                               :input-value="monthList[month]"
                               :change-value="changeMonth"/>
                <input v-model="year"
                       class="faux-input"/>
            </div>
            <div v-on:click="changeMonth(month + 1)">
                <img src="../../static/images/caret-back.svg"
                     class="calendar__button-next"/>
            </div>
        </div>
        <div class="calendar__content">
            <div v-for="day in weakDaysList"
                 class="calendar__weak-day">
                {{day}}
            </div>
            <div v-for="n in firstDayWeakInMonth"></div>
            <div v-for="day in getListOfDays"
                 v-on:click="setValue(day)"
                 v-bind:class="{calendar__selected: isSelectedDay(day)}"
                 class="calendar__day">
                {{day}}
            </div>
        </div>
    </div>
</template>

<script>
  import SelectOption from './SelectOption';

  export default {
    components: {
      SelectOption
    },

    props: {
      inputDate: Date,
      setNewDate: Function
    },
    data() {
      return {
        monthList: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        weakDaysList: [
          'SUN',
          'MON',
          'TUE',
          'WED',
          'THU',
          'FRI',
          'SAT'
        ],
        month: this.inputDate.getMonth(),
        year: this.inputDate.getFullYear(),
        day: this.inputDate.getDate()
      };
    },
    computed: {
      firstDayWeakInMonth() {
        return new Date(this.year, this.month, 1).getDay();
      },
      getListOfDays() {
        let day;
        const days = [];
        for (let i = 1; i <= 28; i++) {
          days.push(i);
        }
        for (let i = 29; i <= 31; i++) {
          day = new Date(this.year, this.month, (i));
          if (day.getMonth() === this.month) {
            days.push(day.getDate());
          }
        }
        return days;
      }
    },
    methods: {
      changeMonth(monthName) {
        const month = this.monthList.indexOf(monthName);
        switch (month) {
          case 12:
            this.month = 0;
            this.year = this.year + 1;
            break;
          case -1:
            this.month = 11;
            this.year = this.year - 1;
            break;
          default:
            this.month = month;
        }
      },
      isSelectedDay(day) {
        return this.year === this.inputDate.getFullYear() &&
          this.month === this.inputDate.getMonth() &&
          day === this.inputDate.getDate();
      },
      setValue(day) {
        this.setNewDate(new Date(this.year, this.month, day));
      }
    }
  };
</script>
<style lang="scss">
    @import "../../static/scss/app";

    .calendar {

        .substrate {
            position: fixed;
            background-color: rgba($grey, 0.5);
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            display: grid;
            justify-content: center;
            align-items: center;
        }

        .placeholder {
            color: $grey;
        }

        &__hide {
            display: none !important;
        }

        &__container {
            width: 450px;
            padding-top: $gap;
        }

        &__header {
            display: grid;
            justify-content: space-between;
            grid-template-columns: auto auto auto;
            align-items: center;
            padding: $gap;
        }
        &__header-text {
            display: grid;
            grid-template-columns: auto auto;
            column-gap: $gap;
        }

        &__content {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            padding: $gap;
            text-align: center;
        }

        &__weak-day {
            font-weight: bold;
            text-transform: uppercase;
        }

        &__day {
            height: 40px;
            line-height: 40px;
        }
        &__day:hover {
            background-color: $spruce-primary;
            color: white;
        }

        &__selected {
            background-color: $spruce-primary;
            color: white;
        }

        &__button-next {
            transform: rotate(180deg);
        }

        .space-between {
            display: flex;
            justify-content: space-between;
        }

    }

</style>
