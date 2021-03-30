<template>
    <button type="button"
            class="header-filters_randomize-btn position-relative"
            @click="$emit('onCLick')">
            
            <div v-if="icon" class="button-icon">
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
    }
}
</script>

<style>
    .button-icon {
        height: 32px;
        width: 32px;
        display: inline-block;
        padding: 4px;
    }

    .button-icon img { height: 100%; }
</style>