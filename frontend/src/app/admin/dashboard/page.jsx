'use client';
import React from 'react';
import { Menu, User, BarChart2, Settings, LogOut, MessageSquare } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FFF7F0] ml-64">
      {/* Sidebar */}


      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#002A42]">Dashboard</h1>
          <button className="px-4 py-2 bg-[#FF6D00] text-white hover:bg-[#E65C00] rounded-lg transition-colors">
            New Action
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#002A42] mb-2">Total Users</h2>
            <p className="text-[#666]">1,230</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#002A42] mb-2">Total Sales</h2>
            <p className="text-[#666]">₹3,20,000</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#002A42] mb-2">Active Sessions</h2>
            <p className="text-[#666]">154</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
