import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import UserLayout from '../../components/layouts/UserLayout'; 

const UserDashboard = () => {
  // 1. Fetch the saved user from local storage
  const savedData = localStorage.getItem('taskManagerUser');
  const user = savedData ? JSON.parse(savedData) : { name: 'User' };

  // MOCK DATA
  const stats = [
    { label: "Total Tasks", count: 8, color: "bg-blue-600" },
    { label: "Pending Tasks", count: 5, color: "bg-purple-500" },
    { label: "In Progress", count: 2, color: "bg-cyan-500" },
    { label: "Completed Tasks", count: 1, color: "bg-green-500" }
  ];

  const pieData = [
    { name: 'Pending', value: 5, color: '#8b5cf6' },
    { name: 'In Progress', value: 2, color: '#06b6d4' },
    { name: 'Completed', value: 1, color: '#22c55e' },
  ];

  const barData = [
    { name: 'Low', count: 3, color: '#10b981' },
    { name: 'Medium', count: 3, color: '#f59e0b' },
    { name: 'High', count: 2, color: '#ef4444' },
  ];

  const recentTasks = [
    { id: 1, name: "Develop Product Review System", status: "Pending", priority: "Low", date: "17th Mar 2025" },
    { id: 2, name: "Build Feedback Form Module", status: "Pending", priority: "High", date: "17th Mar 2025" },
    { id: 3, name: "Migrate Database to MongoDB Atlas", status: "Completed", priority: "Medium", date: "17th Mar 2025" },
    { id: 4, name: "Develop Expense Tracker Module", status: "Pending", priority: "Low", date: "17th Mar 2025" },
    { id: 5, name: "Create Marketing Email Templates", status: "In Progress", priority: "Medium", date: "16th Mar 2025" }
  ];

  return (
    <UserLayout>
      <div className="p-8 bg-gray-50 min-h-screen">
        
        {/* HEADER SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {/* Dynamic Greeting applied here */}
          <h1 className="text-2xl font-bold text-gray-800">Good Morning! {user.name}</h1>
          <p className="text-sm text-gray-500 mb-6">Wednesday 26th Mar 2025</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${stat.color}`}></div>
                <div>
                  <span className="text-lg font-bold text-gray-800">{stat.count}</span>
                  <span className="text-sm text-gray-600 ml-2">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {pieData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Priority Levels</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RECENT TASKS TABLE */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Tasks</h2>
            <button className="text-sm font-medium text-gray-600 border px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2">
              See All <span>→</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                  <th className="pb-3 font-medium text-center">Priority</th>
                  <th className="pb-3 font-medium text-right">Created On</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map(task => (
                  <tr key={task.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="py-4 text-sm text-gray-800">{task.name}</td>
                    <td className="py-4 text-center">
                      <span className={`px-3 py-1 rounded-md text-xs font-medium
                        ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                          task.status === 'In Progress' ? 'bg-cyan-100 text-cyan-700' : 'bg-purple-100 text-purple-700'}
                      `}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`px-3 py-1 rounded-md text-xs font-medium
                        ${task.priority === 'High' ? 'bg-red-100 text-red-700' : 
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-green-100 text-green-700'}
                      `}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-4 text-right text-sm text-gray-500">{task.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </UserLayout>
  );
};

export default UserDashboard;