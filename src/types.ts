// --- Meeting / Availability ---
export type AvailabilitySlot = {
    id: string;
    userId: string;        
    start: string;         
    end: string;           
  };
  
  export type MeetingRequest = {
    id: string;
    investorId: string;
    entrepreneurId: string;
    title: string;
    start: string;         
    end: string;           
    status: 'pending' | 'accepted' | 'rejected';
  };
  
  export type Meeting = {
    id: string;
    investorId: string;
    entrepreneurId: string;
    title: string;
    start: string;
    end: string;
  };
  