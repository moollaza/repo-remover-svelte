<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { accessToken, ghRepos, ghViewer } from '$lib/state';
	import { buildRepoQuery } from '$lib/graphql';

	import DataTable from '$lib/DataTable.svelte';

	const API = 'https://api.github.com/graphql';

	let STATE = 'INIT';

	async function getRepos(accessToken: string, login: string) {
		if (!login) {
			return [];
		}

		console.log('GETTING REPOS');

		const options = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: buildRepoQuery({ login })
		};

		let res = await fetch(API, options);
		let json = await res.json();

		console.log('GH REPOS', json?.data);

		if (json?.data?.message) {
			STATE = 'ERROR';
		}

		if (json?.data?.user) {
			STATE = 'LOADED';

			$ghViewer = json?.data?.user;
			$ghRepos = json?.data?.user?.repositories;
		}
	}

	onMount(function () {
		if (!$accessToken || !$ghViewer?.login) {
			STATE = 'REDIRECTING';
			goto('/');
		} else {
			STATE = 'LOADING';
			getRepos($accessToken, $ghViewer?.login);
		}
	});
</script>

<section class="py-12">
	{#if $ghViewer?.login}
		<header class="flex items-center">
			<a href={`https://github.com/${$ghViewer.login}`}>
				<img class="mr-5 inline-block h-14 w-14 rounded-full" src={$ghViewer.avatarUrl} alt="" />
			</a>
			<h1 class="text-2xl">Hi, {$ghViewer.login}!</h1>
		</header>
	{/if}

	<div class="pt-12">
		{#if STATE === 'REDIRECTING'}
			<p>Missing credentials. Redirecting to homepage</p>
		{:else if STATE === 'LOADING'}
			<p>Fetching repos from GitHub...</p>
		{:else if STATE === 'ERROR'}
			<p>Error</p>
		{:else if STATE === 'LOADED'}
			<DataTable
				items={$ghRepos.nodes}
				columns={[
					{ label: 'Name', field: 'name' },
					{ label: 'Last Updated', field: 'updatedAt' }
				]}
			/>
		{/if}
	</div>
</section>

<style>
</style>
