<script lang="ts">
  let filepath;
  let instanceName;

  function loadInstanceStructure() {
    //     const instanceStructure = fs.readFileSync('./instance-structure.json', 'utf8');
    //     return JSON.parse(instanceStructure);
    // }
    // function validateFilePath(filepath: string) {
    //     filepath = filepath.replace(/\\/g, '/');
    //     if (!filepath) {
    //         throw new Error('Filepath is required');
    //     }
    //     if (!fs.existsSync(filepath)) {
    //         throw new Error('Filepath does not exist');
    //     }
    //     if (!fs.existsSync(filepath + '/Terrasoft.WebApp')) {
    //         throw new Error('Filepath does not exist');
    //     }
  }
</script>

<div class="overlay" />
<div class="container">
  <input
    bind:value={instanceName}
    type="text"
    id="instance-name"
    placeholder="Instance Name"
  />
  <input
    bind:value={filepath}
    type="text"
    id="instance-path"
    placeholder="Instance Root Folder Path"
  />
  <button type="button" id="add-instance">Add Instance</button>
</div>
<div class="tail" />

<style>
  .container {
    width: 300px;
    height: 150px;
    background-color: var(--primary);
    position: absolute;
    left: 50px;
    top: 34px;
    border-radius: 5px;
    border-top-right-radius: 0;
    z-index: 8;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tail {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 15px 18px;
    border-color: transparent transparent transparent var(--primary);
    position: absolute;
    left: 350px;
    top: 34px;
    z-index: 8;
  }

  .overlay {
    width: 100%;
    height: 100%;
    background-color: var(--background);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 6;
    opacity: 0.4;
  }

  /* Input */
  input:first-child {
    margin-top: 15px;
  }

  input {
    width: 85%;
    margin-top: 10px;
    height: 30px;
    border-radius: 5px;
    border: none;
    padding-left: 10px;
    background-color: var(--input-background);
    color: var(--input-text);
  }

  input:focus {
    outline: 2px solid var(--input-text);
  }

  input::placeholder {
    color: var(--primary);
  }

  /* Button */
  button {
    width: 60%;
    margin-top: 10px;
    height: 30px;
    background-color: var(--secondary);
    color: var(--text);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--darker-secondary);
  }
</style>
