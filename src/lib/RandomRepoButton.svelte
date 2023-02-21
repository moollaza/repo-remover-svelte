<script lang="ts">
	import { onMount } from 'svelte';
	import { accessToken } from '$lib/state';
	import { constants } from '$lib/constants';
	import { Octokit } from '@octokit/core';

	const authToken = $accessToken ?? constants.devToken;

	$: hasAuthToken = !!authToken;

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	let state = 'IDLE';

	let createRepos: () => Promise<{ success: boolean }>;

	async function handleClick() {
		state = 'WAITING';
		const res = await createRepos();

		if (res.success) {
			state = 'SUCCESS';
			await delay(5000);
			state = 'IDLE';
		} else {
			state = 'ERROR';
		}
	}

	onMount(async () => {
		const octokit = new Octokit({
			auth: authToken,
			userAgent: 'RepoRemover'
		});

		async function createRandomRepo() {
			await delay(10);
			await octokit.request('POST /user/repos', {
				name: `random-repo-${Date.now()}`,
				description: 'This is a randomly generated repo, made by RepoRemover'
			});
		}

		createRepos = async () => {
			try {
				await Promise.all([createRandomRepo(), createRandomRepo(), createRandomRepo()]);
				return { success: true };
			} catch (error) {
				console.error('[ERROR] Failed to generate random repo', error);
				return { success: false };
			}
		};
	});
</script>

<div class="">
	{#if hasAuthToken}
		<button class="button active" on:click={handleClick}>
			{#if state === 'IDLE'}
				Click to generate 3 random repos
			{:else if state === 'WAITING'}
				⌛ Creating Random Repos...
			{:else if state === 'SUCCESS'}
				🙌 Created 3 Random Repos!
			{:else if state === 'ERROR'}
				⚠️ Failed to create Repos!
			{/if}
		</button>
	{:else}
		<button disabled class="button disabled cursor-not-allowed" title="Auth token required first"
			>Generate Random Repos</button
		>
	{/if}
</div>

<style lang="postcss">
	.button {
		@apply inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 h-10;
	}

	.button.active {
		@apply bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600;
	}

	.button.disabled {
		@apply bg-gray-200 text-black;
	}
</style>
