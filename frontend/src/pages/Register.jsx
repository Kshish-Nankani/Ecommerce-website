import React ,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/auth.css'
import Alert from '../components/Alert'

const Register= ()=>{
    const [name, setName] = useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register',{
                method:'POST',
                headers: {'content-Type' : 'application/json'},
                body: JSON.stringify({name, email, password})
            })
            const data = await res.json();
            if(res.ok){
                navigate('/verify-otp', { state: { email: data.email || email } });
            }
            else{
                setError(data.message)
            }
        } catch (error) {
           setError('Unable to connect to the server. Please try again.')
        }
    }
    return(
    <div className='auth-container'>
        <form onSubmit={handleSubmit} className='auth-form'>
        <h2>Register</h2>
        {error && <Alert>{error}</Alert>}
       <input type="text" placeholder='Full Name' 
       value={name} onChange={(e)=> setName(e.target.value)} required />

         <input type="email" placeholder='Email' 
       value={email} onChange={(e)=> setEmail(e.target.value)} required />

          <input type="password" placeholder='Password' 
       value={password} onChange={(e)=> setPassword(e.target.value)} required />
       <button type="Submit" className='btn'>Register</button>
   <p>Already have an account?  <Link to='/Login'> Login </Link></p>
        </form>
    </div>
    )
}

export default Register;