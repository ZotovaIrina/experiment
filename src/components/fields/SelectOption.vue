<template>
    <div class="select-input">
        <div class="substrate"
             :class="{'select-input__hide': hideOptionsList}"
             v-on:click="optionsListTrigger"></div>

        <div class="input-error-container">
            <input :placeholder="params.placeHolder"
                   :value="params.inputValue"
                   :required="params.isRequired"
                   v-on:click="optionsListTrigger"
                   class="faux-input"/>
            <img :src="caretdd"
                 class="select-input__select-arrow"
                 :class="{'select-input__open-list': !hideOptionsList}"/>
        </div>
        <div class="select-input__list-container"
             :class="{'select-input__hide': hideOptionsList}">
            <div v-show="params.emptyValue"
                 class="select-input__placeholder"
                 v-on:click="optionClick(null)">{{params.placeHolder}}
            </div>
            <div v-for="option in params.options"
                 v-on:click="optionClick(option)"
                 class="select-input__item">{{option}}
            </div>
        </div>
    </div>
</template>


<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';

    interface SelectOptionProps {
        inputValue: string | null;
        isRequired: boolean;
        options: string[];
        placeHolder: string;
        emptyValue: boolean;
    }

    @Component({})
    export default class SelectOption extends Vue {
        @Prop({
            default: {
                inputValue: null,
                isRequired: false,
                options: [],
                placeHolder: 'Select',
                emptyValue: true
            }
        }) public params: SelectOptionProps;

        public hideOptionsList: boolean = true;

        public caretdd = require('../../static/images/caret-dd.svg');

        public optionsListTrigger() {
            this.hideOptionsList = !this.hideOptionsList;
        }

        public optionClick(newValue: string) {
            this.optionsListTrigger();
            this.$emit('onChange', newValue);
        }
    }

</script>

<style lang="scss">
    @import "../../static/scss/app";

    .select-input {

        position: relative;
        display: grid;

        .substrate {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .placeholder {
            font-family: "Gotham-Book";
            font-size: $normal-text;
            color: $grey
        }

        &__list-container {
            position: absolute;
            top: 56px;
            width: 100%;
            z-index: 2;
            border: 1px solid $smoke;
            background-color: white;
            height: 200px;
            overflow-y: auto;
            box-sizing: border-box;
            cursor: pointer;
            box-shadow: 0 6px 12px 0 rgba(229, 229, 229, 0.5);
        }

        &__item {
            font-family: "Gotham-Book";
            font-size: $normal-text;
            padding: 8px 14px;
            height: $normal-text;
            text-align: start;
        }

        &__placeholder {
            font-family: "Gotham-Book";
            font-size: $normal-text;
            text-align: start;
            color: $grey;
            padding: 8px 14px;
            height: $normal-text;
        }

        &__item:hover {
            background-color: $spruce-primary;
            color: white;
        }

        &__placeholder:hover {
            background-color: $spruce-primary;
            color: white;
        }

        &__hide {
            display: none;
        }

        &__select-arrow {
            position: absolute;
            height: 6px;
            top: 50%;
            margin-top: -3px;
            right: 8px;
            z-index: 0;
            transform: rotate(180deg);
        }

        &__open-list {
            transform: rotate(0deg);
            transition-duration: 0.2s;
            transition-property: transform;
        }
    }

    .input_cell__error {
        .select-input__select-arrow {
            right: 32px;
            transition: right 0.2s ease;
        }
    }
</style>
