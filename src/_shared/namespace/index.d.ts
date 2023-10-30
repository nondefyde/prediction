export interface Pagination {
    total: number;
    pageSize: number;
    current: number;
    onChange: (page: number, pageSize: number) => void;
    showSizeChanger?: boolean;
  }