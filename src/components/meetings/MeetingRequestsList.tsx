import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getRequestsForEntrepreneur, updateRequestStatus } from '../../data/meetingRequests';
import { addMeeting } from '../../data/meetings';

export default function MeetingRequestsList() {
  const { user } = useAuth();
  const [, force] = useState(0);
  if (!user) return null;

  const requests = getRequestsForEntrepreneur(user.id);

  const onAccept = (id: string) => {
    const req = requests.find(r => r.id === id);
    if (!req) return;
    updateRequestStatus(id, 'accepted');
    addMeeting({
      id: `m_${id}`,
      investorId: req.investorId,
      entrepreneurId: req.entrepreneurId,
      title: req.title,
      start: req.start,
      end: req.end,
    });
    force(x => x + 1);
  };

  const onDecline = (id: string) => {
    updateRequestStatus(id, 'rejected');
    force(x => x + 1);
  };

  return (
    <div className="space-y-3">
      {requests.length === 0 && <p className="text-sm text-gray-500">No meeting requests.</p>}
      {requests.map(r => (
        <div key={r.id} className="border rounded p-3 flex justify-between items-center">
          <div>
            <p className="font-medium">{r.title}</p>
            <p className="text-sm text-gray-600">
              {new Date(r.start).toLocaleString()} → {new Date(r.end).toLocaleString()}
            </p>
            <span className="text-xs uppercase tracking-wide">
              Status: {r.status}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-success-700 text-white disabled:opacity-50"
              disabled={r.status !== 'pending'}
              onClick={() => onAccept(r.id)}
            >
              Accept
            </button>
            <button
              className="px-3 py-1 rounded bg-error-700 text-white disabled:opacity-50"
              disabled={r.status !== 'pending'}
              onClick={() => onDecline(r.id)}
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
