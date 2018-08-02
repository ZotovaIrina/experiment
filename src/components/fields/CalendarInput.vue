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
        <Calendar v-if="showCalendar"
                  :input-date="value"
                  @onChange="setValue"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {DateTime} from 'luxon';
    import MaskedInput from 'vue-masked-input';
    import Calendar from '@/components/fields/Calendar.vue';

    interface CalendarProps {
        inputValue: string | null;
        isRequired: boolean;
    }
    @Component({
        components: {
            MaskedInput,
            Calendar
        }
    })
    export default class CalendarInput extends Vue {
        @Prop({
            default() {
                return {
                    inputValue: null,
                    isRequired: false
                };
            }
        }) public params: CalendarProps;

        public showCalendar: boolean = false;
        public value: string | null = null;

        public caretdd = require('../../static/images/caret-dd.svg');

        public calendarShowTrigger() {
            this.showCalendar = !this.showCalendar;
        }

        public setValue(date: string | null) {
            this.$emit('onChange', date);
        }

        get getValue() {
            console.log('getValue');
            if (this.params.inputValue !== null && DateTime.fromISO(this.params.inputValue).isValid) {
                return DateTime.fromISO(this.params.inputValue).toFormat('MM/dd/yyyy');
            } else {
                return null;
            }
        }

        // set getValue(new) {
        //     console.log(' set getValue');
        // };

        @Watch('getValue')
        private onChangeInput() {
            console.log('onChange inputValue');
            if (this.value !== null && DateTime.fromFormat(this.value, 'MM/dd/yyyy').isValid) {
                this.setValue(DateTime.fromFormat(this.value, 'MM/dd/yyyy').toISODate());
            }
        }

    }

</script>

<style lang="scss">
    @import "../../static/scss/app";

    .calendar-input {

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
