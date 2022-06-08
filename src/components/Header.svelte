<script lang="ts">
	// Components
	import Searchbar from './Searchbar.svelte';

	// Stores
	import { modal } from '../stores';

	function openModal(type: string) {
		modal.set(type);
	}

	async function testEndpoint() {
		let id = 'blblbl';
		let url: string = `/services/new-instance`;

		let request = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: 'plplpl' })
		});

		console.log(request);
		console.log(await request.json());
	}
</script>

<header>
	<div class="logo">
		<img src="/favicon.png" alt="logo" />
		<p>INTEGRATIO</p>
	</div>
	<Searchbar />
	<div class="r-btns">
		<div class="r-btn" id="new-btn" on:click={() => openModal('new')}>
			<img src="/icons/plus-circle.svg" alt="New Instance Button" />
		</div>
		<div class="r-btn" id="help-btn" on:click={() => testEndpoint()}>
			<img src="/icons/help-circle.svg" alt="Help Button" />
		</div>
	</div>
</header>

<style>
	header {
		background: var(--primary);
		grid-area: 1 / 1 / 2 / 3;
		display: flex;
		align-items: center;
		justify-content: start;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: start;
		padding-left: 15px;
		height: 100%;
		width: 30%;
		cursor: default;
		user-select: none;
	}

	.logo > img {
		height: 75%;
	}

	.logo > p {
		color: var(--text-primary);
		margin-left: 10px;
	}

	.r-btns {
		margin-right: 10px;
		margin-left: auto;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		height: 100%;
	}

	.r-btn {
		margin-left: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 100%;
		user-select: none;
		cursor: pointer;
	}

	.r-btn:hover {
		background: #ffffff33;
	}

	.r-btn:active {
		background: #ffffff11;
	}
</style>
