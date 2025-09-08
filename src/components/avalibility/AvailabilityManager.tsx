import { useState } from 'react';
import { addAvailability, getAvailabilityForUser, removeAvailability } from '../../data/availability';
import { useAuth } from '../../context/AuthContext';
import { nanoid } from 'nanoid';

export default function AvailabilityManager() {
  const { user } = useAuth();
  const [, force] = useState(0); // re-render trick

  if (!user) return null;

  const slots = getAvailabilityForUser(user.id);

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const start = (form.elements.namedItem('start') as HTMLInputElement).value;
    const end = (form.elements.namedItem('end') as HTMLInputElement).value;
    if (!start || !end) return alert('Select start & end');

    addAvailability({ id: nanoid(), userId: user.id, start, end });
    form.reset();
    force(x => x + 1);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={onAdd} className="flex flex-col md:flex-row gap-3">
        <input name="start" type="datetime-local" className="border rounded px-3 py-2" />
        <input name="end" type="datetime-local" className="border rounded px-3 py-2" />
        <button className="bg-primary-600 text-white rounded px-4 py-2">Add Slot</button>
      </form>

      <div className="space-y-2">
        {slots.length === 0 && <p className="text-sm text-gray-500">No availability slots yet.</p>}
        {slots.map(s => (
          <div key={s.id} className="flex items-center justify-between border rounded p-2">
            <span className="text-sm text-gray-700">
              {new Date(s.start).toLocaleString()} → {new Date(s.end).toLocaleString()}
            </span>
            <button
              className="text-error-700"
              onClick={() => { removeAvailability(s.id); force(x => x + 1); }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
