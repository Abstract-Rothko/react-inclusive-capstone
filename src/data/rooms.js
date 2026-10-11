export const MAX_ADVANCE_DAYS = 28;

export const rooms = [
    {
        id: 'study-room-1',
        name: 'Study Room 1',
        capacity: 4,
        floor: 'Ground floor',
        route: 'Step-free from the entrance',
        features: ['Hearing loop', 'Magnifier software']
    },
    {
        id: 'study-room-2',
        name: 'Study Room 2',
        capacity: 6,
        floor: 'Second floor, reached by lift',
        route: 'Step-free from the entrance',
        features: ['Hearing loop', 'Screen reader and magnifier software']
    },
    {
        id: 'community-hall',
        name: 'Community Hall',
        capacity: 12,
        floor: 'Ground floor',
        route: 'Step-free from the entrance',
        features: ['Hearing loop', 'Movable seating']
    }
];

export const timeSlots = [
    { value: '09:00-11:00', label: '09:00 to 11:00' },
    { value: '11:00-13:00', label: '11:00 to 13:00' },
    { value: '14:00-16:00', label: '14:00 to 16:00' },
    { value: '16:00-18:00', label: '16:00 to 18:00' }
];

export const accessFeatures = [
    { value: 'hearing-loop', label: 'Hearing loop switched on' },
    { value: 'screen-reader-computer', label: 'Computer with screen reader set up' },
    { value: 'extra-space', label: 'Extra clear floor space' }
];

export const findRoom = id => rooms.find(room => room.id === id);

export const timeSlotLabel = value => timeSlots.find(slot => slot.value === value)?.label ?? value;
