tsx

import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../src/firebase';
import { Report } from '../../src/types/types';
import DashboardClient from '../src/components/DashboardClient';

const getReports = async (): Promise<Report[]> => {
  const db = getFirestore(app);
  const reportsCollection = collection(db, 'reports');
  const reportsSnapshot = await getDocs(reportsCollection);
  const reportsList = reportsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Report[];
  return reportsList;
};

const DashboardPage: React.FC = async () => {
  const reports = await getReports();

  return (
    <DashboardClient reports={reports} />
  );
};

export default DashboardPage;