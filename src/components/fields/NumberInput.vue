<template>
    <div class="input-error-container">
        <input v-model="numberValue"
               class="faux-input"
               @blur="onBlurFunction"
               placeholder=""/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import MaskedInput from 'vue-masked-input';

    interface NumberProps {
        isRequired: boolean;
        title: string;
    }

    @Component({
        components: {
            MaskedInput
        }
    })
    export default class NumberInput extends Vue {
        @Prop({default: false}) public params: NumberProps;
        @Prop({default: null}) public data: number | null;

        public value: number | null = this.data ? this.data : null;
        public errorMessage: string | null = 'error';

        get numberValue(): number | null {
            return this.value;
        }

        set numberValue(newValue: number | null) {
            const newNumberValue = newValue === null ? null : newValue.toString().replace(/\D/g, '');
            if (newNumberValue === null || '') {
                const errorMessage = this.params.isRequired ? this.params.title + ' cannot be blank' : null;
                this.value = null;
                this.$emit('onChange', null, errorMessage);
            } else {
                this.value = +newNumberValue;
                this.$emit('onChange', +newNumberValue);
            }
        }

        public onBlurFunction() {

        }

    }

</script>