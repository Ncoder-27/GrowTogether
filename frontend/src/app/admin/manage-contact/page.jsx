'use client';
import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManageContact = () => {
    const [contacts, setContacts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchContacts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/contact/getall');
            setContacts(res.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            toast.error('Failed to fetch contacts');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact submission?')) {
            try {
                await axios.delete(`http://localhost:5000/contact/delete/${id}`);
                toast.success('Contact deleted successfully');
                fetchContacts(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting contact:', error);
                toast.error('Failed to delete contact');
            }
        }
    };

    useEffect(() => {
        fetchContacts();
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
            <h1 className='text-3xl font-bold mb-6'>Manage Contact Submissions</h1>
            <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
                <table className='min-w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Message</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {contacts.map((contact) => (
                            <tr key={contact._id}>
                                <td className='px-6 py-4 whitespace-nowrap'>{contact.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{contact.email}</td>
                                <td className='px-6 py-4 max-w-xs overflow-hidden text-ellipsis'>{contact.message}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
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
};

export default ManageContact;