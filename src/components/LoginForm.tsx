import { FunctionComponent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { toast } from 'react-toastify';
import { useLogin } from "../context/LoginProvider";
import { loginCredentials } from "../temp-data/LoginData";
import { Dots } from "react-activity";
import debtApi from "../api/debtBuddy";
import alertPopup from "../misc/notifiers";

type LoginFormType = {
  onClose?: () => void;
};

const LoginForm: FunctionComponent<LoginFormType> = ({ onClose }) => {
  const navigate = useNavigate();
  const { setUserDetails } = useLogin();

  // Inputs
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const press = () => {

    
    if (!email) {
      alertPopup({message: 'Provide Email', success: false})
      return
    }
    
    if (!password) {
      alertPopup({message: 'Provide Password', success: false})
      return
    }
    
    setLoading(true)

    const loginData = {
      email, password
    }

    debtApi('').post('/users/login', loginData)
    .then(res => {
      setLoading(false)
      if (res.data.success) {
        alertPopup(res.data)
        setUserDetails(res.data.user);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        alertPopup(res.data)
        setUserDetails(null)
      }
    })
  }

  if (loading) {
    return (
      <Dots />
    )
  }

  return (
    <form className={styles.loginFormDiv}>
      <div className={styles.frameDiv}>
        <b className={styles.welcomeSignIn}>Welcome, Sign In</b>
      </div>
      <div className={styles.frameDiv1}>
        <input required onChange={event => setEmail(event.target.value)} className={styles.emailInput} type="email" placeholder="Email" />
      </div>
      <div className={styles.frameDiv2}>
        <input
          className={styles.passwordInput}
          onChange={event => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <div className={styles.frameDiv3}>
        <button className={styles.frameButton} onClick={press}>
          <div className={styles.loginDiv}>Login</div>
        </button>
        <button className={styles.frameButton1} onClick={onClose}>
          <div className={styles.loginDiv}>Cancel</div>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
