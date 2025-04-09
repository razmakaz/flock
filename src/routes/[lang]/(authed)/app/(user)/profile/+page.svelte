<script lang="ts">
	import { nav } from '$lib/client/navigation';
	import App from '$lib/stores/App';

	const handleLogout = () => {
		fetch('/login', {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('Logged out', res);
				$App.pb.authStore.clear();
				window.location.href = '/';
			})
			.catch((err) => {
				console.error('Error logging out', err);
			});
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
