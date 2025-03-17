<script lang="ts">
	import { goto } from '$app/navigation';
	import CRAPI from '$lib/CRAPI';

	const handleLogout = () => {
		CRAPI.db.authStore.clear();
		window.location.href = '/login';
	};
</script>

<div class="mx-auto flex flex-col">
	<div class="mx-auto flex w-full max-w-3xl flex-col p-4">
		<div class="card bg-base-200 flex flex-col items-start gap-4 p-4">
			<div class="text-2xl font-bold">Session Settings</div>
			<div class="divider my-0"></div>
			<button class="btn btn-error" onclick={handleLogout}> Log Out </button>
		</div>
	</div>
</div>
