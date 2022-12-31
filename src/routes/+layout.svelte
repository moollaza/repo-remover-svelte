<script>
	import '../app.postcss';
	import Header from './Header.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="flex-1 flex flex-col px-3 py-4 w-100 max-w-5xl border-box ">
		<slot />
	</main>

	<footer class="flex flex-col justify-center items-center p-3">
		<p>RepoRemover by Zaahir Moolla &middot; Copyright &copy; 2023</p>
	</footer>
</div>

<style>
</style>
