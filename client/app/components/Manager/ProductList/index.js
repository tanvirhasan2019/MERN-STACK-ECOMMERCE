/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {AddProductToMail} from '../../../containers/Mail/actions';
import { useDispatch } from 'react-redux';


const ProductList = props => {
  const { products , product_mail_selection} = props;
  const dispatch = useDispatch()
  
  const [state, setState] = React.useState([]);

  const handleChange = (event) => {
  };

  const HandleClickChange = (_id) =>{  

    const isIdExist = state.includes(_id) ? true : false ;
    if(isIdExist){
      var newArray = state.filter((value)=>value!=_id);
      setState(newArray)
      dispatch(AddProductToMail(newArray))
    }else{
      setState([...state, _id])
      dispatch(AddProductToMail([...state, _id]))
    }

  }

  return (
    <div className='p-list'>
      {products.map((product, index) => (
        <>
        <Link
          to={`/dashboard/product/edit/${product._id}`}
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 product-box'
        >
          <img
            className='item-image'
            src={`${
              product && product.imageUrl
                ? product.imageUrl
                : '/images/placeholder-image.png'
            }`}
          />
          <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
            <h4 className='text-truncate'>{product.name}</h4>
            <p className='mb-2 text-truncate'>{product.description}</p>
          </div>
        </Link>
         {
           product_mail_selection ? <FormControlLabel
           key={product._id}
           control={
               <Checkbox 
                  checked={
                    state.includes(product._id) ? true : false
                   }
                  onClick={()=> HandleClickChange(product._id)} 
                  onChange={handleChange} name={product._id}/>
                }
           label="Secondary"
         /> : null
         }
          
        </>

      ))}
    </div>
  );
};

export default ProductList;
