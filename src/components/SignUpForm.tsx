import { FunctionComponent, useState } from "react";
import { Dots } from "react-activity";
import { useNavigate } from "react-router-dom";
import debtApi from "../api/debtBuddy";
import alertPopup from "../misc/notifiers";
import styles from "./SignUpForm.module.css";

type SignUpFormType = {
  onClose?: () => void;
};

const SignUpForm: FunctionComponent<SignUpFormType> = ({ onClose }) => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const press = () => {

    if (!firstName) {
      alertPopup({message: 'Provide First Name', success: false})
      return
    }
    
    if (!lastName) {
      alertPopup({message: 'Provide Last Name', success: false})
      return
    }
    
    if (!email) {
      alertPopup({message: 'Provide Email', success: false})
      return
    }
    
    if (!password) {
      alertPopup({message: 'Provide Password', success: false})
      return
    }

    
    setLoading(true)

    const signUpData = {
      email, password, firstName, lastName
    }

    debtApi('').post('/users', signUpData)
    .then(res => {
      setLoading(false)
      if (res.data.success) {
        alertPopup(res.data)
        onClose?.()
        navigate("/");
      } else {
        alertPopup(res.data)
      }
    })
  }

  if (loading) {
    return (
      <Dots />
    )
  }

  return (
    <form className={styles.signUpForm}>
      <div className={styles.frameDiv}>
        <b className={styles.gladYouAreSigningUp}>Glad You Are Signing Up</b>
      </div>
      <div className={styles.frameDiv1}>
        <div className={styles.frameDiv2}>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="First Name"
            required
            onChange={event => setFirstName(event.target.value)}
          />
        </div>
        <div className={styles.frameDiv3}>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="Last Name"
            required
            onChange={event => setLastName(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.frameDiv4}>
        <input 
          className={styles.emailInput} 
          type="email" 
          placeholder="Email" 
          required 
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div className={styles.frameDiv5}>
        <input
          className={styles.passwordInput}
          type="password"
          placeholder="Password"
          required
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div className={styles.frameDiv6}>
        <button className={styles.frameButton} onClick={press}>
          <div className={styles.createDiv}>Create</div>
        </button>
        <button className={styles.frameButton1} onClick={onClose}>
          <div className={styles.createDiv}>Cancel</div>
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
