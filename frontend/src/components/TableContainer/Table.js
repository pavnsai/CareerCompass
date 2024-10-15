import React from 'react';
import { useTable, usePagination } from 'react-table';
import './table.css';

const Table = ({ data, columns }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        gotoPage,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex, pageSize },
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    );

    const pageCount = Math.ceil(data.length / pageSize);

    return (
        <div className="table-container">
        <div className="table-responsive">
            <div className="table-wrapper">
                <table {...getTableProps()} className="table">
                    <thead>
                    {headerGroups.map((headerGroup, headerGroupIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th {...column.getHeaderProps()} key={columnIndex}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={rowIndex}>
                                {row.cells.map((cell, cellIndex) => {
                                    return <td {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <div className="pagination-controls">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'First'}</button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'Prev'}</button>
                    <span>
                        Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>{'Next'}</button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'Last'}</button>
                </div>
                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 20, 30].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        </div>
    );
};

export default Table;