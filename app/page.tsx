import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h2>Main page</h2>
      <p>
        Hello, i create all in /specie and in the future i create all another
        pages and / be main
      </p>
      <Link href="/specie?search=&id=&page=1">Go to specie</Link>
    </div>
  );
}
