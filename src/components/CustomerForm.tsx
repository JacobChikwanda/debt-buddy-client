import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import debtApi from "../api/debtBuddy";
import alertPopup from "../misc/notifiers";
import styles from "./CustomerForm.module.css";

type CustomerFormType = {
  onClose?: () => void;
};



const CustomerForm: FunctionComponent<CustomerFormType> = ({ onClose }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();
  const sessionData = sessionStorage.getItem('user')?.toString() || ''
  const userData = JSON.parse(sessionData);

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

    if (!phoneNo) {
      alertPopup({message: 'Provide Phone No.', success: false})
      return
    }

    if (!address) {
      alertPopup({message: 'Provide Address', success: false})
      return
    }
    
    const customerData = {
      firstName,
      lastName,
      email,
      phoneNo,
      address
    }

    debtApi(userData.token).post('/customers', customerData)
    .then(res => {
      if (res.data.success) {
        alertPopup(res.data)
        navigate("/dashboard");
      } else {
        alertPopup(res.data)
      }
    })
  }

  return (
    <div className={styles.customerFormDiv}>
      <div className={styles.frameDiv}>
        <b className={styles.customerDetailsB}>Customer Details</b>
      </div>
      <div className={styles.frameDiv1}>
        <div className={styles.frameDiv2}>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.frameDiv2}>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.frameDiv1}>
        <div className={styles.frameDiv2}>
          <input
            className={styles.firstNameInput}
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.frameDiv2}>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="Phone Number"
            required
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.frameDiv7}>
        <input
          className={styles.homeAddressInput}
          type="text"
          placeholder="Address"
          required
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={styles.frameDiv8}>
        <button className={styles.frameButton} onClick={press}>
          <div className={styles.addDiv}>Add</div>
        </button>
        <button className={styles.frameButton1} onClick={onClose}>
          <div className={styles.addDiv}>Cancel</div>
        </button>
      </div>
    </div>
  );
};

export default CustomerForm;
