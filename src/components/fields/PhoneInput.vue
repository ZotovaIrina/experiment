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
        inputValue: string | null;
        isRequired: boolean;
    }

    @Component({
        components: {
            MaskedInput
        }
    })
    export default class PhoneInput extends Vue {
        @Prop({
            default: {
                inputValue: null,
                isRequired: false
            }
        }) public params: PhoneProps;

        public value: string | null = this.params.inputValue;
        public errorMessage: string | null = 'error';

        get phoneValue(): string | null {
            return this.value;
        }

        set phoneValue(newValue: string | null) {
            this.value = newValue;
            if (newValue !== null && !newValue.includes('_')) {
                const valueWithoutMask = newValue.replace(/\D/g, '');
                if (valueWithoutMask !== this.params.inputValue) {
                    this.$emit('onChange', valueWithoutMask);
                }
            } else if (newValue === null && newValue !== this.params.inputValue) {
                this.$emit('onChange', null);
            }
        }

    }

</script>