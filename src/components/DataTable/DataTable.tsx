import { useState, useMemo } from "react";
import "./DataTable.css";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export const DataTable = <T extends Record<string, string | number | boolean>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortConfig((currentSort) => {
      if (!currentSort || currentSort.key !== column.dataIndex) {
        return { key: column.dataIndex, direction: "asc" };
      }

      if (currentSort.direction === "asc") {
        return { key: column.dataIndex, direction: "desc" };
      }

      return null;
    });
  };

  const handleRowSelect = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (selectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
    onRowSelect?.(Array.from(newSelectedRows).map((idx) => sortedData[idx]));
  };

  const handleSelectAll = () => {
    if (selectedRows.size === sortedData.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const allIndexes = new Set(sortedData.map((_, index) => index));
      setSelectedRows(allIndexes);
      onRowSelect?.(sortedData);
    }
  };

  if (loading) {
    return <div className="data-table-loading">Loading...</div>;
  }

  if (!data.length) {
    return <div className="data-table-empty">No data available</div>;
  }

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {selectable && (
              <th className="checkbox-column">
                <input
                  type="checkbox"
                  checked={selectedRows.size === sortedData.length}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column)}
                className={`
                  ${column.sortable ? "sortable-header" : ""}
                  ${
                    sortConfig?.key === column.dataIndex
                      ? `sorted-${sortConfig.direction}`
                      : ""
                  }
                `}
              >
                {column.title}
                {column.sortable && (
                  <span className="sort-indicator">
                    {sortConfig?.key === column.dataIndex
                      ? sortConfig.direction === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={selectedRows.has(index) ? "selected-row" : ""}
              onClick={() => selectable && handleRowSelect(index)}
            >
              {selectable && (
                <td className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(index)}
                    onChange={() => handleRowSelect(index)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key}>{row[column.dataIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
