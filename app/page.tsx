tsx
import React, { useState } from 'react';
import { Status, Report } from '@/src/types/types';
import { app } from '@/src/firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const db = getFirestore(app);
const HomePage: React.FC = () => {
  const [team, setTeam] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [currentWeekCommitments, setCurrentWeekCommitments] = useState<{ task: string; subtasks: string[]; status: Status }[]>([{ task: '', subtasks: [''], status: 'Not Started' }]);
  const [nextWeekCommitments, setNextWeekCommitments] = useState<{ task: string; subtasks: string[]; status: Status }[]>([{ task: '', subtasks: [''], status: 'Not Started' }]);
  const [highlights, setHighlights] = useState<string>('');
  const [lowlights, setLowlights] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submitReport = async () => {
      try {
        const reportData: Omit<Report, 'id' | 'userId' | 'date' | 'comments'> = {
          teamId: team,
          currentWeekCommitments,
          nextWeekCommitments,
          highlights,
          lowlights,
        };
        const docRef = await addDoc(collection(db, "reports"), reportData);
        console.log("Document written with ID: ", docRef.id);
        // Optionally, reset the form or give user feedback
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    submitReport();
  };

  const addCommitment = (commitments: { task: string; subtasks: string[]; status: Status }[], setCommitments: React.Dispatch<React.SetStateAction<{ task: string; subtasks: string[]; status: Status }[]>>) => {
    setCommitments([...commitments, { task: '', subtasks: [''], status: 'Not Started' }]);
  };

  const updateCommitment = (
    commitments: { task: string; subtasks: string[]; status: Status }[],
    setCommitments: React.Dispatch<React.SetStateAction<{ task: string; subtasks: string[]; status: Status }[]>>,
    index: number,
    field: 'task' | 'status',
    value: string
  ) => {
    const updatedCommitments = [...commitments];
    if (field === 'task') {
      updatedCommitments[index].task = value;
    } else if (field === 'status') {
      updatedCommitments[index].status = value as Status;
    }
    setCommitments(updatedCommitments);
  };

  return (
    <div className="bg-gray-100 flex justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 m-4 w-full max-w-2xl">
        <h1 className="text-2xl text-center mb-6">Submit Your Weekly Report</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="team" className="block text-gray-700 text-sm font-bold mb-2">Team</label>
            <select id="team" value={team} onChange={(e) => setTeam(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select a team</option>
              <option value="teamA">Team A</option>
              <option value="teamB">Team B</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
            <input type="text" id="userName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Current Week's Commitments</h2>
            {currentWeekCommitments.map((commitment, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input type="text" placeholder="Task" value={commitment.task} onChange={(e) => updateCommitment(currentWeekCommitments, setCurrentWeekCommitments, index, 'task', e.target.value)} className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {/* Subtasks input would be added here if needed */}
                <select value={commitment.status} onChange={(e) => updateCommitment(currentWeekCommitments, setCurrentWeekCommitments, index, 'status', e.target.value)} className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            ))}
            <button type="button" onClick={() => addCommitment(currentWeekCommitments, setCurrentWeekCommitments)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Commitment</button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Next Week's Planned Commitments</h2>
            {nextWeekCommitments.map((commitment, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input type="text" placeholder="Task" value={commitment.task} onChange={(e) => updateCommitment(nextWeekCommitments, setNextWeekCommitments, index, 'task', e.target.value)} className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {/* Subtasks input would be added here if needed */}
                <select value={commitment.status} onChange={(e) => updateCommitment(nextWeekCommitments, setNextWeekCommitments, index, 'status', e.target.value)} className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            ))}
            <button type="button" onClick={() => addCommitment(nextWeekCommitments, setNextWeekCommitments)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Commitment</button>
          </div>

          <div className="mb-4">
            <label htmlFor="highlights" className="block text-gray-700 text-sm font-bold mb-2">Highlights ("Highs")</label>
            <textarea id="highlights" value={highlights} onChange={(e) => setHighlights(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" />
          </div>

          <div className="mb-6">
            <label htmlFor="lowlights" className="block text-gray-700 text-sm font-bold mb-2">Lowlights ("Lows")</label>
            <textarea id="lowlights" value={lowlights} onChange={(e) => setLowlights(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;