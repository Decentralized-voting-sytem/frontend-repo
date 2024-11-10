'use client';
import { SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const parties = [
    { id: 1, name: 'Bharatiya Janata Party', logo: '/bjp.png' },
    { id: 2, name: 'Indian National Congress', logo: '/congress.png' },
    { id: 3, name: 'Aam Aadmi Party', logo: '/aap.svg' },
    { id: 4, name: 'Trinamool Congress', logo: '/trinamool.svg' },
    { id: 5, name: 'Nationalist Congress Party', logo: '/nationalist.jpg' },
    { id: 6, name: 'Communist Party of India', logo: '/communist.png' },
    { id: 7, name: 'Shiv Sena', logo: '/shivsena.svg' },
    { id: 8, name: 'Bahujan Samaj Party', logo: '/bahujan.svg' },
    { id: 9, name: 'Samajwadi Party', logo: '/samajwadi.png' },
    { id: 10, name: 'Rashtriya Janata Dal', logo: '/rashtriya.jpg' }
];

export default function Vote() {
    const [selectedParty, setSelectedParty] = useState<number | null>(null);
    const { push } = useRouter();
    const [error, setError] = useState('');

    const handleSelectParty = (partyId: number) => {
        setSelectedParty(partyId);
    };

    const handleSubmitVote = async () => {
        if (!selectedParty) {
            setError('Please select a party to vote for.');
            return;
        }

        setError('');

        const requestBody = { candidate_id: selectedParty };

        // Log the request body to the console
        console.log('Request body:', requestBody);

        const response = await fetch('http://localhost:8080/register-vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            credentials: 'include'
        });

        if (response.ok) {
            push('/confirmation');
        } else {
            const errorResponse = await response.json();
            // Make sure the error is a string before setting it
            setError(typeof errorResponse.error === 'string' ? errorResponse.error : 'Failed to submit vote. Please try again.');
        }
    };

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-8">Vote for Your Party</h1>

            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                {parties.map((party) => (
                    <div
                        key={party.id}
                        onClick={() => handleSelectParty(party.id)}
                        className={`flex flex-col justify-between items-center p-4 rounded-lg shadow-md transition-shadow h-48 cursor-pointer
                            ${selectedParty === party.id ? 'bg-blue-600 text-white' : 'bg-white'}`}
                    >
                        <div className="relative flex-1 flex items-center justify-center">
                            <Image
                                src={party.logo}
                                alt={party.name}
                                width={100}
                                height={100}
                                className="mb-2"
                            />
                        </div>
                        <p className="text-center font-medium mt-2">{party.name}</p>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <button
                    onClick={handleSubmitVote}
                    className="px-6 py-2 font-medium text-white bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                    Submit Vote
                </button>
            </div>
        </div>
    );
}
