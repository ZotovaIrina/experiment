<template>
    <div class="input-error-container">
        <money v-model="currencyValue"
               :required="params.isRequired"
               v-bind="moneyConfig"></money> {{currencyValue}}
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import { VMoney, Money } from 'v-money';

    interface CurrencyProps {
        inputValue: string | null;
        isRequired: boolean;
    }
    @Component({
        components: {
            Money
        }
    })
    export default class CurrencyInput extends Vue {
        @Prop({
            default() {
                return null;
            }
        }) public params: CurrencyProps;

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
                if (newValue !== this.params.inputValue) {
                    this.$emit('onChange', newValue);
                }
            } else if (newValue === null && newValue !== this.params.inputValue) {
                this.$emit('onChange', null);
            }
        }

    }

</script>