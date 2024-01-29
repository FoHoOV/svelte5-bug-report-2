<script lang="ts">
	import { readable } from 'svelte/store';
	import { browser } from '$app/environment';

	const { data } = $props();

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
