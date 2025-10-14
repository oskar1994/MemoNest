import type { EventInput } from '@fullcalendar/core/index.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import plLocale from '@fullcalendar/core/locales/pl';

const Calendar = () => {
  const events: EventInput[] = [
    { title: 'Spotkanie z klientem', date: '2025-10-20' },
    { title: 'Demo projektu', date: '2025-10-22' },
    { title: 'Rocznica', date: '2025-10-14 10:10' },
  ];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
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
      />
    </div>
  );
};

export default Calendar;
