<template>
    <div class="array-field">
        <div class="array-field__fields">
            <GroupField v-for="(item, index) in data"
                        :params="{
                            fields: params.fields,
                            title: getItemTitle(index + 1)
                        }"
                        :data="{}"
                        @onChange="onChange(index)" />
        </div>
        <a @click="addItem()">Add</a>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import GroupField from '@/components/fields/GroupField.vue';

    interface ArrayParams {
        title: string | null;
        itemTitle: string;
        fields: any;
    }

    @Component({
        components: {
            GroupField: () => Promise.resolve(GroupField)
        }
    })
    export default class ArrayField extends Vue {
        @Prop() public params: ArrayParams;
        @Prop({
            default() {
                return [];
            }
        }) public data: any[];

        constructor() {
            super();
            console.log('ArrayField');
        }

        public getItemTitle(index: number) {
            return this.params.itemTitle.replace('$index', index.toString());
        }

        public addItem() {
            this.data.push({});
        }

        public onChange(index) {
            return (payload: any) => console.log('change', index, payload);
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