import {useState,useContext} from 'react';
import {Box,TextField,Button,styled,Typography} from '@mui/material'
import {API} from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';
import {useNavigate} from 'react-router-dom';

const Component=styled(Box)`
    width:400px;
    margin: auto;
    background:#fff3e0;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image=styled('img')({
    width:350,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0'
})

const Wrapper= styled(Box)`
    padding : 25px 30px;
    display: flex;
    flex:1;
    flex-direction:column;

    & > div, & > button, & >p{
        margin-top: 20px;
    }
`

const LoginButton =styled(Button)`
    background: #fb641b;
    color: white;
    height: 48px;
    border-radius: 2px;
`

const SignupButton =styled(Button)`

    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Text= styled(Typography)`

    color:#878787;
    font-size:15px;
`

const Main= styled('div')`
margin:0;
height:100%;
width:100%;
background:url('https://i.ibb.co/R6HRq8j/Untitled-design-3.jpg') ;
    
`

const loginInitialValues={
    username:'',
    password:''
}

const signupInitialValues={
    name:'',
    username:'',
    password:''
}

const Login= ({isUserAuthenticated})=>
{


    const [account,toggleAccount]=useState('login');
    const [signup,setSignup]=useState(signupInitialValues);
    const[login,setLogin]=useState(loginInitialValues);
    const [error,setError]=useState('');

    const { setAccount } = useContext(DataContext);
    const navigate=useNavigate();
    

    const toggleSignup=()=>{
        account==='login'?toggleAccount('signup'):toggleAccount('login');
        setError('');

    }

    const onInputChange=(e)=>
    {
        setSignup({...signup,[e.target.name]:e.target.value});
    }

     const signupUser=async()=>{
        try{
            
            let response= await API.userSignup(signup);
            if (response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                setLogin({
                    username:signup.username,
                    password:''
                })
                toggleAccount('login');
            }
            else {
                setError('Something went wrong! please try again later');
            }
        
        }
        catch(error)
        {
            console.log(error);
            setError('Something went wrong! please try again later');
            console.log('here');
            
        }
    }

    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value});

    }

    const loginUser = async () => {

        try{
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true);
            // setLogin(loginInitialValues);
            navigate('/');
        } else {
            setError('Something went wrong! please try again later');
        }
    }
    
        catch(error)
        {
            console.log(error);
            setError('Something went wrong! please try again later');
            console.log('here');
            
        }
    }
    
       
    // const imageURL = `try.jpg`;
     

    const imageURL = 'https://i.ibb.co/h7d3XC6/try.jpg';
    return(
        <Main>
        <Component>
            <Box>
            <Image src={imageURL} alt="login" />
            {
            account==='login' ?
           <Wrapper>
           <TextField variant="standard" value={login.username} onChange={(e)=>onValueChange(e)} name="username" label="Enter Username" />
             <TextField variant="standard" type="password" value={login.password} onChange={(e)=>onValueChange(e)} name="password" label="Enter Password" />
            {error&&<Error>{error}</Error>}

             <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
              <Text style={{textAlign :`center`}}>OR</Text>
             <SignupButton onClick={()=>toggleSignup()}>Create An Account</SignupButton>
            </Wrapper> 
        :
            <Wrapper>
            <TextField variant="standard" value={signup.name}onChange={(e)=>onInputChange(e)} name="name" label="Enter Name" />
            <TextField variant="standard" value={signup.username}onChange={(e)=>onInputChange(e)} name="username" label="Enter Username" />
            <TextField variant="standard" value={signup.password}onChange={(e)=>onInputChange(e)} name="password" label="Enter Password" />


            {error&&<Error>{error}</Error>}
            <SignupButton onClick={()=>signupUser()}>Register</SignupButton>
            <Text style={{textAlign :`center`}}>OR</Text>
            <LoginButton variant="contained" onClick={()=>toggleSignup()}>Already have an account</LoginButton>
            </Wrapper>
            }


            </Box>
        </Component>
        </Main>
        
    )
}

export default Login;