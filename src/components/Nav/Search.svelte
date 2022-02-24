<script lang="ts">
    import { hideSearch } from "../../stores/Nav.js";
    let hideSearchAttr: boolean;

	hideSearch.subscribe(value => {
		hideSearchAttr = value;
	});

    function toggleSearch() {
		hideSearch.set(!hideSearchAttr);
	}
</script>

<div class="container">
    <input type="text" id="search" placeholder="Search..." autocomplete="off">
    <div class="close-search" on:click={toggleSearch}>
        <img alt="close-search" src="../../../static/x.svg" />
    </div>
</div>

<style>
    .container {
        position: absolute;
        height: 36px;
        top: 17px;
        left: 0;
        width: 100%;
        z-index: 9;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Input */
    input {
        width: 78.5%;
        height: 100%;
        padding-left: 10px;
        background-color: var(--input-background);
        color: var(--input-text);
        border: none;
        outline: none;
    }

    input:focus {
        outline: none;
    }

    input::placeholder {
        color: var(--primary);
    }

    /* Close Button */
    .close-search {
        width: 36px;
        height: 100%;
        background-color: var(--input-background);
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .close-search:hover {
        filter: brightness(90%);
    }
</style>