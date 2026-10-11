export const eventsData = [
    {
        id: 'introduction-to-spreadsheets',
        title: 'Introduction to Spreadsheets',
        date: '2026-10-20',
        startTime: '18:00',
        endTime: '19:30',
        description: 'A free evening workshop for beginners. Laptops are available.'
    },
    {
        id: 'staying-safe-online',
        title: 'Staying Safe Online: Learn the Basics',
        date: '2026-10-22',
        startTime: '11:00',
        endTime: '12:00',
        description: 'Learn to spot scam messages and set up good passwords. Screen reader demonstrations included.'
    },
    {
        id: 'applying-for-jobs',
        title: 'Applying for Jobs in Today\u2019s Market',
        date: '2026-10-24',
        startTime: '10:00',
        endTime: '12:00',
        description: 'Learn how to apply for jobs in the age of AI. A free CV template is available.'
    },
    {
        id: 'local-history-newspapers',
        title: 'Local History Talk: Newspapers of the 1950s',
        date: '2026-10-27',
        startTime: '14:00',
        endTime: '15:00',
        description: 'An introduction to the digitised newspaper archive, with time for questions.'
    }
].sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`));

export const findEvent = id => eventsData.find(event => event.id === id);