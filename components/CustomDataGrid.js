import {DataGrid
  } from '@material-ui/data-grid';

export default function CustomDataGrid({rows, columns}) {
    return (
        <DataGrid autoHeight={true} rows={rows} columns={columns} pageSize={5} disableSelectionOnClick />
    )
}