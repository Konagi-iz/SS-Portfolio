<script setup>
import { ref } from 'vue';
const props = defineProps({ text: String });

const char = ref(null);
const splitText = ref([...props.text.trim()]);

defineExpose({ char });
</script>

<template>
	<span v-for="(char, index) in splitText" ref="char" :key="index" class="split-span">{{ char }}</span>
</template>

<style scoped lang="scss"></style>
