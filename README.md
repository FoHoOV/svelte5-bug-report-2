### Describe the bug

Lets try to rewrite this svelte 4 code to svelte 5:

--svelte 4

```
<script lang="ts">
	import { readable } from 'svelte/store';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';

	export let data: PageData; // data = [{id: 1,name: 'test-server'}, {id: 2, name: 'test-server2'}]

	const clientData = readable([
		{
			id: 1,
			name: 'test-client'
		}
	]);
</script>

{#each browser ? $clientData : data.serverData as test (test.id)}
	<h1>
		{test.name}
	</h1>
{/each}
```

--svelte5

```
<script lang="ts">
	import { readable } from 'svelte/store';
	import { browser } from '$app/environment';

	const { data } = $props(); // data = [{id: 1,name: 'test-server'}, {id: 2, name: 'test-server2'}]

	const clientData = readable([
		{
			id: 1,
			name: 'test-client'
		}
	]);
</script>

{#each browser ? $clientData : data.serverData as test (test.id)}
	<h1>
		{test.name}
	</h1>
{/each}
```

<h3>Expected Behavior</h3>:
The expected outcome is identical to the Svelte 4 version: initially displaying two `h1` elements with 'test-server' and 'test-server2', then dynamically updating the DOM to only show 'test-client' when the JavaScript loads and runs. This behavior is consistent in a Svelte 4 app (refer to tests-svelte4 and run it).

<h3>Actual Behavior in Svelte 5</h3>:
In the Svelte 5 version, the behavior differs unexpectedly. While it updates 'test-server' to 'test-client', it fails to remove 'test-server2' from the DOM.

I've created a [reproduction repo here](https://github.com/FoHoOV/svelte5-bug-report-2).

### Reproduction

1. [clone this repo](https://github.com/FoHoOV/svelte5-bug-report-2)
2. run the tests-svelte4 application to see the expected outcome
3. run the tests-svelte5 application to see the exact same code which uses `props` instead of `export data` to fail

- you might have turn on network throttling to see exactly when the update happens

### Logs

_No response_

### System Info

```shell
System:
    OS: Windows 11 10.0.22621
    CPU: (16) x64 AMD Ryzen 7 4800H with Radeon Graphics
    Memory: 21.86 GB / 31.42 GB
  Binaries:
    Node: 20.4.0 - C:\Program Files\nodejs\node.EXE
    npm: 9.7.2 - C:\Program Files\nodejs\npm.CMD
  Browsers:
    Edge: Chromium (121.0.2277.83)
    Internet Explorer: 11.0.22621.1
```

### Severity

blocking an upgrade
