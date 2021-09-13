import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';


export default function AddAdmin() {

  const [state, setstate] = useState('')

  const handleSubmit = async () =>{
   if(state.length > 0){
     //SUBMIT HERE..

     const data = { email : state }
      const response = await axios.post(`/api/auth/register/admin`, data , {
        headers: { 'Content-Type': 'application/json' }
      });

      confirmAlert({
        customUI: ({ onClose }) => {
  
          return (
            <div className='custom-ui'>
              <h1>{response.data.message}</h1>
              <button onClick={onClose}>close</button>
            </div>
          );
        }
      });


   }else{
    confirmAlert({
      customUI: ({ onClose }) => {

        return (
          <div className='custom-ui'>
            <h1>Please Enter a valid email 🙏</h1>
            <button onClick={onClose}>close</button>
          </div>
        );
      }
    });

   }
  }
    return (
      <div className="container">
      
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle  style={{width: '400px', height:'60px'}}/>
          </Grid>
          <Grid item>
            <TextField onChange={(e)=> setstate(e.target.value)} 
              style={{width: '400px', height:'80px'}} 
              id="input-with-icon-grid" 
              label="  Enter User Email"
              name="email" 
              value={state}   
            />

          </Grid>
        </Grid>

        <Button onClick={handleSubmit} variant="contained" color="primary">
           Submit
        </Button>

        

      </div>
  

    )
}
