<template>
    <div class="input-error-container">
        <money v-model="currencyValue"
               v-bind="moneyConfig"></money>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import { VMoney, Money } from 'v-money';

    interface CurrencyProps {
        isRequired: boolean;
        title: string;
    }
    @Component({
        components: {
            Money
        }
    })
    export default class CurrencyInput extends Vue {
        @Prop({default: null}) public params: CurrencyProps;
        @Prop({default: null}) public data: number | null;

        public value: number = 0;
        public moneyConfig = {
            decimal: '.',
            thousands: ',',
            prefix: '',
            suffix: '',
            precision: 2,
            masked: false
        };

        get currencyValue(): number | null {
            return this.value;
        }

        set currencyValue(newValue: number | null) {
            if (newValue === null || 0) {
                this.value = 0;
            } else {
                this.value = newValue;
            }
            if (newValue !== null) {
                if (newValue !== this.data) {
                    this.$emit('onChange', newValue, null);
                }
            } else {
                const errorMessage = this.params.isRequired ? this.params.title + ' cannot be blank' : null;
                if (newValue !== this.data) {
                    this.$emit('onChange', null, errorMessage);
                }
            }
        }

    }

</script>