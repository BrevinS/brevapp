import { useRef, useState, useEffect } from 'react';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        //setUser('');
        //setPwd('');
        setSuccess(true);
        } 

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg"  : 
        "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1> Sign in </h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
                type="text"
                id="username"
                ref={userRef} 
                autoComplete="off"
                //onChange={(e) => SetUser(e.target.value)}
                value={user}
                required
            />
            <label htmlFor="password">Password:</label>
            <input 
                type="password"
                id="password"
                //onChange={(e) => SetPwd(e.target.value)}
                value={pwd}
                required
            />
            <button>Sign In</button>
        </form>
        <p>
            No Authentication? :(<br />
            <span className="line">
                <a href="#">Sign Up</a>
            </span>
        </p>
    </section>
    )
}

export default Login 