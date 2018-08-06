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
        @Prop({default: null}) public data: string | null;

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
                if (newValue !== this.data) {
                    this.$emit('onChange', newValue, null);
                }
            } else {
                const errorMessage = this.params.isRequired ? this.params.title + ' cannot be blank' : null;
                this.$emit('onChange', null, errorMessage);
            }
        }

    }

</script>