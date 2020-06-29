import React from 'react';
import { TablePagination } from '@material-ui/core';
import { IPaginationProps } from './interface';

export const Pagination = ({
  page,
  pageSize,
  count,
  onPageChange,
}: IPaginationProps) => (
  <TablePagination
    component="nav"
    page={page}
    rowsPerPage={pageSize}
    count={count}
    rowsPerPageOptions={[]}
    onChangePage={onPageChange}
  />
);
