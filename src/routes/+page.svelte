<script>
	import TokenForm from '$lib/TokenForm.svelte';
</script>

<svelte:head>
	<title>RepoRemover - The fastest way to archive or delete multiple GitHub repos.</title>
</svelte:head>

<section>
	<header>
		<h1 class="text-5xl tracking-tight font-semibold text-gray-900">RepoRemover</h1>
		<p class="mt-4 text-lg tracking-tight">
			Archive and delete multiple GitHub repos, <i class="font-semibold">super fast</i>.
		</p>
	</header>

	<section class="py-6">
		<ul>
			<li class="py-4">
				<h2 class="text-md leading-6 font-semibold text-gray-900 mb-3">Step 1: Get Access Token</h2>

				<a
					href="https://github.com/settings/tokens/new?scopes=delete_repo,repo&description=Repo%20Remover%20Token"
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
					Get my token</a
				>
			</li>
			<li class="py-4">
				<h2 class="text-md leading-6 font-semibold text-gray-900 mb-3">Step 2: Select Repos</h2>
				<TokenForm />
			</li>
		</ul>
	</section>
</section>
