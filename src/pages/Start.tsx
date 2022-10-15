import { FunctionComponent, useState, useCallback } from "react";
import LoginForm from "../components/LoginForm";
import PortalPopup from "../components/PortalPopup";
import SignUpForm from "../components/SignUpForm";
import styles from "./Start.module.css";

const Start: FunctionComponent = () => {
  const [isLoginFormPopupOpen, setLoginFormPopupOpen] = useState(false);
  const [isSignUpFormOpen, setSignUpFormOpen] = useState(false);

  const openLoginFormPopup = useCallback(() => {
    setLoginFormPopupOpen(true);
  }, []);

  const closeLoginFormPopup = useCallback(() => {
    setLoginFormPopupOpen(false);
  }, []);

  const openSignUpForm = useCallback(() => {
    setSignUpFormOpen(true);
  }, []);

  const closeSignUpForm = useCallback(() => {
    setSignUpFormOpen(false);
  }, []);

  return (
    <>
      <div className={styles.startDiv}>
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
        <div className={styles.frameDiv1}>
          <button className={styles.frameButton} onClick={openLoginFormPopup}>
            <div className={styles.loginDiv}>Login</div>
          </button>
          <button className={styles.frameButton1} onClick={openSignUpForm}>
            <div className={styles.loginDiv}>Sign Up</div>
          </button>
        </div>
      </div>
      {isLoginFormPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeLoginFormPopup}
        >
          <LoginForm onClose={closeLoginFormPopup} />
        </PortalPopup>
      )}
      {isSignUpFormOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignUpForm}
        >
          <SignUpForm onClose={closeSignUpForm} />
        </PortalPopup>
      )}
    </>
  );
};

export default Start;
