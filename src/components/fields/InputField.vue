<template>
    <div>
        <span>{{labelText}}</span>
        <component v-bind:is="fieldComponent"
                   @onChange="setValue"
                   :inputValue="inputValue"
                   :params="fieldParams"></component>
        <span>{{errorMessage}}</span>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import PhoneInput from '@/components/fields/PhoneInput.vue';
    import CalendarInput from '@/components/fields/CalendarInput.vue';
    import SelectOption from '@/components/fields/SelectOption.vue';
    import CurrencyInput from '@/components/fields/CurrencyInput.vue';

    interface InputParams {
        isRequired: boolean;
        label: string;
        type: string;
        inputValue: any;
    }

    @Component({
        components: {
            CalendarInput,
            SelectOption,
            CurrencyInput
        }
    })
    export default class InputField extends Vue {
        @Prop() public params: InputParams;
        @Prop() public inputValue: any;

        public errorMessage: string | null = '';

        get labelText() {
            return this.params.isRequired ? this.params.label + ' *' : this.params.label;
        }

        get fieldComponent() {
            const componentMap = {
                phone: PhoneInput,
                calendar: CalendarInput,
                selectOption: SelectOption,
                currency: CurrencyInput
            };
            return componentMap[this.params.type];
        }

        get fieldParams() {
            return this.params;
        }

        public setValue(value: any) {
            console.log('InputField', value);
            this.$emit('onChange', value);
        }
    }

</script>