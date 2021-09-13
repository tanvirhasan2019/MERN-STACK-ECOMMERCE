import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import {SendNewsLetter} from './actions';
import { useDispatch } from 'react-redux';

export default function Sendmail() {
    const emails = useSelector(state => state.productMailReducer);
    const dispatch = useDispatch()

   const handleSubmit = () =>{
     dispatch(SendNewsLetter(emails))
   }

  
    return (
        <div className="row">
            <div className="col-6 col-xm-12">
             <p>SELECTED USERS</p>
             <ul class="list-group">
                {
                   emails.users.map(item=>
                    <li className="list-group-item">{item}</li>
                    ) 
                }
            </ul>
            </div>
            <div className="col-6 col-xm-12">
            <p>SELECTED PRODUCTS ID</p>
            <ul className="list-group">
                {
                   emails.products.map(item=>
                    <li className="list-group-item">{item}</li>
                    ) 
                }
            </ul>
            </div>
           
    
            <div className="col-12">
               {
                   emails.users.length <= 0 && emails.products.length <= 0 ? 
                   <Alert severity="warning">
                     <AlertTitle>Warning</AlertTitle>
                         please select user and products
                     </Alert>  : 
                     <Button onClick={handleSubmit} style={{width:'100%'}} variant="contained">SEND</Button>

               }
            </div>
            

        </div>
    )
}
