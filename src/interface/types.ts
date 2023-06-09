type SearchData = {
  value: string;
  label: string;
};

type SearchProps = {
  onSearchChange: Function;
  setLoading: Function;
  setError: Function;
  loading: boolean;
};

type FormValues = {
  addressType: string;
  streetNumber: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  benchmark: string;
};

export type { SearchData, SearchProps, FormValues };
