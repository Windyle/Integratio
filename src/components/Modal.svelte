<script lang="ts">
	export let title: string = 'Modal';
	export let confirmButton: boolean = false;
</script>

<div class="modal-overlay" />
<div class="modal">
	<div class="modal-header">
		<h1>{title}</h1>
		<div class="close-modal">
			<img src="/icons/x.svg" alt="Close Modal Icon" />
		</div>
	</div>
	<div class="modal-body">Placeholder</div>
	<div class="modal-footer">
		{#if confirmButton}
			<button class="confirm" type="button">CONFIRM</button>
		{/if}
		<button class="cancel" type="button">CANCEL</button>
	</div>
</div>

<style>
	.modal-overlay {
		z-index: 4;
		width: 100vw;
		height: 100vh;
		background: #00000079;
		position: absolute;
		top: 0;
		left: 0;
	}

	.modal {
		z-index: 5;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 30%;
		height: 70%;
		border-radius: 10px;
		background: var(--background);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 65px 1fr 65px;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.modal-header {
		grid-area: 1 / 1 / 2 / 2;
		display: flex;
		align-items: center;
		border-bottom: 2px solid var(--background-dark);
	}

	.modal-header > h1 {
		font-size: 20pt;
		margin-left: 20px;
		margin-right: auto;
		user-select: none;
	}

	.close-modal {
		margin-right: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		cursor: pointer;
		user-select: none;
	}

	.close-modal:hover {
		background-color: #ffffff99;
	}

	.close-modal:active {
		background-color: #ffffff44;
	}

	.modal-body {
		grid-area: 2 / 1 / 3 / 2;
	}

	.modal-footer {
		grid-area: 3 / 1 / 4 / 2;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		border-top: 2px solid var(--background-dark);
	}

	.confirm {
		background-color: var(--primary-light);
		color: var(--text-primary);
		font-size: 11pt;
		border: none;
		width: 120px;
		height: 40px;
		border-radius: 5px;
	}

	.cancel {
		background-color: var(--background-dark);
		color: var(--text-secondary);
		font-size: 11pt;
		border: none;
		width: 120px;
		height: 40px;
		border-radius: 5px;
	}
</style>
