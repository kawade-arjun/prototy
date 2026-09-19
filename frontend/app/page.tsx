import { redirect } from 'next/navigation';

export default function Home() {
  // Direct default entry point to login
  redirect('/login');
}
