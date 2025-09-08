// import  { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';

// const Calendars = () => {
//   const [events, setEvents] = useState<any[]>([
//     { title: 'Investor Meeting', date: '2025-08-20' },
//   ]);

//   const handleDateClick = (info: any) => {
//     const title = prompt('Enter Meeting Title:');
//     if (title) {
//       setEvents([...events, { title, date: info.dateStr }]);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-4 text-primary-700">Meeting Calendar</h2>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         selectable={true}
//         dateClick={handleDateClick}
//         events={events}
//         height="600px"
//       />
//     </div>
//   );
// };

// export default Calendars;



import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAuth } from '../context/AuthContext';
import { getMeetingsForUser } from '../data/meetings';
import { getAvailabilityForUser } from '../data/availability';

export default function Calendar() {
  const { user } = useAuth();
  if (!user) return null;

  // meetings where I am investor OR entrepreneur
  const meetings = getMeetingsForUser(user.id);
  const availability = getAvailabilityForUser(user.id);

  const events = [
    // confirmed meetings (solid)
    ...meetings.map(m => ({
      id: m.id,
      title: m.title,
      start: m.start,
      end: m.end,
    })),
    // availability (background highlight)
    ...availability.map(a => ({
      id: a.id,
      title: 'Available',
      start: a.start,
      end: a.end,
      display: 'background' as const
    })),
  ];

  return (
    <div className="p-0">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="650px"
        events={events}
      />
    </div>
  );
}
