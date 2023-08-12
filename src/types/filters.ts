export interface FilterKey {
  type: 'country' | 'score';
  value: string;
}

export interface FilterOption extends FilterKey {
  label: string;
  values: string[];
}