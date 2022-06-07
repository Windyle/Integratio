<script>
	import Treeview from './Treeview.svelte';
</script>

<aside>
	<Treeview />
</aside>

<style>
	aside {
		background: var(--background);
		grid-area: 2 / 1 / 3 / 2;
		display: flex;
		flex-direction: column;
		padding: 15px;
		align-items: center;
		justify-content: center;
		border-right: 1px solid rgb(170, 170, 170);
	}
</style>
