<script>
	let tree = [];
</script>

<main class={tree.length == 0 ? 'empty-treeview' : 'treeview'}>
	{#if tree.length == 0}
		<p class="empty-text">NO INSTANCES FOUND</p>
	{/if}
</main>

<style>
	main {
		height: 95%;
		width: 100%;
		background: var(--background-light);
	}

	.empty-treeview {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.empty-text {
		width: 100%;
		text-align: center;
		color: #0000007e;
	}
</style>
