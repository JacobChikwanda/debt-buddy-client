import { FunctionComponent } from "react";
import styles from "./CustomerForm.module.css";

type CustomerFormType = {
  onClose?: () => void;
};

const CustomerForm: FunctionComponent<CustomerFormType> = ({ onClose }) => {
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
          />
        </div>
        <div className={styles.frameDiv2}>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div className={styles.frameDiv1}>
        <div className={styles.frameDiv2}>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="First Name"
            required
          />
        </div>
        <div className={styles.frameDiv2}>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div className={styles.frameDiv7}>
        <input
          className={styles.homeAddressInput}
          type="email"
          placeholder="Email"
        />
      </div>
      <div className={styles.frameDiv8}>
        <button className={styles.frameButton}>
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
