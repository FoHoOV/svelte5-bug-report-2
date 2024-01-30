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
