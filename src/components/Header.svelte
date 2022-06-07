<script lang="ts">
	// Components
	import Searchbar from './Searchbar.svelte';

	// Stores
	import { modal } from '../stores';

	function openModal(type: string) {
		modal.set(type);
	}
</script>

<header>
	<div class="logo">
		<img src="/icon.png" alt="logo" />
		<p>INTEGRATIO</p>
	</div>
	<Searchbar />
	<div class="r-btns">
		<div class="r-btn" id="new-btn">
			<img
				src="/icons/plus-circle.svg"
				alt="New Instance Button"
				on:click={() => openModal('new')}
			/>
		</div>
		<div class="r-btn" id="help-btn">
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
