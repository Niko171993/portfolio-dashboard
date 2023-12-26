import './users.scss';
import DataTable from '../../components/dataTable/DataTable';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Add from '../../components/add/Add';
// import { useQuery } from 'react-query';
import { userRows } from '../../data';
// const rows: GridRowsProp = [
//   { id: 1, col1: 'Hello', col2: 'World', status: true },
//   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];
import { sub } from 'date-fns';
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Avatar',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'firstName',
    type: 'string',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    type: 'string',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Phone',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
    type: 'string',
  },
  {
    field: 'verified',
    headerName: 'Verified',
    width: 150,
    type: 'boolean',
  },
];
const Users = () => {
  const [open, setOpen] = useState(false);
  const [realRows, setRealRows] = useState(() => {
    let min = 1;
    const newRows = userRows.map((row) => {
      return {
        ...row,
        date: sub(new Date(), { minutes: min++ }).toISOString(),
      };
    });
    return newRows;
  });

  const [myUser, setMyUser] = useState({
    id: '',
    img: '',
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    createdAt: '',
    verified: false,
  });
  // const { isLoading, data, refetch } = useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: () => {
  //     return fetch('http://localhost:8800/api/users').then((res) => res.json());
  //   },
  // });
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={handleOpen}>Add New User</button>
      </div>

      {/* {isLoading ? (
        'loading...'
      ) : (
        <DataTable slug="users" rows={userRows} columns={columns} />
      )} */}
      <DataTable
        slug="users"
        rows={realRows}
        columns={columns}
        setRealRows={setRealRows}
      />
      {open && (
        <Add
          setOpen={setOpen}
          slug="user"
          columns={columns}
          myUser={myUser}
          setMyUser={setMyUser}
          setRealRows={setRealRows}
          realRows={realRows}
        />
      )}
    </div>
  );
};
export type setUsersRowsType = {
  date: string;
  id: number;
  img: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  createdAt: string;
  verified?: boolean;
};
export default Users;
