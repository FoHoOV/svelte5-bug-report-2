import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		serverData: [
			{
				id: 1,
				name: 'test-server'
			},
			{
				id: 2,
				name: 'test-server2'
			}
		]
	};
}) satisfies PageServerLoad;
