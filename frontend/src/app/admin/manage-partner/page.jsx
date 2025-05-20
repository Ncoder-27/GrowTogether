'use client';
import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManagePartner = () => {
    const [partner, setPartner] = React.useState([]);
    const [loading, setLoading] = React.useState(true);    const fetchpartner = async () => {
        try {
            const res = await axios.get('/partner/getall');
            console.log(res.data.data);
            setPartner(res.data.data || []); // Access the nested data property and provide a default empty array
            setLoading(false);
        } catch (error) {
            console.error('Error fetching partner:', error);
            toast.error('Failed to fetch partner');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/partner/delete/${id}`);
                toast.success('Partner deleted successfully');
                fetchpartner(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting partner:', error);
                toast.error('Failed to delete partner');
            }
        }
    };

    useEffect(() => {
        fetchpartner();
    }, []); 

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen ml-64">
                Loading...
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-[#FFF7F0] ml-64 p-8'>
            <h1 className='text-3xl font-bold mb-6'>Manage Partners</h1>
            <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
                <table className='min-w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Business</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Country</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Industry</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Experience</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {partner.map((item) => (
                            <tr key={item._id}>
                                <td className='px-6 py-4 whitespace-nowrap'>{item.fullName}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{item.email}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{item.businessName}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{item.country}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{item.industry}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className='text-red-600 hover:text-red-900 font-medium'
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
    );
}

export default ManagePartner;