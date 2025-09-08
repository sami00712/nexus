import { Meeting } from '../types';

let meetings: Meeting[] = [];

export const addMeeting = (m: Meeting) => {
  meetings.push(m);
};

export const getMeetingsForUser = (userId: string) =>
  meetings.filter(m => m.investorId === userId || m.entrepreneurId === userId);

export const _allMeetings = () => meetings; // debug/use if needed
