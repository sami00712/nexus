import { MeetingRequest } from '../types';

let meetingRequests: MeetingRequest[] = [];

export const addMeetingRequest = (req: MeetingRequest) => {
  meetingRequests.push(req);
};

export const getRequestsForEntrepreneur = (entrepreneurId: string) =>
  meetingRequests.filter(r => r.entrepreneurId === entrepreneurId);

export const getRequestsFromInvestor = (investorId: string) =>
  meetingRequests.filter(r => r.investorId === investorId);

export const updateRequestStatus = (id: string, status: MeetingRequest['status']) => {
  meetingRequests = meetingRequests.map(r => r.id === id ? { ...r, status } : r);
};

export const _allMeetingRequests = () => meetingRequests; // debug/use if needed
