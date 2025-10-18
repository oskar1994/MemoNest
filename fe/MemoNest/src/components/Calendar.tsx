import type { EventInput } from '@fullcalendar/core/index.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl';
import Modal from './common/Modal';
import { useState } from 'react';
import '../styles.css';
import AddEventModal from './AddEventModal';

const Calendar = () => {
  const [events, setEvents] = useState<EventInput[]>([
    { title: 'Spotkanie z klientem', date: '2025-10-20' },
    { title: 'Demo projektu', date: '2025-10-22' },
    {
      title: 'Rocznica',
      date: '2025-10-14 10:10',
      extendedProps: {
        description: 'Druga rocznica ślubu z Moniką.',
        location: 'Kraków, ul Blachnickiego 3',
      },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [eventToAddDateTime, setEventToAddDateTime] = useState<Date | null>(
    null,
  );

  const handleAddEvent = (event: {
    title: string;
    description: string;
    location: string;
    date: string;
    end: string;
  }) => {
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
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventDidMount={(info) => {
          info.el.style.cursor = 'pointer';
        }}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          // const { title, start, extendedProps } = info.event;

          //setIsModalOpen(true);
          console.log(info);
          //  alert(
          //    `Tytuł: ${title}\n` +
          //      `Data: ${start?.toLocaleString()}\n` +
          //      `Opis: ${extendedProps.description}\n` +
          //      `Miejsce: ${extendedProps.location}`,
          //  );
        }}
        dateClick={(info) => {
          //setEventToAddDateStr(info.dateStr.slice(0, 10));
          setEventToAddDateTime(info.date);
          setIsAddEventModalOpen(true);
        }}
      />
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
        eventToAddDateTime={eventToAddDateTime}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          alert('Potwierdzone!');
          setIsModalOpen(false);
        }}
        title="Czy na pewno?"
      >
        <p>Tej operacji nie można cofnąć. Czy chcesz kontynuować?</p>
      </Modal>
    </>
  );
};

export default Calendar;
