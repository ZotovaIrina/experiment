<template>
    <div class="input-error-container">
        <masked-input v-model="phoneValue"
                      mask="(111) 111-1111"
                      class="faux-input"
                      @blur.native="onBlurFunction"
                      placeholder="(XXX) XXX-XXXX"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import MaskedInput from 'vue-masked-input';

    interface PhoneProps {
        isRequired: boolean;
        title: string;
    }

    @Component({
        components: {
            MaskedInput
        }
    })
    export default class PhoneInput extends Vue {
        @Prop({default: false}) public params: PhoneProps;
        @Prop({default: null}) public data: string | null;

        public value: string | null = this.data;
        public errorMessage: string | null = 'error';

        get phoneValue(): string | null {
            return this.value;
        }

        set phoneValue(newValue: string | null) {
            this.value = newValue;
            if (newValue !== null && !newValue.includes('_')) {
                const valueWithoutMask = newValue.replace(/\D/g, '');
                if (valueWithoutMask !== this.data) {
                    this.$emit('onChange', valueWithoutMask);
                }
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