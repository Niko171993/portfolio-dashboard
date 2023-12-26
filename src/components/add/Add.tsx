import { useEffect } from 'react';
import './add.scss';
import { GridColDef } from '@mui/x-data-grid';
import {
  ProductsRowsType,
  ProductsSetRowsType,
} from '../../pages/products/Products';
import { setUsersRowsType } from '../../pages/users/Users';
import ReactDOM from 'react-dom';
// import { useMutation, useQueryClient } from 'react-query';
type UserRowsType = {
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
type Props = {
  realRows:
    | (ProductsRowsType | ProductsRowsType[])
    | (UserRowsType | UserRowsType[]);

  setRealRows:
    | React.Dispatch<React.SetStateAction<ProductsSetRowsType[]>>
    | React.Dispatch<React.SetStateAction<setUsersRowsType[]>>;

  slug: string;
  columns: GridColDef[] | any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  myUser?: {
    [key: string]: any;
    id: string;
    img: string;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    createdAt: string;
    verified: boolean;
  };
  myProduct?: {
    [key: string]: any;
    inStock: boolean;
    createdAt: string;
    product: string;
    price: number;
    color: string;
    title: string;
  };
  setMyProduct?: React.Dispatch<
    React.SetStateAction<{
      inStock: boolean;
      createdAt: string;
      product: string;
      price: number;
      color: string;
      title: string;
    }>
  >;
  setMyUser?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      img: string;
      lastName: string;
      firstName: string;
      email: string;
      phone: string;
      createdAt: string;
      verified: boolean;
    }>
  >;
};
const Add = (props: Props) => {
  const { realRows } = props;
  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: () => {
  //     const apiUrl = `http://localhost:8800/api/${props.slug}s`;

  //     return fetch(apiUrl, {
  //       method: 'post',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(props.myUser || props.myProduct || {}),
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([`all${props.slug}s`]);
  //   },
  //   onSettled: () => {
  //     // Reset the user state here after the API call is settled
  //     props.setMyUser!({
  //       id: '',
  //       img: '',
  //       lastName: '',
  //       firstName: '',
  //       email: '',
  //       phone: '',
  //       createdAt: '',
  //       verified: false,
  //     });
  //   },
  // });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mutation.mutate();
    props.setRealRows((rows: any) => {
      return [
        ...rows,
        (props.myUser && props.myUser) || (props.myProduct && props.myProduct),
      ];
    });
    props.setOpen(false);
  };

  const handleStateUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastId =
      Array.isArray(realRows) && realRows.length > 0
        ? Number(realRows[realRows.length - 1].id)
        : 0;
    let name = e.target.name;
    let value: string | boolean = e.target.value;
    if (name === 'verified') {
      value = e.target.checked;
    }
    if (props.myUser && props.setMyUser) {
      props.setMyUser((myUser) => {
        return {
          ...myUser,
          id: `${lastId + 1}`,
          [name]: value,
          date: new Date().toISOString(),
        };
      });
    }
    if (props.myProduct && props.setMyProduct) {
      props.setMyProduct((myProduct) => {
        return {
          ...myProduct,
          id: `${lastId + 1} `,
          [name]: value,
        };
      });
    }
  };
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  });
  return ReactDOM.createPortal(
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>

        <form className="add-form" onSubmit={handleSubmit}>
          {props.columns
            .filter((item: any) => item.field !== 'id' && item.field !== 'img')
            .map((column: any) => {
              return (
                <div className="item" key={column.field}>
                  <div className="item-control">
                    <label>{column.headerName}</label>
                    <input
                      type={
                        column.field === 'verified' ||
                        column.field === 'inStock'
                          ? 'checkbox'
                          : column.type
                      }
                      placeholder={column.field}
                      name={column.field}
                      value={
                        (props.myUser && props.myUser[column.field!]) ||
                        (props.myProduct && props.myProduct[column.field!]) ||
                        ''
                      }
                      onChange={handleStateUpdate}
                    />
                  </div>
                </div>
              );
            })}
          <button>send</button>
        </form>
      </div>
    </div>,
    document.querySelector('.modal-container')!
  );
};

export default Add;
