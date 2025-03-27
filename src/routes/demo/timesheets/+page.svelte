<script lang="ts">
	import { Calendar } from '@fullcalendar/core/index.js';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import listPlugin from '@fullcalendar/list';
	import interactionPlugin from '@fullcalendar/interaction';
	import { onMount } from 'svelte';
	import * as luxon from 'luxon';
	import Icon from '@iconify/svelte';
	import DatePicker from '$lib/components/forms/DatePicker.svelte';

	let shiftModal: HTMLDialogElement;
	let calendar: Calendar;
	let calendarDiv: HTMLDivElement;

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
		id: '',
		entryType: 'shift' as 'shift' | 'break' | 'timeoff',
		start: luxon.DateTime.now().toISO(),
		end: luxon.DateTime.now().plus({ hours: 1 }).toISO(),
		open: false
	});

	const showModal = (options?: {
		id?: string | null;
		start?: string;
		end?: string;
		entryType?: 'shift' | 'break' | 'timeoff';
	}) => {
		const { id, start, end, entryType } = options || {};
		const idempotency = Math.random().toString(36).substring(7);
		modalState = {
			...modalState,
			id: id || idempotency,
			start: start || luxon.DateTime.now().toISO(),
			end: end || luxon.DateTime.now().plus({ hours: 1 }).toISO(),
			entryType: entryType || 'shift',
			open: true
		};
		shiftModal.showModal();
	};

	const closeModal = () => {
		// reset modal state
		modalState = {
			...modalState,
			open: false,
			entryType: 'shift',
			start: luxon.DateTime.now().toISO(),
			end: luxon.DateTime.now().plus({ hours: 1 }).toISO()
		};
		shiftModal.close();
	};

	const handleSubmit = () => {
		// Create event on the calendar
		// Calculate the amount of hours worked
		const duration = luxon.DateTime.fromISO(modalState.end)
			.diff(luxon.DateTime.fromISO(modalState.start), 'minutes')
			.as('hours');
		const event = {
			id: modalState.id,
			title: duration + ' Hour Shift',
			start: modalState.start,
			end: modalState.end
		};
		calendar.addEvent(event);
		closeModal();
	};

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
				left: 'prev,today,next',
				center: 'title',
				right: 'timeGridDay,timeGridWeek,list'
			},
			editable: true,
			selectable: true,
			selectMirror: true,
			nowIndicator: true,
			events: [],
			buttonText: {
				today: 'Today',
				day: 'Day',
				week: 'Week',
				month: 'Month',
				list: 'List'
			},
			select: (arg) => {
				showModal({
					id: null,
					start: arg.startStr,
					end: arg.endStr
				});
			},
			eventClick: (arg) => {
				console.log('clicked', arg);
			},
			eventDrop: (arg) => {
				console.log('dropped', arg);
			}
		});

		calendar.render();

		calendarDiv.style.maxHeight = '70vh';

		// shiftModal.showModal();
	});
</script>

<dialog class="modal" bind:this={shiftModal}>
	<div class="modal-box flex w-11/12 max-w-xl flex-col gap-4">
		<div class="h3 text-xl font-bold">Shift Modal</div>

		<div class="join join-horizontal grid grid-cols-3">
			<button
				class="join-item btn btn-primary {modalState.entryType === 'shift' ? '' : 'btn-outline'}"
				onclick={() => (modalState.entryType = 'shift')}>Shift</button
			>
			<button
				class="join-item btn btn-primary {modalState.entryType === 'break' ? '' : 'btn-outline'}"
				onclick={() => (modalState.entryType = 'break')}>Break</button
			>
			<button
				class="join-item btn btn-primary {modalState.entryType === 'timeoff' ? '' : 'btn-outline'}"
				onclick={() => (modalState.entryType = 'timeoff')}>Time Off</button
			>
		</div>
		{#if modalState.open}
			<div id="pickers" class="flex flex-col items-center gap-4 lg:flex-row">
				<DatePicker bind:result={modalState.start} />
				<Icon icon="mdi:minus" width="24" height="24" />
				<DatePicker bind:result={modalState.end} />
			</div>
		{/if}
		<div class="divider"></div>
		<div class="flex items-center justify-end gap-4">
			<button class="btn btn-error btn-outline flex items-center gap-2" onclick={closeModal}>
				<Icon icon="f7:close" width="24" height="24" />
				<span>Close</span>
			</button>
			<button class="btn btn-primary flex items-center gap-2" onclick={handleSubmit}>
				<Icon icon="mdi:check" width="24" height="24" />
				<span>Save</span>
			</button>
		</div>
	</div>
</dialog>

<div class="mx-auto flex w-full justify-center p-4">
	<div class="flex w-full max-w-7xl flex-col gap-4 py-4">
		<h1 class="text-3xl font-black">Shift Calendar Demo</h1>
		<div class="flex items-center gap-4">
			<button class="btn btn-primary flex items-center gap-2" onclick={() => showModal()}>
				<Icon icon="f7:plus" width="24" height="24" />
				<span>New Entry</span>
			</button>
			<button class="btn btn-primary flex items-center gap-2" onclick={handleSubmit}>
				<Icon icon="mdi:paper-plane" width="24" height="24" />
				<span>Submit</span>
			</button>
		</div>
		<div bind:this={calendarDiv} id="calendar"></div>
	</div>
</div>
