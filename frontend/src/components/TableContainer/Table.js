import React, {useState} from 'react';
import {useTable, usePagination} from 'react-table';
import './table.css';

const Table = ({data, columns}) => {
    const [pageSizeOptions, setPageSizeOptions] = useState([5, 10, 20, 30]);

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
    };

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
        state: {pageIndex, pageSize},
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0, pageSize: 5},
        },
        usePagination
    );

    const pageCount = Math.ceil(data.length / pageSize);

    return (
        <div>
            <table {...getTableProps()} className="table">
                <thead>
                {headerGroups.map((headerGroup,headerGroupIndex) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                        {headerGroup.headers.map((column,columnIndex) => (
                            <th {...column.getHeaderProps()} key={columnIndex}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row,rowIndex) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={rowIndex}>
                            {row.cells.map((cell,cellIndex) => {
                                return <td {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    className={`pagination-button ${!canPreviousPage ? 'disabled' : ''}`}
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                >
                    {'<<'}
                </button>
                <button
                    className={`pagination-button ${!canPreviousPage ? 'disabled' : ''}`}
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                >
                    {'<'}
                </button>
                <span className="page-info">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <button
                    className={`pagination-button ${!canNextPage ? 'disabled' : ''}`}
                    onClick={nextPage}
                    disabled={!canNextPage}
                >
                    {'>'}
                </button>
                <button
                    className={`pagination-button ${!canNextPage ? 'disabled' : ''}`}
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {'>>'}
                </button>
                <select value={pageSize} onChange={handlePageSizeChange} className="page-size-select">
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size} rows
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Table;