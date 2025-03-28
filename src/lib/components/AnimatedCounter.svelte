<script lang="ts">
	import Icon from '@iconify/svelte';
	import anime from 'animejs';
	import numeral from 'numeral';
	import { onMount } from 'svelte';

	const { value, icon = 'mdi:dollar', label = '' } = $props();

	let state = $state({
		value: value,
		dollars: '0',
		cents: '00'
	});

	const animateTo = (value: number) => {
		anime({
			targets: state,
			value: value,
			round: 0,
			easing: 'easeOutExpo',
			duration: 222,
			update: () => {
				const _value = numeral(state.value).format('0,0.00');
				state.dollars = _value.split('.')[0];
				state.cents = _value.split('.')[1];
			}
		});
	};

	$effect(() => {
		// If value is within 1 cent of the current value, don't animate
		if (Math.abs(state.value - value) < 0.01) {
			state.value = value;
			return;
		}
		animateTo(value);
	});

	onMount(() => {
		animateTo(value);
	});
</script>

<div class="btn btn-primary flex items-center gap-2">
	<Icon {icon} class="text-2xl " />
	<div class="flex items-start">
		<div class="text-xl font-bold">{state.dollars}</div>
		<div class="" style="padding-top: 3px;">.{state.cents}</div>
	</div>
	<div class="text-lg font-light">{label}</div>
</div>
