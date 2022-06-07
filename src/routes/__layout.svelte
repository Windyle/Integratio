<script lang="ts">
	// Components
	import Sidebar from '../components/Sidebar.svelte';
	import Header from '../components/Header.svelte';
	import Modal from '../components/Modal.svelte';

	// Stores
	import { modal } from '../stores';
	let modalType: string = 'none';

	modal.subscribe((value: any) => {
		modalType = value;
	});
</script>

<div class="container">
	<Sidebar />
	<Header />
	<main>
		<slot />
	</main>
</div>

{#if modalType !== 'none'}
	<Modal type={modalType} />
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

	:root {
		--font-family: 'Roboto', sans-serif;
		--primary: #29466b;
		--primary-light: #577199;
		--primary-dark: #001f40;
		--secondary: #ffa000;
		--secondary-light: #ffd149;
		--secondary-dark: #c67100;
		--background: rgb(221, 221, 221);
		--background-light: #f1f1f1;
		--background-dark: rgb(190, 190, 190);
		--text-primary: #ffffff;
		--text-secondary: #000000;
		--text-background: #3b3b3b;
	}

	:global(body) {
		overflow: hidden;
		margin: 0;
		padding: 0;
		font-family: var(--font-family);
	}

	.container {
		display: grid;
		grid-template-columns: 360px 1fr;
		grid-template-rows: 40px 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		width: 100vw;
		height: 100vh;
	}

	main {
		grid-area: 2 / 2 / 3 / 3;
		background: var(--background-light);
	}
</style>
