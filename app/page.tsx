'use server';

import { getAllCategories } from '@/actions/categoryActions';
import MainPage from '@/components/templates/MainPage/MainPage';

export default async function Home() {
  try {
    const fetchedCategories = await getAllCategories();

    if (fetchedCategories.categories) {
      return <MainPage categories={fetchedCategories.categories} />;
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error fetching data.</div>;
  }
}
