import type { EventInput } from '@fullcalendar/core/index.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl';
import { useState } from 'react';
import '../styles.css';
import AddEventModal from './AddEventModal';
import type { Event } from './types/Event';
import EditEventModal from './EditEventModal';

const Calendar = () => {
  const [events, setEvents] = useState<EventInput[]>([
    { title: 'Spotkanie z klientem', date: '2025-10-20' },
    { title: 'Demo projektu', date: '2025-10-22', color: '#dc3545' },
    {
      title: 'Rocznica',
      date: '2025-10-14 10:10',
      color: '#dc3545',
      extendedProps: {
        description: 'Druga rocznica ślubu z Moniką.',
        location: 'Kraków, ul Blachnickiego 3',
      },
    },
  ]);

  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [eventToAddDateTime, setEventToAddDateTime] = useState<Date | null>(
    null,
  );
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  const handleAddEvent = (event: {
    title: string;
    description: string;
    location: string;
    date: string;
    end: string;
  }) => {
    console.log(event);
    setEvents((prev) => [...prev, event]);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        slotMinTime="06:00:00"
        height="auto"
        locale={plLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,addEventButton',
        }}
        customButtons={{
          addEventButton: {
            text: 'Dodaj wydarzenie',
            click: () => {
              setEventToAddDateTime(null);
              setIsAddEventModalOpen(true);
            },
          },
        }}
        events={events}
        eventDidMount={(info) => {
          info.el.style.cursor = 'pointer';
        }}
        eventClick={(info) => {
          const eventObj: Event = {
            id: info.event.id,
            title: info.event.title,
            description: info.event.extendedProps.description || '',
            location: info.event.extendedProps.location || '',
            date: info.event.startStr,
            end: info.event.endStr || '',
            color: info.event.backgroundColor,
          };

          setEventToEdit(eventObj);
        }}
        dateClick={(info) => {
          setEventToAddDateTime(info.date);
          setIsAddEventModalOpen(true);
        }}
      />
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
        date={eventToAddDateTime}
      />

      <EditEventModal
        isOpen={!!eventToEdit}
        onClose={() => setEventToEdit(null)}
        eventData={eventToEdit}
        onUpdateEvent={(updatedEvent) => {
          eventToEdit &&
            setEvents((prev) =>
              prev.map((e) => (e.id === eventToEdit?.id ? updatedEvent : e)),
            );
        }}
        onDeleteEvent={(event) => {
          setEvents((prev) => prev.filter((e) => e.id !== event.id));
        }}
      />
    </>
  );
};

export default Calendar;
