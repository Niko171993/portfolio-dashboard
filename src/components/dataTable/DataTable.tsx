import './datatable.scss';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
// import { useMutation, useQueryClient } from 'react-query';

type Props = {
  rows: GridRowsProp;
  columns: GridColDef | any;
  slug: string;
  setRealRows: (data: any) => void;
  // check this
};
const DataTable = ({ rows, columns, slug, setRealRows }: Props) => {
  const sortedRows = [...rows].sort((a, b) => b.id - a.id);

  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: (id: number) => {
  //     return fetch(`http://localhost:8800/api/${slug}/${id}`, {
  //       method: 'delete',
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([`all${slug}`]);
  //   },
  // });
  // const handleDelete = (id: number) => {
  //   mutation.mutate(id);
  // };
  const handleDelete = (id: number) => {
    setRealRows((rows: GridRowsProp) => {
      return rows.filter((item) => item.id !== id);
    });
    alert('deleted');
  };
  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: (params: any) => {
      return (
        <div className="action">
          <Link to={`/${slug}/${params.row.id}`}>
            <img src="/view.svg" alt="view" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="./delete.svg" alt="delete" />
          </div>
        </div>
      );
    },
  };
  return (
    <div className="dataTable">
      <div style={{ height: '100%', width: '99%' }}>
        <DataGrid
          className="dataGrid"
          rows={sortedRows}
          columns={[...columns, actionColumn]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DataTable;
