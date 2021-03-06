import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import axios from './api/axios'

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
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

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pwd}),
                {
                    headers: {'Context-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            errRef.current.focus();
        }
    } 

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in</h1>
                    <br />
                    <p>
                        <a href="#">Go home</a>
                    </p>
                </section>
            ) : (
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
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
            />

            <label htmlFor="password">Password:</label>
            <input 
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
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
        )}
        </>
    )
}

export default Login 