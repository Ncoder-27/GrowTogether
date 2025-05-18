'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ManageBusiness = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBusinessData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/business/getall');
            setBusinesses(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching businesses:', error);
            toast.error('Failed to fetch businesses');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this business?')) {
            try {
                await axios.delete(`http://localhost:5000/business/delete/${id}`);
                toast.success('Business deleted successfully');
                fetchBusinessData(); // Refresh the list
            } catch (error) {
                console.error('Error deleting business:', error);
                toast.error('Failed to delete business');
            }
        }
    };

    useEffect(() => {
        fetchBusinessData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen ml-64">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF7F0] ml-64">
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Manage Businesses</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Business Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Owner</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Country</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Business Type</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {businesses.map((business) => (
                                <tr key={business._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-800">{business.businessName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{business.fullName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{business.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{business.country}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{business.businessType}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => handleDelete(business._id)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBusiness;