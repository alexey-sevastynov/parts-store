'use server';

import MainPage from '@/components/templates/MainPage/MainPage';
import { getCategories } from '@/utils/dashboards';

export default async function Home() {
  try {
    const fetchedCategories = await getCategories();

    if (fetchedCategories.data) {
      return <MainPage categories={fetchedCategories.data} />;
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error fetching data.</div>;
  }
}
