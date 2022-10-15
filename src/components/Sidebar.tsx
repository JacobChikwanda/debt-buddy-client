import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DebtForm from "../components/DebtForm";
import PortalPopup from "../components/PortalPopup";
import styles from "./Sidebar.module.css";

type SidebarType = {
  onClose?: () => void;
};

const Sidebar: FunctionComponent<SidebarType> = ({ onClose }) => {
  const [isDebtFormPopupOpen, setDebtFormPopupOpen] = useState(false);
  const navigate = useNavigate();

  const openDebtFormPopup = useCallback(() => {
    setDebtFormPopupOpen(true);
  }, []);

  const closeDebtFormPopup = useCallback(() => {
    setDebtFormPopupOpen(false);
  }, []);

  const onLogoutButtonLinkClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.sidebarDiv} data-animate-on-scroll>
        <div className={styles.sidebarDiv1}>
          <div className={styles.sidebarDiv2}>
            <div className={styles.linksAndTitleDiv}>
              <div className={styles.frameDiv}>
                <label className={styles.appTitleLabel}>Debt-Buddy</label>
              </div>
              <div className={styles.linksDiv}>
                <Link className={styles.dashboard} to="/dashboard">
                  <img
                    className={styles.homeIcon}
                    alt=""
                    src="../homeicon1.svg"
                  />
                  <b className={styles.customersB}>Dashboard</b>
                </Link>
                <Link className={styles.dashboard} to="/customers">
                  <img
                    className={styles.debtorsIcon}
                    alt=""
                    src="../debtorsicon.svg"
                  />
                  <b className={styles.customersB}>Customers</b>
                </Link>
                <Link className={styles.dashboard} to="/debts1">
                  <img
                    className={styles.managementIcon}
                    alt=""
                    src="../managementicon2.svg"
                  />
                  <b className={styles.customersB}>Debts</b>
                </Link>
                <button
                  className={styles.addDebtButton}
                  onClick={openDebtFormPopup}
                >
                  <img
                    className={styles.addDebtIcon}
                    alt=""
                    src="../adddebticon.svg"
                  />
                  <b className={styles.newDebt}>New Debt</b>
                </button>
              </div>
            </div>
            <Link
              className={styles.logoutButtonA}
              to="/"
              onClick={onLogoutButtonLinkClick}
            >
              <b className={styles.logoutB}>Logout</b>
            </Link>
          </div>
        </div>
      </div>
      {isDebtFormPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDebtFormPopup}
        >
          <DebtForm onClose={closeDebtFormPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default Sidebar;
