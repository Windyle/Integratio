<script>
	import Treeview from './Nav/Treeview.svelte';
	import Actions from './Nav/Actions.svelte';
</script>

<nav>
	<Treeview />

	<hr />

	<Actions />
</nav>

<style>
	nav {
		background-color: var(--secondary);
		width: 350px;
		height: 100%;
		position: fixed;
		top: 35px;
		left: 0;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}

	hr {
		width: 100%;
		border-color: var(--background);
		margin: 15px 0;
	}
</style>
