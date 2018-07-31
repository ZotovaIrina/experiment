<template>
    <div class="calendar__container">
        <div class="calendar__header">
            <div v-on:click="changeMonth(monthList[month-1])">
                <img src="../../static/images/caret-back.svg"/>
            </div>
            <div class="calendar__header-text">
                <SelectOption :options="monthList"
                              :input-value="getMonthName"
                              @changeValue="changeMonth"/>
                <input v-model="year"
                       class="faux-input"/>
            </div>
            <div v-on:click="changeMonth(monthList[month+1])">
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
                 v-on:click="setValue(day, month + 1)"
                 v-bind:class="{calendar__selected: isSelectedDay(day)}"
                 class="calendar__day">
                {{day}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import SelectOption from '@/components/fields/SelectOption.vue';
    import {DateTime} from 'luxon';

    @Component({
        components: {
            SelectOption
        }
    })
    export default class Calendar extends Vue {
        @Prop({
            default() {
                return null;
            }
        }) public inputDate!: string;

        public month: number = this.getNewValues.month - 1;
        public year: number = this.getNewValues.year;
        public weakDaysList = [
            'SUN',
            'MON',
            'TUE',
            'WED',
            'THU',
            'FRI',
            'SAT'
        ];

        private monthList = [
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
        ];

        public changeMonth(monthName: string) {
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
        }

        public isSelectedDay(day: number) {
            if (this.inputDate === null) {
                return this.year === DateTime.local().year &&
                    this.month === DateTime.local().month - 1 &&
                    day === DateTime.local().day;
            } else {
                return this.year === DateTime.fromISO(this.inputDate).year &&
                    this.month === DateTime.fromISO(this.inputDate).month - 1 &&
                    day === DateTime.fromISO(this.inputDate).day;
            }
        }

        public setValue(day: number, month: number) {
            console.log('setValue', DateTime.local(this.year, month, day).toISODate());
            this.$emit('setNewDate', DateTime.local(this.year, month, day).toISODate());
        }

        get getNewValues() {
            if (DateTime.fromISO(this.inputDate).isValid) {
                return DateTime.fromISO(this.inputDate);
            } else {
                return DateTime.local();
            }
        }

        get getListOfDays() {
            console.log('this.month', this.month);
            let day: DateTime;
            const days: number[] = [];
            for (let i = 1; i <= 28; i++) {
                days.push(i);
            }
            for (let i = 29; i <= 31; i++) {
                day = DateTime.local(this.year, this.month + 1, (i));
                if (day.month - 1 === this.month) {
                    days.push(day.day);
                }
            }
            return days;
        }

        get getMonthName() {
            console.log('getMonthName');
            return this.monthList[this.month];
        }

        get firstDayWeakInMonth(): number {
            console.log('firstDayWeakInMonth');
            return DateTime.local(this.year, this.month + 1, 1).weekday;
        }


        @Watch('inputDate')
        private onPropChange() {
            this.month = this.getNewValues.month - 1;
            this.year = this.getNewValues.year;
        }
    }

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
