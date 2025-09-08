import { AvailabilitySlot } from '../types';

let availability: AvailabilitySlot[] = [];

export const getAvailabilityForUser = (userId: string) =>
  availability.filter(a => a.userId === userId);

export const addAvailability = (slot: AvailabilitySlot) => {
  availability.push(slot);
};

export const removeAvailability = (slotId: string) => {
  availability = availability.filter(a => a.id !== slotId);
};
