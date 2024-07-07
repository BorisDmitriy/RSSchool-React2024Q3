import React from 'react';
import { SearchPathIState } from '../types/Types';
import SpeciesList from './SpeciesList';
import getSpecies from '../api/Api';

export default class SearchPath extends React.Component<
  object,
  SearchPathIState
> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      error: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.fetchData(savedSearchTerm);
    } else {
      this.fetchData();
    }
  }

  fetchData = async (searchData?: string) => {
    this.setState({ isLoading: true });
    try {
      const data = await getSpecies(searchData);
      if (Array.isArray(data)) {
        this.setState({ results: data, isLoading: false });
      } else {
        this.setState({ error: true, isLoading: false });
      }
    } catch (error) {
      this.setState({
        error: true,
        isLoading: false,
      });
    }
  };

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    this.fetchData(trimmedSearchTerm);
  };

  render() {
    const { searchTerm, results, error, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="loader-wrapper">
          <div className="loader" />
        </div>
      );
    }

    if (error) {
      return <div>Something went wrong...</div>;
    }

    return (
      <div className="search-container">
        <div className="search-container-control">
          <input
            type="text"
            className="input"
            value={searchTerm}
            onChange={this.handleSearchInputChange}
          />
          <button type="button" className="btn" onClick={this.handleSearch}>
            Search
          </button>
        </div>
        <div>
          <SpeciesList species={results} />
        </div>
      </div>
    );
  }
}
