import { useState } from 'react';
import DataTable from '../../components/dataTable/DataTable';
import './products.scss';
import Add from '../../components/add/Add';
import { GridColDef } from '@mui/x-data-grid';
import { products } from '../../data';
import { sub } from 'date-fns';
// import { setUsersRowsType } from '../users/Users';
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'title',
    type: 'string',
    headerName: 'Title',
    width: 250,
  },
  {
    field: 'color',
    type: 'string',
    headerName: 'Color',
    width: 150,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Price',
    width: 200,
  },
  {
    field: 'producer',
    headerName: 'Producer',
    type: 'string',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 100,
    type: 'string',
  },
  {
    field: 'inStock',
    headerName: 'In Stock',
    width: 150,
    type: 'boolean',
  },
];
const Products = () => {
  const [open, setOpen] = useState(false);
  const [myProduct, setMyProduct] = useState({
    inStock: false,
    createdAt: '',
    product: '',
    price: 0,
    color: '',
    title: '',
  });
  const [realRows, setRealRows] = useState(() => {
    let min = 1;
    const newRows = products.map((row) => {
      return {
        ...row,
        date: sub(new Date(), { minutes: min++ }).toISOString(),
      };
    });
    return newRows;
  });
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>
      <DataTable
        slug="products"
        rows={realRows}
        columns={columns}
        setRealRows={setRealRows}
      />
      {open && (
        <Add
          setOpen={setOpen}
          slug="product"
          columns={columns}
          myProduct={myProduct}
          setMyProduct={setMyProduct}
          realRows={realRows}
          setRealRows={setRealRows}
        />
      )}
    </div>
  );
};
export type ProductsRowsType = {
  date: string;
  id: number;
  img: string;
  title: string;
  color: string;
  producer: string;
  price: string;
  createdAt: string;
  inStock?: boolean;
};
export type ProductsSetRowsType = {
  date: string;
  id: number;
  img: string;
  title: string;
  color: string;
  producer: string;
  price: string;
  createdAt: string;
  inStock?: boolean;
};
export default Products;
