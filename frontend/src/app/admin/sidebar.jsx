import React from 'react'
import { Menu, User, BarChart2, Settings, LogOut, MessageSquare } from 'lucide-react';
import Link from 'next/link';


const sidebar = () => {
    return (
        <div>
            <aside className="w-full fixed top-0 h-full md:w-64 bg-[#FF6D00] text-white p-6 mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav className="space-y-4">
                    <Link href="/admin/dashboard" className="flex items-center p-2  hover:bg-[#E65C00] rounded-lg">
                        <BarChart2 className="w-5 h-5 mr-3" /> Dashboard
                    </Link>
                    <Link href="/admin/manage-business" className="flex items-center p-2  hover:bg-[#E65C00] rounded-lg">
                        <User className="w-5 h-5 mr-3" /> Manage-business
                    </Link>
                    <Link href="/admin/manage-partner" className="flex items-center p-2 hover:bg-[#E65C00] rounded-lg">
                        <Settings className="w-5 h-5 mr-3" /> Manage-partner
                    </Link>
                    <Link href="/admin/manage-contact" className="flex items-center p-2  hover:bg-[#E65C00] rounded-lg">
                        <MessageSquare className="w-5 h-5 mr-3" /> manage-contact
                    </Link>
                    <Link href="#logout" className="flex items-center p-2 text-[#FFD5B5] hover:bg-[#E65C00] rounded-lg">
                        <LogOut className="w-5 h-5 mr-3" /> Logout
                    </Link>
                </nav>
            </aside>
        </div>
    )
}

export default sidebar