export interface IPaginationProps {
  page: number;
  count: number;
  pageSize: number;
  onPageChange: (evt: any, page: number) => void;
}
