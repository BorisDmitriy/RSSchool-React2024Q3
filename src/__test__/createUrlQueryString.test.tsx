import '@testing-library/jest-dom';
import { ReadonlyURLSearchParams } from 'next/navigation';
import createUrlQueryString from '../components/createUrlQueryString';

describe('createUrlQueryString', () => {
  it('should create a query string with provided names and values', () => {
    const searchParams = new ReadonlyURLSearchParams();
    const names = ['param1', 'param2'];
    const values = ['value1', 'value2'];

    const queryString = createUrlQueryString(names, values, searchParams);
    expect(queryString).toBe('param1=value1&param2=value2');
  });

  it('should overwrite existing parameters with the same name', () => {
    const searchParams = new ReadonlyURLSearchParams({
      param1: 'existingValue',
    });
    const names = ['param1'];
    const values = ['newValue'];

    const queryString = createUrlQueryString(names, values, searchParams);
    expect(queryString).toBe('param1=newValue');
  });
});
