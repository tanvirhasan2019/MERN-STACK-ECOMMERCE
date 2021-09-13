/**
 *
 * UserList
 *
 */

import React , {useState} from 'react';

import { formatDate } from '../../../helpers/date';
import UserRole from '../UserRole';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import {DeleteUsers} from '../../../containers/Users/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {AddUserToMail} from '../../../containers/Mail/actions';


const UserList = props => {
  const { users , user_mail_selection } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setstate] = useState([])
   
  const handleClickDeleteUser = async (email) =>{

    dispatch(DeleteUsers(email));

  }

  const handleChange = (event) => {
    
   };

  const HandleClickChange = (_id) =>{  

    const isIdExist = state.includes(_id) ? true : false ;
    if(isIdExist){
      var newArray = state.filter((value)=>value!=_id);
      setstate(newArray)
      dispatch(AddUserToMail(newArray))
    }else{
      setstate([...state, _id])
      dispatch(AddUserToMail([...state, _id]))
    }

  }



  return (
    <div className='u-list'>
      <p className='fw-1'>{users.length} results</p>
      {users.map((user, index) => (
        <>
        <div key={index} className='mt-3 px-4 py-3 user-box'>
          <label className='text-black'>Name</label>
          <p className='fw-2'>
            {user?.firstName ? `${user?.firstName} ${user?.lastName}` : 'N/A'}
          </p>
          <label className='text-black'>Email</label>
          <p>{user?.email}</p>
          <label className='text-black'>Provider</label>
          <p>{user?.provider}</p>
          <label className='text-black'>Account Created</label>
          <p>{formatDate(user?.created)}</p>
          <label className='text-black'>Role</label>
          <p className='mb-0'>
            <UserRole user={user} className='d-inline-block mt-2' />
          </p>
          <Button
            style={{backgroundColor:'rgb(220, 0, 78)', marginTop:'10px'}}
            variant="contained"
            color="secondary"
            onClick={()=> handleClickDeleteUser(user.email)}
            
            
          >
           <div style={{color:'white'}}> Delete </div>
          </Button>

        </div>
          {
              user_mail_selection ? <FormControlLabel
              key={user.email}
              control={
                  <Checkbox 
                    checked={
                      state.includes(user.email) ? true : false
                      }
                    onClick={()=> HandleClickChange(user.email)} 
                    onChange={handleChange} name={user.email}/>
                  }
              label="SELECT USER"
              /> : null
          }
           
         

        </>
      ))}
    </div>
  );
};

export default UserList;
