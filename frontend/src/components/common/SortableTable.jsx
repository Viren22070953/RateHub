import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

const SortableTable = ({ columns, data, sortBy, order, onSort, emptyMessage = "No data found." }) => {
  const renderSortIcon = (columnKey) => {
    if (sortBy !== columnKey) return <ChevronsUpDown size={14} />;
    return order === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.sortable === false ? (
                  column.label
                ) : (
                  <button
                    className={`${sortBy === column.key ? "sort-active" : ""} ${sortBy === column.key && order === "desc" ? "sort-desc" : ""}`}
                    type="button"
                    onClick={() => onSort?.(column.key)}
                  >
                    {column.label}
                    {renderSortIcon(column.key)}
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="empty-cell" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id || `${row.email}-${row.created_at}`}>
                {columns.map((column) => (
                  <td key={column.key} data-label={column.label}>
                    {column.render ? column.render(row) : row[column.key] || "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
