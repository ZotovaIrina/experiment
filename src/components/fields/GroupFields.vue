<template>
    <div class="group-fields"
         :class="{'group-fields--row': params.layout === 'row'}">
        <span>{{params.groupTitle}}</span>
        <div class="group-fields__fields">
        <component v-for="field in fieldArray"
                   :is="getComponent(field.type === 'group')"
                   :params="field"
                   :data="getData(field.dataPath)"
                   @onChange="onChange"></component>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import InputField, {InputParams} from '@/components/fields/InputField.vue';

    interface GroupParams {
        title: string | null;
        layout: string | null;
        fields: any;
    }

    @Component({
        components: {
            InputField,
            GroupFields
        },
        name: 'GroupFields'
    })
    export default class GroupFields extends Vue {
        @Prop() public params: GroupParams;
        @Prop() public data: GroupParams;

        constructor() {
            super();
            console.log('GroupFields');
        }

        get fieldArray() {
            return this.params.fields;
        }

        public getData(dataPath) {
            return dataPath ? this.data[dataPath] : this.data;
        }

        public getComponent(isGroup){
            return isGroup ? GroupFields : InputField;
        }

        public onChange(payload: any) {
            this.$emit('onChange', payload);
        }
    }

</script>

<style lang="scss">
    .group-fields {
        $block: &;
        padding: 8px;
        border: 1px solid black;
        &__fields {
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }
        &--row {
            #{$block}__fields {
                flex-direction: row;
            }
        }
    }
</style>