<template>
    <div class="input-error-container">
        <masked-input v-model="phoneValue"
                      mask="(111) 111-1111"
                      class="faux-input"
                      placeholder="(XXX) XXX-XXXX"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import MaskedInput from 'vue-masked-input';
    import Calendar from '@/components/fields/Calendar.vue';

    @Component({
        components: {

            MaskedInput,
            Calendar
        }
    })
    export default class PhoneInput extends Vue {
        @Prop({
            default() {
                return null;
            }
        }) public inputValue: string | null;

        public value: string | null = this.inputValue;

        get phoneValue(): string | null {
            console.log('get phoneValue');
            return this.value;
        }

        set phoneValue(newValue: string | null) {
            console.log('setter', newValue);
            this.value = newValue;
            if (newValue !== null && !newValue.includes('_')) {
                const valueWithoutMask = newValue.replace(/\D/g, '');
                console.log('emit', valueWithoutMask);
                if (valueWithoutMask !== this.inputValue) {
                    this.$emit('changePhoneValue', valueWithoutMask);
                }
            } else if (newValue === null && newValue !== this.inputValue) {
                this.$emit('changePhoneValue', null);
            }
        }

    }

</script>