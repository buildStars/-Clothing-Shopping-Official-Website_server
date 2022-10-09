<template>

	<router-view />

</template>

<script setup  lang="ts">
import { onMounted } from "@vue/runtime-core";
import { useManagerStore } from "./store/manager";
const store = useManagerStore();

onMounted(() => {
	store.setToken();
});
</script>

<style lang="less">
div {
	box-sizing: border-box;
}

.one-line-text {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #000;
	min-width: 375px;
	margin: 0 auto;
}

body {
	min-width: 375px;
	background-color: #f2f3f5;
	overflow: auto;
}
.auto-img {
	width: 100%;
	height: 100%;
}
</style>
