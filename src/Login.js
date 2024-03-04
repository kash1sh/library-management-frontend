import React, {useState } from 'react';

const Login = (props) =>{
    const {onUserChange}=props;
    const [value, setValue] = useState('');
    const [uset,setUser]=useState(null);

  const handleChange = event => {
    const result = event.target.value;
    setValue(result);
  };

  const login = ()=>{
    setUser(value);
    console.log(value);
    onUserChange(value);
  }

    return (
        <div>
     <input
        type="number"
        placeholder="Enter your UserId"
        value={value}
        onChange={handleChange}
      />
      <button onClick={login}>LOGIN</button>
        </div>
    )
}

export default Login;