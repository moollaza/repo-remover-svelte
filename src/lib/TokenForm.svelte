<script>
	import { accessToken, ghViewer } from '$lib/state';
	import { buildUserQuery } from '$lib/graphql';
	import { constants } from '$lib/constants';

	import { dev } from '$app/environment';

	const API = 'https://api.github.com/graphql';

	let hasInput = false;
	let hasValidInput = false;
	let hasError = false;
	let message = '';

	let isVerifiedToken = false;

	let value = ''; // $accessToken;

	function fillToken() {
		value = constants.devToken;
		onChange();
	}

	function onChange() {
		if (!value) {
			hasInput = false;
			hasValidInput = false;
			hasError = false;
			isVerifiedToken = false;
			message = '';

			return;
		}

		if (value.length === 40) {
			$accessToken = value;

			hasInput = true;
			hasValidInput = true;
			hasError = false;
			message = 'Success! This token is valid';
		} else {
			$accessToken = value;
			hasValidInput = false;
			hasError = true;
			isVerifiedToken = false;
			message = 'Please enter valid access token';
		}

		if (hasValidInput) {
			checkToken();
		}
	}

	async function checkToken() {
		console.log('CHECKING TOKEN');

		const options = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${value}`,
				'User-Agent': 'Repo Remover'
			},
			body: buildUserQuery()
		};

		let res = await fetch(API, options);
		let json = await res.json();

		console.log('API RESPONSE', json);

		if (json?.data?.viewer?.login) {
			isVerifiedToken = true;
			$ghViewer = json.data.viewer;
		} else {
			isVerifiedToken = false;
		}
	}
</script>

<div>
	<label for="personal-access-token" class="flex items-end text-sm font-medium text-gray-700"
		>Please enter your Personal Access Token
		<button
			class="flex items-center text-xs ml-8 text-center text-white bg-gray-800 rounded px-2"
			on:click={fillToken}>Fill Token</button
		></label
	>
	<div class="mt-1 relative rounded-md shadow-sm w-96">
		<input
			type="text"
			name="personal-access-token"
			id="personal-access-token"
			class="block w-full pr-10 focus:outline-none sm:text-sm rounded-md"
			class:input-error={hasError}
			class:input-success={isVerifiedToken}
			aria-invalid="true"
			aria-describedby="email-error"
			placeholder="Personal Access Token"
			required
			minlength="40"
			maxlength="40"
			autocomplete="off"
			on:change={onChange}
			bind:value
		/>
		{#if hasError}
			<!-- ERROR ICON -->
			<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
				<!-- Heroicon name: solid/exclamation-circle -->
				<svg
					class="h-5 w-5 text-red-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		{/if}
		{#if isVerifiedToken}
			<!-- ERROR ICON -->
			<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
				<!-- Heroicon name: solid/exclamation-circle -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-green-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
		{/if}
	</div>
	{#if message}
		<!-- ERROR TEXT -->
		<p
			class="mt-2 text-sm"
			class:text-red-600={hasError}
			class:text-green-600={isVerifiedToken}
			id="token-error"
		>
			{message}
		</p>
	{/if}
</div>

<div class="mt-8">
	<button
		class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
		disabled={!isVerifiedToken}
	>
		Continue
	</button>
</div>

<style lang="postcss">
	.input-error {
		@apply border-red-300  focus:ring-red-500 focus:border-red-500;
	}

	.input-success {
		@apply border-green-300  focus:ring-green-500 focus:border-green-500;
	}
</style>
