
<header>
    <img alt="Logo" class="logo" src="../../static/icon.png" />
    <h1>INTEGRATIO</h1>
    <img alt="Help Button" class="help" src="../../static/help-circle.svg" />
</header>

<style>
    header {
        background-color: var(--primary);
        height: 46px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
    }

    .logo {
        width: 36px;
        margin-left: 11px;
        user-select: none;
        -webkit-user-drag: none;
    }

    h1 {
        margin-left: 10px;
        color: var(--text);
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 1.5em;
        user-select: none;
    }

    .help {
        margin-left: auto;
        margin-right: 11px;
        cursor: pointer;
    }

    .help:hover {
        opacity: 0.5;
    }
</style>