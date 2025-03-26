<script lang="ts">
	import { Calendar } from '@fullcalendar/core/index.js';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import listPlugin from '@fullcalendar/list';
	import interactionPlugin from '@fullcalendar/interaction';
	import { onMount } from 'svelte';
	import * as luxon from 'luxon';
	import * as cally from 'cally';

	let shiftModal: HTMLDialogElement;
	let calendar: Calendar;

	const paycodes = [
		{
			id: 'regular',
			name: 'Regular Hours',
			color: '#4CAF50'
		},
		{
			id: 'holiday',
			name: 'Holiday (Worked)',
			color: '#F44336'
		},
		{
			id: 'holiday_unworked',
			name: 'Holiday (Unworked)',
			color: '#FFC107'
		},
		{
			id: 'vacation',
			name: 'Vacation',
			color: '#2196F3'
		},
		{
			id: 'sick',
			name: 'Sick',
			color: '#9C27B0'
		},
		{
			id: 'personal',
			name: 'Personal',
			color: '#FF5722'
		},
		{
			id: 'unpaid',
			name: 'Unpaid',
			color: '#607D8B'
		}
	];

	let modalState = $state({
		entryType: 'shift' as 'shift' | 'break',

		start: luxon.DateTime.now().toISO(),
		end: luxon.DateTime.now().plus({ hours: 1 }).toISO()
	});

	onMount(() => {
		const calendarEl = document.getElementById('calendar');

		const isMobile = window.innerWidth < 768;

		if (!calendarEl) {
			return;
		}
		calendar = new Calendar(calendarEl, {
			plugins: [timeGridPlugin, interactionPlugin, listPlugin],
			initialView: isMobile ? 'timeGridDay' : 'timeGridWeek',
			headerToolbar: {
				left: 'addShift prev,today,next',
				center: 'title',
				right: 'timeGridDay,timeGridWeek,list'
			},
			editable: true,
			selectable: true,
			selectMirror: true,
			nowIndicator: true,
			customButtons: {
				addShift: {
					text: 'Create Entry',
					click: () => {
						showModal();
						console.log('Add Shift');
					}
				}
			},
			events: [
				{
					title: 'Holiday Premium',
					start: luxon.DateTime.now().minus({ days: -1, hours: 3 }).toISO(),
					end: luxon.DateTime.now().plus({ days: 1, hours: 1 }).toISO(),
					display: 'background'
				}
			],
			buttonText: {
				today: 'Today',
				day: 'Day',
				week: 'Week',
				month: 'Month',
				list: 'List'
			},
			select: (arg) => {
				showModal();
				console.log('select', arg);
			},
			eventClick: (arg) => {
				console.log('clicked', arg);
			},
			eventDrop: (arg) => {
				console.log('dropped', arg);
			}
		});

		const showModal = () => {
			shiftModal.showModal();
		};

		calendar.render();
	});

	onMount(() => {
		shiftModal.showModal();
	});
</script>

<button
	popovertarget="cally-popover1"
	class="input input-border"
	id="cally1"
	style="anchor-name:--cally1"
>
	Pick a date
</button>
<div
	popover
	id="cally-popover1"
	class="dropdown bg-base-100 rounded-box shadow-lg"
	style="position-anchor:--cally1"
>
	<calendar-date
		class="cally"
		onchange={(document.getElementById('cally1').innerText = this.value)}
	>
		<svg
			aria-label="Previous"
			class="size-4 fill-current"
			slot="previous"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg
		>
		<svg
			aria-label="Next"
			class="size-4 fill-current"
			slot="next"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg
		>
		<calendar-month></calendar-month>
	</calendar-date>
</div>

<dialog class="modal" bind:this={shiftModal}>
	<div class="modal-box w-11/12 max-w-xl">
		<div class="h3 text-xl font-bold">Shift Modal</div>

		<div class="modal-action">
			<button class="btn btn-primary" onclick={() => shiftModal.close()}>Close</button>
		</div>
	</div>
</dialog>

<div class="mx-auto flex w-full justify-center">
	<div class="flex w-full max-w-7xl flex-col gap-4 py-4">
		<div id="calendar"></div>
	</div>
</div>
