
export const MOCK_VEHICLES = [
    {
        id: 1,
        plate: '891DY77Y3Y8Y3',
        type: 'CAR',
        visits: 1,
        lastVisit: '2025-11-01 14:00',
        image: '/assets/car-yellow.png',
        avgTicket: 1935,
        captures: 1,
        flags: 1,
        incidents: [
            'Repeating customer (loyalty candidate).',
            'Previously flagged for dispute — require manager confirmation.',
            'Typical afternoon visits — cross-sell cleaning/nitrogen.'
        ],
        history: [
            { date: '2025-10-10', amount: 1935 }
        ]
    },
    {
        id: 2,
        plate: 'GJ30 AB 1000',
        type: 'BIKE',
        visits: 1,
        lastVisit: '2025-11-01 14:00',
        image: '/assets/bike-green.png',
        avgTicket: 500,
        captures: 3,
        flags: 0,
        incidents: [],
        history: [
            { date: '2025-10-10', amount: 500 }
        ]
    },
    {
        id: 3,
        plate: 'MH12 AB 1234',
        type: 'SUV',
        visits: 5,
        lastVisit: '2025-11-02 10:00',
        image: '/assets/suv-blue.png',
        avgTicket: 4500,
        captures: 5,
        flags: 0,
        incidents: [],
        history: [
            { date: '2025-10-10', amount: 4500 },
            { date: '2025-10-15', amount: 4000 }
        ]
    },
    // Add more mock items if needed based on the previous file content, 
    // but simplifying to these for now or I can copy the rest. 
    // Let's copy the rest from the original file to be safe and extend them.
    { id: 4, plate: '891DY77Y3Y8Y3', type: 'CAR', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/car-yellow.png', avgTicket: 0, captures: 1, flags: 0, incidents: [], history: [] },
    { id: 5, plate: '891DY77Y3Y8Y3', type: 'BIKE', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/bike-green.png', avgTicket: 0, captures: 1, flags: 0, incidents: [], history: [] },
    { id: 6, plate: '891DY77Y3Y8Y3', type: 'SUV', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/suv-blue.png', avgTicket: 0, captures: 1, flags: 0, incidents: [], history: [] },
    { id: 7, plate: '891DY77Y3Y8Y3', type: 'CAR', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/car-yellow.png', avgTicket: 0, captures: 1, flags: 0, incidents: [], history: [] },
    { id: 8, plate: '891DY77Y3Y8Y3', type: 'BIKE', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/bike-green.png', avgTicket: 0, captures: 1, flags: 0, incidents: [], history: [] },
];
