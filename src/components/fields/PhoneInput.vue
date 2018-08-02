<template>
    <div class="input-error-container">
        <masked-input v-model="phoneValue"
                      mask="(111) 111-1111"
                      class="faux-input"
                      :required="params.isRequired"
                      placeholder="(XXX) XXX-XXXX"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import MaskedInput from 'vue-masked-input';

    interface PhoneProps {
        isRequired: boolean;
    }

    @Component({
        components: {
            MaskedInput
        }
    })
    export default class PhoneInput extends Vue {
        @Prop({default: false}) public params: PhoneProps;
        @Prop({default: null}) public inputValue: string | null;

        public value: string | null = this.inputValue;
        public errorMessage: string | null = 'error';

        get phoneValue(): string | null {
            return this.value;
        }

        set phoneValue(newValue: string | null) {
            this.value = newValue;
            if (newValue !== null && !newValue.includes('_')) {
                const valueWithoutMask = newValue.replace(/\D/g, '');
                if (valueWithoutMask !== this.inputValue) {
                    this.$emit('onChange', valueWithoutMask);
                }
            } else if (newValue === null && newValue !== this.inputValue) {
                this.$emit('onChange', null);
            }
        }

    }

</script>