<div class="container">
	<div class="header">
		<p>AMBIENTI</p>
		<div class="new" />
	</div>
	<div class="content" />
</div>

<style>
	.container {
		width: 90%;
		height: 44%;
		background-color: var(--darker-secondary);
		margin-top: 15px;
	}

	/* Header */
	.header {
		width: 100%;
		height: 30px;
		display: flex;
		align-items: center;
		font-family: var(--font-family);
		color: var(--text);
		border-bottom: 4px solid var(--secondary);
	}

	.header p {
		margin-left: 10px;
		user-select: none;
	}

	.header div.new {
		width: 20px;
		height: 20px;
		background-image: url('../../static/plus-square.svg');
		background-size: cover;
		margin-right: 10px;
		margin-left: auto;
	}

	.header div.new:hover {
		opacity: 0.6;
		cursor: pointer;
	}
</style>
