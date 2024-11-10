'use client'
import { useState } from "react";

const AdminActions = () => {
    const [tableName, setTableName] = useState("");
    const [actionType, setActionType] = useState("");
    const [field, setField] = useState("")
    const [formData, setFormData] = useState({
        dob: "",
        voter_id: "",
        candidate_id: "",
        name: "",
        password: "",
        value: ""
    });
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/admin-actions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                table: tableName,
                action: actionType,
                data: formData,
                field: field
            }),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Action was successful!");
        } else {
            setError(result.message || "Something went wrong");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex items-center justify-center flex-grow bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Admin Actions</h2>
                    {error && <p className="text-center text-red-500">{error}</p>}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Table Selector */}
                        <div className="mb-4">
                            <label htmlFor="tableName" className="block text-sm font-medium text-gray-700">
                                Select Table
                            </label>
                            <select
                                id="tableName"
                                name="tableName"
                                value={tableName}
                                onChange={(e) => setTableName(e.target.value)}
                                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option value="voters">Voters</option>
                                <option value="votes">Votes</option>
                            </select>
                        </div>

                        {/* Action Selector */}
                        <div className="mb-4">
                            <label htmlFor="actionType" className="block text-sm font-medium text-gray-700">
                                Select Action
                            </label>
                            <select
                                id="actionType"
                                name="actionType"
                                value={actionType}
                                onChange={(e) => setActionType(e.target.value)}
                                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option value="insert">Insert</option>
                                <option value="update">Update</option>
                                <option value="delete">Delete</option>
                            </select>
                        </div>

                        {/* Create, Update, and Delete operations in the Voters table */}
                        {tableName === "voters" && (
                            <div>
                                {actionType === "insert" && (
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Voter Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                            DOB
                                        </label>
                                        <input
                                            type="date"
                                            id="dob"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            Voter ID (Format: Name-MonthName-MonthNumber)
                                        </label>
                                        <input
                                            type="text"
                                            id="voter_id"
                                            name="voter_id"
                                            value={formData.voter_id}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                    </div>
                                )}

                                {actionType === "update" && (
                                    <div className="mb-4">
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            Voter ID
                                        </label>
                                        <input
                                            type="text"
                                            id="voter_id"
                                            name="voter_id"
                                            value={formData.voter_id}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            Field to Update
                                        </label>
                                        <select
                                            id="field"
                                            name="field"
                                            value={field}
                                            onChange={(e) => setField(e.target.value)}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        >
                                            <option value="name">Voter Name</option>
                                            <option value="password">Password</option>
                                        </select>
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            New Value
                                        </label>
                                        <input
                                            type="text"
                                            id="value"
                                            name="value"
                                            value={formData.value}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                    </div>
                                )}

                                {actionType === "delete" && (
                                    <div className="mb-4">
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            Voter ID to Delete
                                        </label>
                                        <input
                                            type="text"
                                            id="voter_id"
                                            name="voter_id"
                                            value={formData.voter_id}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Create, Update, and Delete operations in the Votes table */}
                        {tableName === "votes" && (
                            <div>
                                {actionType === "insert" && (
                                    <div className="mb-4">
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            Voter ID
                                        </label>
                                        <input
                                            type="text"
                                            id="voter_id"
                                            name="voter_id"
                                            value={formData.voter_id}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                        <label htmlFor="candidate_id" className="block text-sm font-medium text-gray-700">
                                            Candidate ID (1 to 10)
                                        </label>
                                        <input
                                            type="number"
                                            id="candidate_id"
                                            name="candidate_id"
                                            value={formData.candidate_id}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                    </div>
                                )}

                                {actionType === "update" && (
                                    <div className="mb-4">
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            Voter ID
                                        </label>
                                        <input
                                            type="text"
                                            id="voter_id"
                                            name="voter_id"
                                            value={formData.voter_id}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            Fied to Update
                                        </label>
                                        <select
                                            id="field"
                                            name="field"
                                            value={field}
                                            onChange={(e) => setField(e.target.value)}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        >
                                            <option value="candidate_id">Candidate ID</option>
                                        </select>
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            New Value
                                        </label>
                                        <input
                                            type="text"
                                            id="value"
                                            name="value"
                                            value={formData.value}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                    </div>
                                )}

                                {actionType === "delete" && (
                                    <div className="mb-4">
                                        <label htmlFor="voter_id" className="block text-sm font-medium text-gray-700">
                                            Voter ID to Delete
                                        </label>
                                        <input
                                            type="text"
                                            id="voter_id"
                                            name="voter_id"
                                            value={formData.voter_id}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminActions;
