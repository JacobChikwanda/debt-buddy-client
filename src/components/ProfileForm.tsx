import { FunctionComponent } from "react";
import styles from "./ProfileForm.module.css";

type ProfileFormType = {
  onClose?: () => void;
};

const ProfileForm: FunctionComponent<ProfileFormType> = ({ onClose }) => {
  return (
    <div className={styles.profileFormDiv}>
      <div className={styles.frameDiv}>
        <b className={styles.myProfileB}>My Profile</b>
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
        <div className={styles.frameDiv3}>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div className={styles.frameDiv4}>
        <input className={styles.emailInput} type="email" placeholder="Email" />
      </div>
      <div className={styles.frameDiv5}>
        <input
          className={styles.passwordInput}
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <div className={styles.frameDiv6}>
        <button className={styles.frameButton}>
          <div className={styles.updateDiv}>Update</div>
        </button>
        <button className={styles.frameButton1} onClick={onClose}>
          <div className={styles.updateDiv}>Cancel</div>
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
