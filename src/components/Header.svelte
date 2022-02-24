<script lang="ts">
	import { currentInstance } from "../stores/InstanceStore.js";

	let instance: string;
	currentInstance.subscribe(value => {
		instance = value;
	});
</script>

<header>
	<img alt="Logo" class="logo" src="../../static/icon-borderless.svg" />
	<h1>INTEGRATIO</h1>
	<h2>{instance}</h2>
	<img alt="Help Button" class="help" src="../../static/help-circle.svg" on:click={() => window.open('https://github.com/Windyle/Integratio/issues', '_blank').focus()} />
</header>

<style>
	header {
		background-color: var(--primary);
		height: 35px;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		display: flex;
		align-items: center;
	}

	.logo {
		width: 28px;
		margin-left: 15px;
		user-select: none;
		-webkit-user-drag: none;
	}

	h1 {
		margin-left: 10px;
		color: var(--text);
		font-family: var(--font-family);
		font-weight: 400;
		font-size: 1em;
		user-select: none;
		-webkit-user-drag: none;
		opacity: 0.8;
	}

	h2 {
		margin-left: 10px;
		color: var(--input-text);
		font-family: var(--font-family);
		font-weight: 400;
		font-size: 0.9em;
		user-select: none;
		-webkit-user-drag: none;
		transform: translateY(-1px);
	}

	.help {
		margin-left: auto;
		margin-right: 11px;
		cursor: pointer;
		-webkit-user-drag: none;
	}

	.help:hover {
		opacity: 0.5;
	}
</style>
