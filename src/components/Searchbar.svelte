<div>
	<input type="text" placeholder="&#x1F50E;&#xFE0E;" />
	<button type="button">Search</button>
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
		width: 90%;
		margin-right: 0;
	}

	input::placeholder {
		color: #dfdfdf;
	}

	input:focus {
		outline: none;
	}

	button {
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
	}
</style>
