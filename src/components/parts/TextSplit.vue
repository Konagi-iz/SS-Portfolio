<script setup>
import { ref } from 'vue';
const props = defineProps({ text: String });

const char = ref(null);
const splitText = [...props.text.trim()];
let fixedSplitText = [];
splitText.forEach((char) => {
	if (char === ' ') {
		fixedSplitText.push('&nbsp;');
	} else {
		fixedSplitText.push(char);
	}
});

defineExpose({ char });
</script>

<template>
	<span v-for="(_char, index) in fixedSplitText" ref="char" :key="index" v-html="_char" class="split-span"></span>
</template>

<style scoped lang="scss"></style>
