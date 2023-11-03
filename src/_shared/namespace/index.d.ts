export interface Pagination {
    total: number;
    pageSize: number;
    current: number;
    onChange: (page: number, pageSize: number) => void;
    showSizeChanger?: boolean;
  }
  
  export interface DataItem {
    predictions: string[]; 
    teams: Record<string, any>[];
    _id: string;
    id: string;
  }