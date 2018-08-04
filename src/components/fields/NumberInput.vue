<template>
    <div class="input-error-container">
        <masked-input v-model="numberValue"
                      mask="111111111111111111111111"
                      class="faux-input"
                      :required="params.isRequired"
                      @blur.native="onBlurFunction"
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
        @Prop({default: null}) public data: string | null;

        public value: string | null = this.data;
        public errorMessage: string | null = 'error';

        get numberValue(): string | null {
            return this.value;
        }

        set numberValue(newValue: string | null) {
            this.value = newValue;
            if (newValue !== null) {
                this.$emit('onChange', newValue);
            } else if (newValue === null) {
                const errorMessage = this.params.isRequired ? this.params.title + ' cannot be blank' : null;
                this.$emit('onChange', null, errorMessage);
            }
        }

        public onBlurFunction() {
            if (this.value !== null && this.value.indexOf('_') !== -1) {
                this.$emit('onChange', null, 'Invalid ' + this.params.title.toLowerCase());
            }
        }

    }

</script>