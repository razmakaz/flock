<script lang="ts">
	import { Calendar } from '@fullcalendar/core/index.js';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import listPlugin from '@fullcalendar/list';
	import interactionPlugin from '@fullcalendar/interaction';
	import { onMount } from 'svelte';
	import * as luxon from 'luxon';
	import Icon from '@iconify/svelte';
	import DatePicker from '$lib/components/forms/DatePicker.svelte';
	import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
	import { locale, t } from '$lib/translations.svelte';

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

	let pageState = $state({
		events: [] as any,
		totalHours: 0
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

	const updateState = () => {
		const _events = calendar.getEvents();
		const _stateEvents = [] as any;
		_events.forEach((event) => {
			_stateEvents.push({
				id: event.id,
				title: event.title,
				start: event.start,
				end: event.end
			});
		});
		pageState.events = _stateEvents;
	};

	const closeModal = () => {
		// reset modal state
		console.log('pageState.events', calendar.getEvents());
		updateState();

		localStorage.setItem('floc-cal-demo', JSON.stringify(pageState.events));

		modalState = {
			...modalState,
			open: false,
			entryType: 'shift',
			start: luxon.DateTime.now().toISO(),
			end: luxon.DateTime.now().plus({ hours: 1 }).toISO()
		};
		shiftModal.close();
	};

	const calculateTotalHours = () => {
		// Calculate the total hours worked from calendar.events
		const events = calendar.getEvents();
		let totalHours = 0;
		events.forEach((event) => {
			const duration = luxon.DateTime.fromISO(event.endStr)
				.diff(luxon.DateTime.fromISO(event.startStr), 'minutes')
				.as('hours');
			totalHours += duration;
		});
		console.log('Total Hours:', totalHours);
		pageState.totalHours = totalHours;
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
		pageState.events.push(event);
		calendar.addEvent(event);
		calculateTotalHours();
		closeModal();
	};

	const handleDelete = () => {
		// Delete event from the calendar
		calendar.getEventById(modalState.id)?.remove();
		closeModal();
	};

	const createCalendar = () => {
		const calendarEl = document.getElementById('calendar');

		const isMobile = window.innerWidth < 768;

		const events = JSON.parse(localStorage.getItem('floc-cal-demo') || '[]');
		pageState.events = events;

		if (!calendarEl) {
			return;
		}

		calendar = new Calendar(calendarEl, {
			plugins: [timeGridPlugin, interactionPlugin, listPlugin],
			initialView: isMobile ? 'timeGridDay' : 'timeGridWeek',
			headerToolbar: {
				left: 'prev,today,next',
				center: 'title',
				right: 'timeGridDay,timeGridWeek,listWeek'
			},
			editable: true,
			selectable: true,
			selectMirror: true,
			nowIndicator: true,
			allDaySlot: false,
			slotDuration: '00:30:00',
			events: events,
			buttonText: {
				today: $t('demos.timesheets.today'),
				day: $t('demos.timesheets.day'),
				week: $t('demos.timesheets.week'),
				list: $t('demos.timesheets.list')
			},
			select: (arg) => {
				showModal({
					id: null,
					start: arg.startStr,
					end: arg.endStr
				});
			},
			eventClick: (arg) => {
				showModal({
					id: arg.event.id,
					start: arg.event.startStr,
					end: arg.event.endStr
				});
				console.log('clicked', arg);
			},
			eventDrop: (arg) => {
				showModal({
					id: arg.event.id,
					start: arg.event.startStr,
					end: arg.event.endStr
				});
				console.log('dropped', arg);
			}
		});

		calendar.render();

		calendarDiv.style.maxHeight = '70vh';
	};

	locale.subscribe((l) => {
		if (l && calendar) {
			createCalendar();
		}
	});

	onMount(() => {
		createCalendar();
		calculateTotalHours();
	});
</script>

<dialog class="modal" bind:this={shiftModal}>
	<div class="modal-box flex w-11/12 max-w-xl flex-col gap-4">
		<div class="h3 text-xl font-bold">{$t('demos.timesheets.entry')}</div>

		<div class="join join-horizontal grid grid-cols-3">
			<button
				class="join-item btn btn-primary {modalState.entryType === 'shift' ? '' : 'btn-outline'}"
				onclick={() => (modalState.entryType = 'shift')}>{$t('demos.timesheets.shift')}</button
			>
			<button
				class="join-item btn btn-primary {modalState.entryType === 'break' ? '' : 'btn-outline'}"
				onclick={() => (modalState.entryType = 'break')}>{$t('demos.timesheets.break')}</button
			>
			<button
				class="join-item btn btn-primary {modalState.entryType === 'timeoff' ? '' : 'btn-outline'}"
				onclick={() => (modalState.entryType = 'timeoff')}>{$t('demos.timesheets.timeOff')}</button
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
		<div class="flex items-center justify-between gap-4">
			<div>
				{#if modalState.id}
					<button class="btn btn-error flex items-center gap-2" onclick={handleDelete}>
						<Icon icon="f7:close" width="24" height="24" />
						<span>{$t('common.delete')}</span>
					</button>
				{/if}
			</div>
			<div class="flex gap-4">
				<button class="btn btn-outline flex items-center gap-2" onclick={closeModal}>
					<Icon icon="f7:close" width="24" height="24" />
					<span>{$t('common.close')}</span>
				</button>
				<button class="btn btn-primary flex items-center gap-2" onclick={handleSubmit}>
					<Icon icon="mdi:check" width="24" height="24" />
					<span>{$t('common.save')}</span>
				</button>
			</div>
		</div>
	</div>
</dialog>

<div class="mx-auto flex w-full justify-center p-4">
	<div class="flex w-full max-w-7xl flex-col gap-4 py-4">
		<h1 class="text-3xl font-black">{$t('demos.timesheets.demoName')}</h1>
		<div class="grid grid-cols-[1fr_auto] gap-4">
			<div class="flex items-center gap-4">
				<button class="btn btn-primary flex items-center gap-2" onclick={() => showModal()}>
					<Icon icon="f7:plus" width="24" height="24" />
					<span>{$t('demos.timesheets.newEntry')}</span>
				</button>
				<button class="btn btn-primary flex items-center gap-2" onclick={handleSubmit}>
					<Icon icon="mdi:paper-plane" width="24" height="24" />
					<span>{$t('common.submit')}</span>
				</button>
			</div>
			<div class="flex items-center gap-4">
				<AnimatedCounter icon="tabler:clock-filled" value={pageState.totalHours} label="hrs" />
			</div>
		</div>
		<div bind:this={calendarDiv} id="calendar"></div>
	</div>
</div>
