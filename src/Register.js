import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMath, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.text(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.text(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidName(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg"  : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>

                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onCharge={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 Characters.<br />
                    Must be with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            </form>
        </section>
    )
}

export default Register