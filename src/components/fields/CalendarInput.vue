<template>
    <div>
        <div class="input-error-container">
            <masked-input :value="getValue"
                          mask="11/11/1111"
                          class="faux-input"
                          :required="params.isRequired"
                          placeholder="MM/DD/YYYY"/>
            <img :src="caretdd"
                 class="calendar-input__close"
                 :class="{'calendar-input__open': !showCalendar}"
                 @click="calendarShowTrigger"/>
        </div>
        <div v-if="showCalendar" class="calendar__substrate">
            <div class="calendar__container">
                <div class="calendar__header">
                    <div v-on:click="switchMonth(month-1)">
                        <img src="../../static/images/caret-back.svg"/>
                    </div>
                    <div class="calendar__header-text">
                        <SelectOption :params="{
                                        data:getMonthName,
                                        options: monthList,
                                        emptyValue: false}"
                                      @onChange="changeMonth"/>
                        <input v-model="yearValue"
                               class="faux-input"/>
                    </div>
                    <div v-on:click="switchMonth(month+1)">
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
                         v-on:click="setCalendarValue(day, month + 1)"
                         v-bind:class="{calendar__selected: isSelectedDay(day)}"
                         class="calendar__day">
                        {{day}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {DateTime, Info} from 'luxon';
    import MaskedInput from 'vue-masked-input';
    import SelectOption from '@/components/fields/SelectOption.vue';

    interface CalendarProps {
        isRequired: boolean;
    }

    @Component({
        components: {
            MaskedInput,
            SelectOption
        }
    })
    export default class CalendarInput extends Vue {
        @Prop({
            default() {
                return {
                    data: null,
                    isRequired: false
                };
            }
        }) public params: CalendarProps;
        @Prop({default: null}) public data: string | null;

        public showCalendar: boolean = false;
        public value: string | null = null;
        public monthList = Info.months('long');
        public weakDaysList = Info.weekdays('short');
        public month: number = this.getNewValues.month - 1;
        public year: number = this.getNewValues.year;

        public caretdd = require('../../static/images/caret-dd.svg');

        public calendarShowTrigger() {
            this.showCalendar = !this.showCalendar;
        }

        public setValue(date: string | null) {
            this.$emit('onChange', date);
        }

        public switchMonth(month: number) {
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

        public changeMonth(monthName: string) {
            this.switchMonth(this.monthList.indexOf(monthName));
        }

        get getNewValues() {
            if (this.data !== null && DateTime.fromISO(this.data).isValid) {
                return DateTime.fromISO(this.data);
            } else {
                return DateTime.local();
            }
        }

        get getMonthName() {
            return this.monthList[this.month];
        }

        get firstDayWeakInMonth(): number {
            return DateTime.local(this.year, this.month + 1, 1).weekday;
        }

        get getListOfDays() {
            console.log('this.month', this.month);
            let day: DateTime;
            const days: number[] = [];
            for (let i = 1; i <= 28; i++) {
                days.push(i);
            }
            for (let i = 29; i <= 31; i++) {
                day = DateTime.local(this.yearValue, this.month + 1, (i));
                if (day.month - 1 === this.month) {
                    days.push(day.day);
                }
            }
            return days;
        }

        get yearValue() {
            console.log('get yearValue', this.year);
            return this.year;
        }

        set yearValue(newYear: number) {
            console.log('set yearValue', newYear);
            if (newYear > 1500) {
                this.year = newYear;
            }
        }

        public isSelectedDay(day: number) {
            if (this.data === null) {
                return this.year === DateTime.local().year &&
                    this.month === DateTime.local().month - 1 &&
                    day === DateTime.local().day;
            } else {
                return this.year === DateTime.fromISO(this.data).year &&
                    this.month === DateTime.fromISO(this.data).month - 1 &&
                    day === DateTime.fromISO(this.data).day;
            }
        }

        public setCalendarValue(day: number, month: number) {
            this.calendarShowTrigger();
            this.$emit('onChange', DateTime.local(this.year, month, day).toISODate());
        }

        get getValue() {
            console.log('getValue');
            if (this.data !== null && DateTime.fromISO(this.data).isValid) {
                return DateTime.fromISO(this.data).toFormat('MM/dd/yyyy');
            } else {
                return null;
            }
        }

        @Watch('getValue')
        private onChangeInput() {
            if (this.value !== null && DateTime.fromFormat(this.value, 'MM/dd/yyyy').isValid) {
                this.setValue(DateTime.fromFormat(this.value, 'MM/dd/yyyy').toISODate());
            }
        }

    }

</script>

<style lang="scss">
    @import "../../static/scss/app";

    .calendar__substrate {
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

    .calendar {

        &__container {
            width: 450px;
            background-color: white;
            border: 1px solid $light-grey;
            box-shadow: 0 2px 2px 0 $light-grey;
            padding: 24px 16px;
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

    .calendar-input {

        .placeholder {
            color: $grey;
        }

        &__hide {
            display: none !important;
        }

        &__close {
            position: absolute;
            height: 6px;
            top: 50%;
            margin-top: -3px;
            right: 8px;
            z-index: 0;
            transform: rotate(0deg);
        }

        &__open {
            transform: rotate(180deg);
            transition-duration: 0.2s;
            transition-property: transform;
        }

    }

</style>
