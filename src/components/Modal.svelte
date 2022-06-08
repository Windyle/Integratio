<script lang="ts">
	export let type: string = 'new';

	// Stores
	import { modal } from '../stores';

	function closeModal() {
		modal.set('none');
	}

	// Default settings
	let title: string = 'Modal';
	let confirmButton: boolean = false;
	let size: string = 'medium';

	// Override default settings
	switch (type) {
		case 'new':
			title = 'New Instance';
			confirmButton = true;
			size = 'small';
			break;
	}
</script>

<div class="modal-overlay" />

<div class={'modal ' + size}>
	<div class="modal-header">
		<h1>{title}</h1>
		<div class="close-modal" on:click={() => closeModal()}>
			<img src="/icons/x.svg" alt="Close Modal Icon" />
		</div>
	</div>
	<div class="modal-body">
		<!-- New Instance  !-->
		{#if type == 'new'}
			<div class="form__group field">
				<input type="input" class="form__field" placeholder="Host" name="host" id="host" required />
				<label for="host" class="form__label">Host</label>
			</div>
			<div class="form__group field">
				<input
					type="password"
					class="form__field"
					placeholder="Username"
					name="username"
					id="username"
					required
				/>
				<label for="username" class="form__label">Username</label>
			</div>
			<div class="form__group field">
				<input
					type="password"
					class="form__field"
					placeholder="Password"
					name="password"
					id="password"
					required
				/>
				<label for="password" class="form__label">Password</label>
			</div>
		{/if}
		<!-- New Instance !-->
	</div>
	<div class="modal-footer">
		{#if confirmButton}
			<button class="btn confirm" type="button">CONFIRM</button>
		{/if}
		<button class="btn cancel" type="button" on:click={() => closeModal()}>CANCEL</button>
	</div>
</div>

<style>
	/* Overlay */
	.modal-overlay {
		z-index: 4;
		width: 100vw;
		height: 100vh;
		background: #00000079;
		position: absolute;
		top: 0;
		left: 0;
	}

	/* Modal Container */
	.modal {
		z-index: 5;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 30%;
		border-radius: 10px;
		background: var(--background-light);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 65px 1fr 65px;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.large {
		height: 560px;
	}

	.medium {
		height: 460px;
	}

	.small {
		height: 360px;
	}

	/* Header */
	.modal-header {
		grid-area: 1 / 1 / 2 / 2;
		display: flex;
		align-items: center;
		border-bottom: 2px solid var(--background-dark);
	}

	.modal-header > h1 {
		font-size: 20pt;
		margin-left: 40px;
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
		background-color: #b9b9b999;
	}

	.close-modal:active {
		background-color: #aaaaaa44;
	}

	/* Body */
	.modal-body {
		grid-area: 2 / 1 / 3 / 2;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.form__group {
		position: relative;
		padding: 15px 0 0;
		width: 80%;
		margin-top: 15px;
	}

	.form__group:first-child {
		margin-top: -15px !important;
	}

	.form__field {
		font-family: inherit;
		width: 100%;
		border: 0;
		border-bottom: 2px solid #9b9b9b;
		outline: 0;
		font-size: 1.1rem;
		color: var(--text-background);
		padding: 7px 0;
		background: transparent;
		transition: border-color 0.2s;
	}
	.form__field::placeholder {
		color: transparent;
	}
	.form__field:placeholder-shown ~ .form__label {
		font-size: 1.1rem;
		cursor: text;
		top: 20px;
	}

	.form__label {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 12pt;
		color: #9b9b9b;
	}

	.form__field:focus {
		padding-bottom: 6px;
		font-weight: 700;
		border-width: 3px;
		border-color: var(--primary-light);
		/* border-image: linear-gradient(to right, var(--primary), var(--primary-light));
		border-image-slice: 1; */
	}
	.form__field:focus ~ .form__label {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 0.8rem;
		color: var(--primary-light);
		font-weight: 700;
	}

	/* reset input */
	.form__field:required,
	.form__field:invalid {
		box-shadow: none;
	}

	/* Footer */
	.modal-footer {
		grid-area: 3 / 1 / 4 / 2;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		border-top: 2px solid var(--background-dark);
	}

	.btn {
		font-size: 11pt;
		border: none;
		width: 120px;
		height: 40px;
		border-radius: 5px;
		cursor: pointer;
	}

	.confirm {
		background-color: var(--primary-light);
		color: var(--text-primary);
	}

	.confirm:hover {
		background-color: var(--primary);
	}

	.confirm:active {
		background-color: var(--primary-dark);
		outline: 3px solid var(--primary-light);
		transition: 0.05s;
	}

	.cancel {
		background-color: var(--background-dark);
		color: var(--text-secondary);
	}

	.cancel:hover {
		background-color: #9c9c9c;
	}

	.cancel:active {
		background-color: #808080;
		outline: 3px solid #9c9c9c;
		transition: 0.05s;
	}
</style>
