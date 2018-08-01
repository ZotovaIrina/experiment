<template>
    <div class="input-error-container">
        <money v-model="currencyValue" v-bind="moneyConfig"></money> {{currencyValue}}
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import { VMoney, Money } from 'v-money';
    import Calendar from '@/components/fields/Calendar.vue';

    @Component({
        components: {
            Money,
            Calendar
        },
        directives: {
            VMoney
        }
    })
    export default class CurrencyInput extends Vue {
        @Prop({
            default() {
                return null;
            }
        }) public inputValue: string | null;

        public value: string = '';
        public moneyConfig = {
            decimal: '.',
            thousands: ',',
            prefix: '',
            suffix: '',
            precision: 2,
            masked: false
        };

        get currencyValue(): string | null {
            return this.value;
        }

        set currencyValue(newValue: string | null) {
            if (newValue === null) {
                this.value = '';
            } else {
                this.value = newValue;
            }
            if (newValue !== null) {
                // const valueWithoutMask = newValue.replace(/\D/g, '');
                // console.log('emit', valueWithoutMask);
                if (newValue !== this.inputValue) {
                    this.$emit('changePhoneValue', newValue);
                }
            } else if (newValue === null && newValue !== this.inputValue) {
                this.$emit('changePhoneValue', null);
            }
        }

    }

</script>