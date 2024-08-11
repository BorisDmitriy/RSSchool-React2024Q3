import { redirect } from '@remix-run/node';

export const loader = () => redirect('/specie?search=&id=&page=1');

export default function Index() {
  return null;
}
