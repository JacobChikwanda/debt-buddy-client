import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate();

  const onFrameButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFrameButton1Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.signUpDiv}>
      <div className={styles.frameDiv}>
        <b className={styles.appTitleB}>
          <p className={styles.debtBuddyP}>
            <span>Debt-Buddy</span>
          </p>
          <p className={styles.yourNumberOneDebtManager}>
            <span>your number one debt manager</span>
          </p>
        </b>
      </div>
      <div className={styles.loginFormDiv}>
        <div className={styles.frameDiv1}>
          <b className={styles.appTitleB}>Glad You Are Signing Up</b>
        </div>
        <div className={styles.frameDiv2}>
          <input
            className={styles.firstNameInput}
            type="email"
            placeholder="First Name"
            required
          />
        </div>
        <div className={styles.frameDiv2}>
          <input
            className={styles.lastNameInput}
            type="email"
            placeholder="Last Name"
            required
          />
        </div>
        <div className={styles.frameDiv2}>
          <input
            className={styles.emailInput}
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.frameDiv2}>
          <input
            className={styles.passwordInput}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className={styles.frameDiv2}>
          <input
            className={styles.retypePasswordInput}
            type="password"
            placeholder="Retype Password"
            required
          />
        </div>
        <div className={styles.frameDiv7}>
          <button className={styles.frameButton} onClick={onFrameButtonClick}>
            <div className={styles.createDiv}>Create</div>
          </button>
          <button className={styles.frameButton1} onClick={onFrameButton1Click}>
            <div className={styles.createDiv}>Sign In</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
