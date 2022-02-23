<script lang="ts">
	interface Action {
		id: string;
		text: string;
		disabled: boolean;
	}

	let actions: Action[] = [
		{ id: 'sync', text: 'SYNC WITH PACKAGE', disabled: true },
		{ id: 'export-postman', text: 'EXPORT FOR POSTMAN', disabled: true },
		{ id: 'random-fill', text: 'RANDOM BODY FILLER', disabled: true },
		{ id: 'export-structure', text: 'EXPORT DATA STRUCTURE', disabled: true }
	];
</script>

<div class="container">
	{#each actions as action}
		<div class="button" class:disabled={action.disabled} id={action.id}><p>{action.text}</p></div>
	{/each}
</div>

<style>
	.container {
		width: 90%;
		height: 42%;
		background-color: var(--darker-secondary);
		margin-bottom: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-x: hidden;
		overflow-y: auto;
	}

	/* Scrollbar */
	.container::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: var(--darker-secondary);
	}

	.container::-webkit-scrollbar {
		width: 12px;
		background-color: var(--darker-secondary);
	}

	.container::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: var(--primary);
	}

	/* Buttons */
	.button:first-child {
		margin-top: 15px;
	}

	.button {
		width: 90%;
		height: 10%;
		margin-top: 10px;
		border: 2px solid var(--text);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text);
		font-family: var(--font-family);
		font-size: 1em;
		cursor: pointer;
	}

	.button.disabled {
		user-select: none !important;
		cursor: default;
		opacity: 0.6;
	}

	.button:hover {
		background-color: var(--secondary);
	}

	.button.disabled:hover {
		background-color: transparent;
	}

	.button p {
		user-select: none;
	}
</style>
