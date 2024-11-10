'use client';

export default function Confirmation() {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl text-green-500 mb-4">
                    &#10003;
                </div>
                <p className="text-xl font-semibold text-gray-700">
                    Vote successfully casted
                </p>
            </div>
        </div>
    );
}
