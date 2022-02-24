<script lang="ts">
	// Import components
	import NewInstance from "./NewInstance.svelte";
	import Search from "./Search.svelte";

	// Import Search Store
	import { hideSearch } from "../../stores/NavStore.js";
	let boolHideSearch: boolean;

	hideSearch.subscribe(value => {
		boolHideSearch = value;
	});
	
	function toggleSearch() {
		hideSearch.set(!boolHideSearch);
	}

	// Import Current Instance Store
	import { currentInstance } from "../../stores/InstanceStore.js";
	
	function updateCurrentInstance(instance: string) {
		currentInstance.set(instance);
	}

	// Interfaces
	interface Method {
		id: string;
		text: string;
	}

	interface Entity {
		id: string;
		expanded: boolean;
		methods: Method[];
	}

	interface Instance {
		id: string;
		text: string;
		expanded: boolean;
		entities: Entity[];
	}

	// Current attributes
	let hideNewInstance = true;

	let instances: Instance[] = [
		{
			id: 'testaccount',
			text: 'Account Test',
			expanded: false,
			entities: [
				{
					id: 'Account',
					expanded: false,
					methods: [
						{
							id: 'getaccount',
							text: 'GET'
						},
						{
							id: 'postaccount',
							text: 'POST'
						},
						{
							id: 'patchaccount',
							text: 'PATCH'
						},
						{
							id: 'deleteaccount',
							text: 'DELETE'
						}
					]
				},
				{
					id: 'tstDetailDiscounts',
					expanded: false,
					methods: [
						{
							id: 'getaccount',
							text: 'GET'
						},
						{
							id: 'postaccount',
							text: 'POST'
						},
						{
							id: 'patchaccount',
							text: 'PATCH'
						},
						{
							id: 'deleteaccount',
							text: 'DELETE'
						}
					]
				},
				{
					id: 'tstDetailAccountBillingInfo',
					expanded: false,
					methods: [
						{
							id: 'getaccount',
							text: 'GET'
						},
						{
							id: 'postaccount',
							text: 'POST'
						},
						{
							id: 'patchaccount',
							text: 'PATCH'
						},
						{
							id: 'deleteaccount',
							text: 'DELETE'
						}
					]
				}
			]
		}
	];
</script>

<div class:hide={hideNewInstance}>
	<NewInstance />
</div>


<div class="container">
	<div class="header">
		<p>INSTANCES</p>
		<div class="search" on:click={toggleSearch} />
		<div class="new" on:click={() => hideNewInstance = !hideNewInstance} />

		<div class:hide={boolHideSearch}>
			<Search />
		</div>
	</div>
	<div class="content">
		{#each instances as instance}
			<div class="root" id={instance.id} on:click={() => updateCurrentInstance(instance.text)}>
				<div class="text-container" on:click={() => (instance.expanded = !instance.expanded)}>
					<div class="chevron" class:expanded={instance.expanded} />
					<p>{instance.text}</p>
				</div>
				{#if instance.expanded}
					{#each instance.entities as entity}
						<div
							class="entity"
							id={entity.id}
							on:click={() => (entity.expanded = !entity.expanded)}
						>
							<div class="text-container">
								<div class="chevron" class:expanded={entity.expanded} />
								<p>{entity.id}</p>
							</div>
							{#if entity.expanded}
								{#each entity.methods as method}
									<div class="method" id={method.id}>
										<div class="circle" />
										<p class={method.text.toLowerCase()}>{method.text}</p>
									</div>
								{/each}
							{/if}
						</div>
					{/each}
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		width: 90%;
		height: 44%;
		background-color: var(--darker-secondary);
		margin-top: 15px;
		overflow: hidden;
	}

	/* Header */
	.header {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		font-family: var(--font-family);
		color: var(--text);
		border-bottom: 4px solid var(--secondary);
		flex: 0 1 auto;
	}

	.header p {
		margin-left: 10px;
		user-select: none;
	}

	.header div.search {
		width: 20px;
		height: 20px;
		background-image: url('../../static/search.svg');
		background-size: cover;
		margin-right: 5px;
		margin-left: auto;
	}

	.header div.search:hover {
		opacity: 0.6;
		cursor: pointer;
	}

	.header div.new {
		width: 20px;
		height: 20px;
		background-image: url('../../static/plus-square.svg');
		background-size: cover;
		margin-right: 10px;
		margin-left: 5px;
		z-index: 7;
	}

	.header div.new:hover {
		opacity: 0.6;
		cursor: pointer;
	}

	/* Content */
	.content {
		overflow-x: hidden;
		overflow-y: auto;
		flex: 1 1 auto;
		height: 90%;
	}

	/* Scrollbar */
	.content::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: var(--darker-secondary);
	}

	.content::-webkit-scrollbar {
		width: 12px;
		background-color: var(--darker-secondary);
	}

	.content::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: var(--primary);
	}

	/* Root */
	.root {
		padding: 0 15px;
		font-family: var(--font-family);
		color: var(--text);
		margin-top: 10px;
	}
	.root > .text-container:hover > p {
		opacity: 0.6;
	}

	.root:last-child {
		margin-bottom: 15px;
	}

	/* Text Container */
	.text-container {
		display: flex;
		height: 20px;
		align-items: center;
	}

	.text-container p {
		transform: translateY(-1px);
		user-select: none;
	}

	/* Entity */
	.entity {
		margin-left: 24px;
		margin-top: 5px;
	}

	.entity > .text-container:hover > p {
		opacity: 0.6;
	}

	/* Method */
	.method {
		margin-top: 5px;
		display: flex;
		align-items: center;
		margin-left: 30px;
	}

	.method p {
		margin: 0;
		user-select: none;
		font-weight: 600;
	}

	.method p.get {
		color: rgb(96, 177, 96);
	}

	.method p.post {
		color: orange;
	}

	.method p.patch {
		color: rgb(197, 197, 197);
	}

	.method p.delete {
		color: rgb(238, 101, 101);
	}

	.method:hover p {
		opacity: 0.6;
	}

	/* Chevron */
	.chevron {
		width: 18px;
		height: 18px;
		background-image: url('../../static/chevron-right.svg');
		background-size: cover;
		margin-right: 6px;
		transition: 0.2s;
	}

	.chevron.expanded {
		transform: rotate(90deg);
	}

	/* Circle */
	.circle {
		width: 6px;
		height: 6px;
		background-image: url('../../static/circle.svg');
		background-size: cover;
		margin-right: 6px;
		transform: translateY(1px);
	}

	/* Utility */
	.hide {
		display: none;
	}
</style>
