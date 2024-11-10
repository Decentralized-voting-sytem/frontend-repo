'use client'
import React, { useEffect, useState } from 'react';

// Define interfaces for the data types
interface Voter {
    ID: number;
    VoterID: string;
    Name: string;
    DOB: string;
    Password: string;
}

interface Candidate {
    ID: number;
    Name: string;
}

interface Vote {
    ID: number;
    VoterID: string;
    CandidateID: string;
    CreatedAt: string;
}

interface Data {
    votes: Vote[];
    voters: Voter[];
    candidates: Candidate[];
}

interface VoteCount {
    candidate_name: string;
    vote_count: number;
}

interface MostPopularCandidate {
    candidate_name: string;
    vote_count: number;
}

interface VotePercentage {
    candidate_name: string;
    vote_percentage: number;
}

interface InsightsData {
    vote_counts: VoteCount[];
    most_popular_candidate: MostPopularCandidate;
    vote_percentages: VotePercentage[];
}

const AdminPortal: React.FC = () => {
    const [data, setData] = useState<Data>({
        votes: [],
        voters: [],
        candidates: []
    });

    const [insights, setInsights] = useState<InsightsData>({
        vote_counts: [],
        most_popular_candidate: { candidate_name: '', vote_count: 0 },
        vote_percentages: []
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for voters, candidates, and votes
                const response = await fetch('http://localhost:8080/admin-portal', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);

                // Fetch vote insights data
                const insightsResponse = await fetch('http://localhost:8080/admin-insights', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if (!insightsResponse.ok) {
                    throw new Error('Failed to fetch insights data');
                }
                const insightsResult = await insightsResponse.json();
                setInsights(insightsResult);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Admin Portal</h1>

            {/* Voters Table */}
            <h2 className="text-2xl font-semibold mt-4 mb-2">Voters</h2>
            <table className="w-full bg-white rounded shadow-md mb-8">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">Voter ID</th>
                        <th className="px-4 py-2 text-center">Name</th>
                        <th className="px-4 py-2 text-center">DOB</th>
                        <th className="px-4 py-2 text-center">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {data.voters.map((voter) => (
                        <tr key={voter.ID} className="border-b">
                            <td className="px-4 py-2 text-center">{voter.VoterID}</td>
                            <td className="px-4 py-2 text-center">{voter.Name}</td>
                            <td className="px-4 py-2 text-center">{new Date(voter.DOB).toLocaleDateString()}</td>
                            <td className="px-4 py-2 text-center">{voter.Password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Candidates Table */}
            <h2 className="text-2xl font-semibold mt-4 mb-2">Candidates</h2>
            <table className="w-full bg-white rounded shadow-md mb-8">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">Candidate ID</th>
                        <th className="px-4 py-2 text-center">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.candidates.map((candidate) => (
                        <tr key={candidate.ID} className="border-b">
                            <td className="px-4 py-2 text-center">{candidate.ID}</td>
                            <td className="px-4 py-2 text-center">{candidate.Name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Votes Table */}
            <h2 className="text-2xl font-semibold mt-4 mb-2">Votes</h2>
            <table className="w-full bg-white rounded shadow-md mb-8">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">Vote ID</th>
                        <th className="px-4 py-2 text-center">Voter ID</th>
                        <th className="px-4 py-2 text-center">Candidate ID</th>
                        <th className="px-4 py-2 text-center">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.votes.map((vote) => (
                        <tr key={vote.ID} className="border-b">
                            <td className="px-4 py-2 text-center">{vote.ID}</td>
                            <td className="px-4 py-2 text-center">{vote.VoterID}</td>
                            <td className="px-4 py-2 text-center">{vote.CandidateID}</td>
                            <td className="px-4 py-2 text-center">{new Date(vote.CreatedAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Vote Insights */}
            <h2 className="text-2xl font-semibold mt-8 mb-2">Vote Insights</h2>

            {/* Vote Counts */}
            <h3 className="text-xl font-semibold mt-4 mb-2">Vote Counts</h3>
            <table className="w-full bg-white rounded shadow-md mb-8">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">Candidate Name</th>
                        <th className="px-4 py-2 text-center">Vote Count</th>
                    </tr>
                </thead>
                <tbody>
                    {insights.vote_counts.map((voteCount) => (
                        <tr key={voteCount.candidate_name} className="border-b">
                            <td className="px-4 py-2 text-center">{voteCount.candidate_name}</td>
                            <td className="px-4 py-2 text-center">{voteCount.vote_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Most Popular Candidate */}
            <h3 className="text-xl font-semibold mt-4 mb-2">Most Popular Candidate</h3>
            <table className="w-full bg-white rounded shadow-md mb-8">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">Candidate Name</th>
                        <th className="px-4 py-2 text-center">Vote Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2 text-center">{insights.most_popular_candidate.candidate_name}</td>
                        <td className="px-4 py-2 text-center">{insights.most_popular_candidate.vote_count}</td>
                    </tr>
                </tbody>
            </table>

            {/* Vote Percentages */}
            <h3 className="text-xl font-semibold mt-4 mb-2">Vote Percentages</h3>
            <table className="w-full bg-white rounded shadow-md mb-8">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">Candidate Name</th>
                        <th className="px-4 py-2 text-center">Vote Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {insights.vote_percentages.map((percentage) => (
                        <tr key={percentage.candidate_name} className="border-b">
                            <td className="px-4 py-2 text-center">{percentage.candidate_name}</td>
                            <td className="px-4 py-2 text-center">{percentage.vote_percentage.toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPortal;
