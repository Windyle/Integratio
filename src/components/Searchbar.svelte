<script lang="ts">
	let searchText: string = '';
</script>

<div>
	<input type="text" placeholder="&#x1F50E;&#xFE0E;" bind:value={searchText} />
	<button class={searchText !== '' ? 'clear-btn' : 'clear-btn no-hover'} type="button">
		{#if searchText !== ''}
			<img src="/icons/x.svg" alt="Clear Search" />
		{/if}
	</button>
	<button class="search-btn" type="button">Search</button>
</div>

<style>
	div {
		height: 26px;
		width: 45%;
		display: flex;
		align-items: center;
	}

	input {
		background: var(--primary-light);
		color: var(--text-primary);
		border: none;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		padding: 0 15px;
		height: 100%;
		width: 85%;
		margin-right: 0;
	}

	input::placeholder {
		color: #dfdfdf;
	}

	input:focus {
		outline: none;
	}

	.search-btn {
		height: 100%;
		width: 70px;
		margin-left: 0;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border: none;
		color: var(--text-primary);
		background: var(--primary-dark);
		cursor: pointer;
	}

	.search-btn:hover {
		filter: brightness(80%);
	}

	.search-btn:active {
		filter: brightness(60%);
	}

	.clear-btn {
		height: 100%;
		width: 30px;
		border: none;
		background: var(--primary-light);
		color: var(--text-primary);
		border-radius: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.clear-btn.no-hover {
		pointer-events: none;
	}

	.clear-btn:hover {
		filter: brightness(90%);
	}

	.clear-btn > img {
		filter: invert(100%);
		height: 18px;
	}
</style>
