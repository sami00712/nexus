import { nanoid } from 'nanoid';
import { addMeetingRequest } from '../../data/meetingRequests';
import { useAuth } from '../../context/AuthContext';

type Props = {
  entrepreneurId: string;
};

export default function RequestMeetingButton({ entrepreneurId }: Props) {
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) return;
    const title = window.prompt('Meeting title? (e.g., Investment Discussion)');
    if (!title) return;

    const start = window.prompt('Start (YYYY-MM-DDTHH:mm) e.g. 2025-09-01T10:00');
    const end = window.prompt('End   (YYYY-MM-DDTHH:mm) e.g. 2025-09-01T10:30');
    if (!start || !end) return;

    addMeetingRequest({
      id: nanoid(),
      investorId: user.id,
      entrepreneurId,
      title,
      start,
      end,
      status: 'pending',
    });

    alert('Meeting request sent!');
  };

  return (
    <button className="text-sm bg-secondary-600 text-white rounded px-3 py-1" onClick={handleClick}>
      Request Meeting
    </button>
  );
}
