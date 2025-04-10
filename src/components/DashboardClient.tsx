tsx
"use client";

import { Report } from '@/src/types/types';
import React, { useState, useEffect } from 'react';

interface DashboardClientProps {
  reports: Report[];
}

const DashboardClient: React.FC<DashboardClientProps> = ({ reports }) => {
  const [teamFilter, setTeamFilter] = useState<string>('All');

  const [filteredReports, setFilteredReports] = useState<Report[]>(reports);

  useEffect(() => {
    if (teamFilter === 'All') {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter(report => report.teamId === teamFilter));
    }
  }, [teamFilter, reports]);

  useEffect(() => {
    console.log(filteredReports);
  }, [filteredReports]);

  const handleTeamFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeamFilter(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map(report => (
          <div key={report.id} className="rounded-lg shadow-md bg-white p-4">
            <h2 className="text-xl font-semibold mb-2">Report Details</h2>
            <p><strong>Team:</strong> {report.teamId}</p>
            <p><strong>User:</strong> {report.userId}</p>

            <div className="mt-4">
              <h3 className="font-semibold">Current Week Commitments</h3>
              {report.currentWeekCommitments.map((commitment, index) => (
                <p key={index} className="mb-2">
                  {commitment.task} ({commitment.status})
                  {commitment.subtasks.length > 0 && (
                    <ul>
                      {commitment.subtasks.map((subtask, subIndex) => (
                        <li key={subIndex} className="ml-4">- {subtask}</li>
                      ))}
                    </ul>
                  )}
                </p>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Next Week Commitments</h3>
              {report.nextWeekCommitments.map((commitment, index) => (
                <p key={index} className="mb-2">
                  {commitment.task} ({commitment.status})
                  {commitment.subtasks.length > 0 && (
                    <ul>
                      {commitment.subtasks.map((subtask, subIndex) => (
                        <li key={subIndex} className="ml-4">- {subtask}</li>
                      ))}
                    </ul>
                  )}
                </p>
              ))}
            </div>
            <p className="mt-4"><strong>Highlights:</strong> {report.highlights}</p>
            <p><strong>Lowlights:</strong> {report.lowlights}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label htmlFor="teamFilter" className="block text-sm font-medium text-gray-700">Filter by Team:</label>
        <select id="teamFilter" value={teamFilter} onChange={handleTeamFilterChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="All">All</option>
          <option value="Team A">Team A</option>
          <option value="Team B">Team B</option>
        </select>
      </div>
    </div>
  );
};

export default DashboardClient;