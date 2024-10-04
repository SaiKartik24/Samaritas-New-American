
export interface Refugee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    dateOfBirth: string;
    gender: string,
    countryOfOrigin: string;
    currentLocation: string;
    language: string;
    imageUrl: string;
    messageId: string;
    joinedDate:string,
}

export interface Agent {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    dateOfBirth: string;
    countryOfOrigin: string;
    currentLocation: string;
    language: string;
    gender:string;
    imageUrl: string;
    assignedRefugees: Refugee[];
    joinedDate:string;
}

export const AgentData: Agent[] = [
    {
        id: 1,
        firstName: "Agent",
        lastName: "A",
        email: "agenta@example.com",
        phone: 45435546544,
        dateOfBirth: "1990-01-01",
        countryOfOrigin: "CountryName",
        currentLocation: "Michigan",
        language: "English",
        gender: "Male",
        imageUrl:  'https://talk.miraclesoft.com/avatar/skola2',
        joinedDate:'2024-02-22',
        assignedRefugees: [
            {
                id: 1,
                firstName: "Refugee",
                lastName: "1",
                email: "refugee1@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/sinduga',
                messageId: '1214',
                joinedDate:'2024-02-22'
            },
            {
                id: 2,
                firstName: "Refugee",
                lastName: "2",
                email: "refugee2@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/sbongu1',
                messageId: '1214',
                joinedDate:'2024-02-22',
            },
            {
                id: 3,
                firstName: "Refugee",
                lastName: "3",
                email: "refugee3@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/smadasu',
                messageId: '1214',
                joinedDate:'2024-02-22',
            },
            {
                id: 4,
                firstName: "Refugee",
                lastName: "4",
                email: "refugee4@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/psankurabothu',
                messageId: '1214',
                joinedDate:'2024-02-22',
            },
            {
                id: 5,
                firstName: "Refugee",
                lastName: "5",
                email: "refugee5@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/sarimilli',
                messageId: '1214',
                joinedDate:'2024-02-22',
            },

        ]
    },
    {
        id: 2,
        firstName: "Agent",
        lastName: "B",
        email: "agentb@example.com",
        phone: 45435546544,
        dateOfBirth: "1990-01-01",
        countryOfOrigin: "CountryName",
        currentLocation: "Bentonvelli",
        language: "English",
        gender: "Female",
        imageUrl: 'https://talk.miraclesoft.com/avatar/jchitri',
        joinedDate:'2024-03-22',
        assignedRefugees: [
            {
                id: 6,
                firstName: "Refugee",
                lastName: "1",
                email: "refugee1@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/sarimilli',
                messageId: '1214',
                joinedDate:'2024-02-22'
            },
            {
                id: 7,
                firstName: "Refugee",
                lastName: "2",
                email: "refugee2@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/sbongu1',
                messageId: '1214',
                joinedDate:'2024-02-22',
            },
            {
                id: 8,
                firstName: "Refugee",
                lastName: "3",
                email: "refugee3@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "Arabic",
                imageUrl: 'https://talk.miraclesoft.com/avatar/smadasu',
                messageId: '1214',
                joinedDate:'2024-02-22',
            }
        ]
    },
    {
        id: 3,
        firstName: "Agent",
        lastName: "C",
        email: "agentc@example.com",
        phone: 45435546544,
        dateOfBirth: "1990-01-01",
        countryOfOrigin: "CountryName",
        currentLocation: "Michigan",
        language: "English",
        gender: "Male",
        imageUrl: 'https://talk.miraclesoft.com/avatar/dabburi1',
        joinedDate:'2024-02-22',
        assignedRefugees: [
            {
                id: 9,
                firstName: "Refugee",
                lastName: "1",
                email: "refugee1@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/sarimilli',
                messageId: '1214',
                joinedDate:'2024-02-22'
            },
            {
                id: 10,
                firstName: "Refugee",
                lastName: "2",
                email: "refugee2@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/nmadasu',
                messageId: '1214',
                joinedDate:'2024-02-22',
            },
            {
                id: 11,
                firstName: "Refugee",
                lastName: "3",
                email: "refugee3@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/sbongu1',
                messageId: '1214',
                joinedDate:'2024-02-22',
            },
            {
                id: 12,
                firstName: "Refugee",
                lastName: "4",
                email: "refugee4@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/sinduga',
                messageId: '1214',
                joinedDate:'2024-02-22',
            },
            {
                id: 13,
                firstName: "Refugee",
                lastName: "5",
                email: "refugee5@example.com",
                phone: 45435546544,
                gender: "Male",
                dateOfBirth: "1990-01-01",
                countryOfOrigin: "CountryName",
                currentLocation: "CurrentLocationName",
                language: "English",
                imageUrl: 'https://talk.miraclesoft.com/avatar/jadavani',
                messageId: '1214',
                joinedDate:'2024-02-22',
            },

        ]
    },

];
