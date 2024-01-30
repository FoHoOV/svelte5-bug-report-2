<script lang="ts">
	import { readable } from 'svelte/store';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';

	export let data: PageData;

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
