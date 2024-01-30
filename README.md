# Bug report

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

Expected Behavior:
The expected outcome is identical to the Svelte 4 version: initially displaying two <h1> elements with 'test-server' and 'test-server2', then dynamically updating the DOM to only show 'test-client' when the JavaScript loads and runs. This behavior is consistent in a Svelte 4 app (refer to tests-svelte4 and run it).

Actual Behavior in Svelte 5:
In the Svelte 5 version, the behavior differs unexpectedly. While it updates 'test-server' to 'test-client', it fails to remove 'test-server2' from the DOM.
