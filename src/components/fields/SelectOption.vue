<template>
    <div class="select-input">
        <div class="substrate"
             :class="{'select-input__hide': hideOptionsList}"
             v-on:click="optionsListTrigger"></div>

        <div class="input_cell__input-error-container">
            <input :placeholder="placeHolder"
                   :value="inputValue"
                   v-on:click="optionsListTrigger"
                   class="faux-input"/>
            <img :src="caretdd"
                 class="select-input__select-arrow"
                 :class="{'select-input__open-list': !hideOptionsList}"/>
        </div>
        <div class="select-input__list-container"
             :class="{'select-input__hide': hideOptionsList}">
            <div v-show="emptyValue"
                 class="select-input__placeholder"
                 v-on:click="optionClick(null)">{{placeHolder}}
            </div>
            <div v-for="option in options"
                 v-on:click="optionClick(option)"
                 class="select-input__item">{{option}}
            </div>
        </div>
    </div>
</template>


<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        props: {
            inputValue: String,
            options: Array,
            placeHolder: String,
            emptyValue: Boolean
        }
    })
    export default class SelectOption extends Vue {

        public hideOptionsList: boolean = true;

        public caretdd = require('../../static/images/caret-dd.svg');

        public optionsListTrigger() {
            this.hideOptionsList = !this.hideOptionsList;
        }

        public optionClick(newValue: string) {
            this.optionsListTrigger();
            this.$emit('changeValue', newValue);
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

        .faux-input {
            z-index: 1;
            width: 100%;
            cursor: pointer;
            color: transparent;
            text-shadow: 0px 0px 0px black;
        }

        .faux-input::placeholder {
            text-shadow: none;
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
        }

        &__placeholder {
            font-family: "Gotham-Book";
            font-size: $normal-text;
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
