<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
</script>

<div class="">
	<Nav />

	<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
		<slot />
	</main>

	<footer class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col border-t border-slate-400/10 py-10 ">
			<p class="text-sm text-slate-500">
				Copyright &copy; 2023 <a
					class="underline underline-offset-4 hover:text-blue-600"
					target="_blank"
					rel="noreferrer"
					href="https://zaahir.ca">Zaahir Moolla</a
				>
			</p>
		</div>
	</footer>
</div>

