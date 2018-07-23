<template>
    <div class="calendar__container">
        <div class="calendar__header">
            <div v-on:click="changeMonth(monthList[month-1])">
                <img src="../../static/images/caret-back.svg"/>
            </div>
            <div class="calendar__header-text">
                <SelectOption :options="monthList"
                              :input-value="monthList[month]"
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
            <div v-for="n in firstDayWeakInMonth()"></div>
            <div v-for="day in getListOfDays()"
                 v-on:click="setValue(day)"
                 v-bind:class="{calendar__selected: isSelectedDay(day)}"
                 class="calendar__day">
                {{day}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import SelectOption from '@/components/fields/SelectOption.vue';

    @Component({
        components: {
            SelectOption
        }
    })
    export default class Calendar extends Vue {
        @Prop({
            default() {
                return new (Date)();
            }
        }) public inputDate!: Date;

        public month: number = this.inputDate.getMonth();
        public year: number = this.inputDate.getFullYear();
        public day: number = this.inputDate.getDate();

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

        private weakDaysList = [
            'SUN',
            'MON',
            'TUE',
            'WED',
            'THU',
            'FRI',
            'SAT'
        ];

        public firstDayWeakInMonth() {
            return new Date(this.year, this.month, 1).getDay();
        }

        public getListOfDays() {
            let day: Date;
            const days: number[] = [];
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
            return this.year === this.inputDate.getFullYear() &&
                this.month === this.inputDate.getMonth() &&
                day === this.inputDate.getDate();
        }

        public setValue(day: number | null) {
            if (day === null) {
                this.$emit('setNewDate', null);
            } else {
                this.$emit('setNewDate', new Date(this.year, this.month, day));
            }

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
