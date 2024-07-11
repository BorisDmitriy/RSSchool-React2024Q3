export interface OneSpecie {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
export interface SpecieItemProps {
  specieData: OneSpecie;
  id: string;
}

export interface SpeciesListProps {
  species: OneSpecie[];
}

export interface ErrResp {
  message: string;
  errors: Error[];
}

export interface SearchPathIState {
  searchTerm: string;
  results: OneSpecie[];
  error: boolean;
  isLoading: boolean;
}

export interface ErrorBoundaryIState {
  hasError: boolean;
}
export interface ErrorBoundaryProps {
  children: React.ReactNode;
}
export interface SimulatedErrorComponentIState {
  error: boolean;
}
export interface AppIState {}
