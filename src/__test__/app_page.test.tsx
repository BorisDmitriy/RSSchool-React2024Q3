import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '../../app/page';

describe('Page', () => {
  it('renders the main page content and link to specie', () => {
    const { getByText, getByRole } = render(<Page />);

    expect(getByText('Main page')).toBeInTheDocument();
    expect(
      getByText(
        'Hello, i create all in /specie and in the future i create all another pages and / be main',
      ),
    ).toBeInTheDocument();

    const specieLink = getByRole('link', { name: 'Go to specie' });
    expect(specieLink).toHaveAttribute('href', '/specie?search=&id=&page=1');
  });
});
