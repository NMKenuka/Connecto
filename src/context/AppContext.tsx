import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, Notice, UserBooking, BookingSlot } from '../types';
import dayjs from 'dayjs';

interface AppContextType {
  bookings: Booking[];
  notices: Notice[];
  userBookings: UserBooking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'slots'>) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'createdAt'>) => void;
  bookSlot: (bookingId: string, slotId: string, userId: string) => string;
  generateSlots: (booking: Omit<Booking, 'slots'>) => BookingSlot[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'New Online Services Available',
      description: 'We are pleased to announce the launch of new online services for citizens including passport renewal and birth certificate applications.',
      createdBy: 'admin',
      createdAt: dayjs().subtract(2, 'days').toISOString(),
    },
    {
      id: '2',
      title: 'Holiday Schedule Notice',
      description: 'Please note that our offices will be closed on upcoming public holidays. Online services will remain available.',
      createdBy: 'admin',
      createdAt: dayjs().subtract(1, 'day').toISOString(),
    },
  ]);
  const [userBookings, setUserBookings] = useState<UserBooking[]>([]);

  const generateSlots = (booking: Omit<Booking, 'slots'>): BookingSlot[] => {
    const slots: BookingSlot[] = [];
    
    booking.availableDates.forEach(date => {
      const startTime = dayjs(`${date} ${booking.startTime}`);
      const endTime = dayjs(`${date} ${booking.endTime}`);
      const duration = booking.durationType === 'hours' 
        ? booking.durationPerPerson * 60 
        : booking.durationPerPerson;
      
      let currentTime = startTime;
      let slotIndex = 0;
      
      while (currentTime.isBefore(endTime)) {
        const slotEndTime = currentTime.add(duration, 'minutes');
        if (slotEndTime.isAfter(endTime)) break;
        
        slots.push({
          id: `${booking.id || Math.random().toString(36).substr(2, 9)}-${date}-${slotIndex}`,
          bookingId: booking.id || '',
          date,
          startTime: currentTime.format('HH:mm'),
          endTime: slotEndTime.format('HH:mm'),
          isBooked: false,
        });
        
        currentTime = slotEndTime;
        slotIndex++;
      }
    });
    
    return slots;
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'slots'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const booking: Booking = {
      ...bookingData,
      id,
      createdAt: dayjs().toISOString(),
      slots: [],
    };
    
    booking.slots = generateSlots(booking);
    setBookings(prev => [...prev, booking]);
  };

  const updateBooking = (id: string, updatedData: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id 
        ? { ...booking, ...updatedData, slots: generateSlots({ ...booking, ...updatedData }) }
        : booking
    ));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
    setUserBookings(prev => prev.filter(userBooking => userBooking.bookingId !== id));
  };

  const addNotice = (noticeData: Omit<Notice, 'id' | 'createdAt'>) => {
    const notice: Notice = {
      ...noticeData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: dayjs().toISOString(),
    };
    setNotices(prev => [notice, ...prev]);
  };

  const bookSlot = (bookingId: string, slotId: string, userId: string): string => {
    const tokenNumber = `TOK${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    
    // Update booking slots
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? {
            ...booking,
            slots: booking.slots.map(slot => 
              slot.id === slotId 
                ? { ...slot, isBooked: true, bookedBy: userId, tokenNumber }
                : slot
            )
          }
        : booking
    ));

    // Add user booking
    const booking = bookings.find(b => b.id === bookingId);
    const slot = booking?.slots.find(s => s.id === slotId);
    
    if (booking && slot) {
      const userBooking: UserBooking = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        bookingId,
        slotId,
        tokenNumber,
        bookingDate: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        status: 'upcoming',
        createdAt: dayjs().toISOString(),
      };
      
      setUserBookings(prev => [...prev, userBooking]);
    }

    return tokenNumber;
  };

  const value: AppContextType = {
    bookings,
    notices,
    userBookings,
    addBooking,
    updateBooking,
    deleteBooking,
    addNotice,
    bookSlot,
    generateSlots,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};