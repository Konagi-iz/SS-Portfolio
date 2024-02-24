<script setup>
import { ref } from 'vue';
const props = defineProps({ text: String });

const splitText = ref([...props.text.trim()]);
</script>

<template>
	<span v-for="(char, index) in splitText" :key="index" class="split-span">{{ char }}</span>
</template>

<style scoped lang="scss"></style>
