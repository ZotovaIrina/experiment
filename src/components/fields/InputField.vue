<template>
    <div class="input-field">
        <span>{{titleText}}</span>
        <component v-bind:is="fieldComponent"
                   @onChange="setValue"
                   :data="data"
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
    import NumberInput from '@/components/fields/NumberInput.vue';
    import ArrayField from '@/components/fields/ArrayField.vue';
    import {FormPayload} from '../../store/searchReportStore';

    export interface InputParams {
        isRequired: boolean;
        title: string;
        type: string;
        data: any;
        dataPath: string;
    }

    @Component({
        components: {
            CalendarInput,
            SelectOption,
            CurrencyInput,
            NumberInput,
            ArrayField
        }
    })
    export default class InputField extends Vue {
        @Prop() public params: InputParams;
        @Prop() public data: any;

        public errorMessage: string | null = '';

        get titleText() {
            return this.params.isRequired ? this.params.title + ' *' : this.params.title;
        }

        get fieldComponent() {
            const componentMap = {
                phone: PhoneInput,
                calendar: CalendarInput,
                selectOption: SelectOption,
                currency: CurrencyInput,
                number: NumberInput,
                array: ArrayField
            };
            return componentMap[this.params.type];
        }

        get fieldParams() {
            return this.params;
        }

        public setValue(newValue: any, errorMessage: string | null) {
            this.errorMessage = errorMessage;
            const payload: FormPayload = {
                field: this.params.dataPath,
                data: newValue
            };
            this.$emit('onChange', payload);
        }
    }

</script>

<style lang="scss">
    .input-field {
        flex-grow: 1;
        padding: 0 8px;
        &:first-child{
            padding-left: 0;
        }
        &:last-child{
            padding-right: 0;
        }
    }
</style>