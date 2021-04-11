<template>
    <button type="button"
            class="vm-button position-relative"
            @click="emitOnClick">
            
            <div v-if="icon" class="vm-button-icon">
                <img :src="icon" alt="button icon" class="position-relative" />
            </div>

            <span v-if="text">{{ text }}</span>
    </button>
</template>

<script>
export default {
    props: {
        text: String,
        icon: String
    },
    methods: {
        emitOnClick() {
            this.$emit('onCLick');
        }
    }
}
</script>

<style>
    .vm-button {
        border: none;
        outline: none;
        height: 32px;
        border-radius: 4px;
        text-align: center;
    }

    .vm-button-icon {
        height: 32px;
        width: 32px;
        display: inline-block;
        padding: 4px;
    }

    .vm-button-icon img { height: 100%; }
</style>