import { ReadonlyURLSearchParams } from 'next/navigation';

const createUrlQueryString = (
  names: string[],
  values: string[],
  searchParams: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(searchParams?.toString());

  names.forEach((name: string, index: number) => {
    const value = values[index];
    if (name && value !== undefined) {
      params.set(name, value);
    }
  });

  return params.toString();
};
export default createUrlQueryString;
