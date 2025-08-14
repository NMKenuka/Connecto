export interface User {
  id: string;
  email: string;
  fullName: string;
  nic: string;
  address?: string;
  dateOfBirth?: string;
  photoUrl?: string;
  role: 'admin' | 'user';
  departmentId?: string;
}

export interface Booking {
  id: string;
  name: string;
  description: string;
  location: string;
  availableDates: string[];
  startTime: string;
  endTime: string;
  durationPerPerson: number;
  durationType: 'minutes' | 'hours';
  createdBy: string;
  createdAt: string;
  slots: BookingSlot[];
}

export interface BookingSlot {
  id: string;
  bookingId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedBy?: string;
  tokenNumber?: string;
}

export interface UserBooking {
  id: string;
  userId: string;
  bookingId: string;
  slotId: string;
  tokenNumber: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'user') => Promise<boolean>;
  register: (userData: any, role: 'admin' | 'user') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}