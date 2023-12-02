import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import for Axios
import SubmitSpinner from '../components/SubmitSpinner';
import Logo from  '../assets/logo/ExpenseTracker.png'
const BASE_URL = 'https://expensetrackerapp-2nwp.onrender.com/';


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  

  // form submit antd takes values instead of events
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}api/v1/users/login`, values);
      setLoading(false);
      message.success('Login Successful');

      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      // Message.error(error.response.data.message)
      setLoading(false);
      message.error('Invalid Credentials');
    }
  };


  // prevent for if user login then user should not access register and login page till logout
useEffect(() =>{

  if(localStorage.getItem('user')){
      navigate('/')
  }  
}, [navigate])

  return (
    <>

      <div className='register-page container-fluid d-flex justify-content-center'>
        <div className='row  d-flex justify-content-center ' style={{height:'70%', width:'100%'}}>
        <Form layout='vertical' onFinish={submitHandler} className='col-12 col-sm-8 col-md-6 col-lg-4 p-4 bx-sd2 bg-white rounded' >
          
          <div className='d-flex justify-content-between'>
          <img src={Logo}/>
        <h4 className='text-center'>Login</h4>
          </div>
       <hr/>
          <Form.Item label='Email' name='email'>
            <Input  className='input-border'     style={{ borderColor: '#333' }} placeholder='Enter your email' required/>
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input  className='input-border'     style={{ borderColor: '#333'}} type='password' placeholder='Enter your password' required  />
          </Form.Item>
          <div className='d-flex justify-content-between'>
            <Link to='/expense-tracker/user/register'>Not a User? Click Here to Register </Link>
            {
              loading ? <SubmitSpinner/> :
              <button className='btn btn-primary' htmlType='submit'>
              Login
            </button>
            } 
          </div>
        </Form>
        </div>
      </div>
    
    </>
  );
};

export default Login;
