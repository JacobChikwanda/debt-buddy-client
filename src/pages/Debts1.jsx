import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DebtForm from "../components/DebtForm";
import PortalPopup from "../components/PortalPopup";
import Sidebar from "../components/Sidebar";
import PortalDrawer from "../components/PortalDrawer";
import ProfileForm from "../components/ProfileForm";
import styles from "./Debts.module.css";
import DebtDataTable from "../components/DataTableDebts";
import debtApi from "../api/debtBuddy";
import alertPopup from "../misc/notifiers";
import Skeleton from "react-loading-skeleton";

const Debts = () => {
  const [isDebtFormPopupOpen, setDebtFormPopupOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDebtFormPopup1Open, setDebtFormPopup1Open] = useState(false);
  const [isProfileFormPopupOpen, setProfileFormPopupOpen] = useState(false);
  const [isProfileFormPopup1Open, setProfileFormPopup1Open] = useState(false);
  const [isDebtFormPopup2Open, setDebtFormPopup2Open] = useState(false);

  const [loading, setLoading] = useState(false);
  const [debts, setDebts] = useState([]);
  const [reload, setReload] = useState(false)

  const navigate = useNavigate();

  const sessionData = sessionStorage.getItem('user')?.toString() || ''
  const userData = JSON.parse(sessionData);

  useEffect(() => {
    if (!sessionStorage.getItem('user')) {
      navigate('/')
    }

    setLoading(true)

    debtApi(userData.token).get('/debts')
    .then(res => {
      if (res.data.success) {
        setLoading(false);
        console.log(res.data)
        setDebts(res.data.cashRequests.alldebts)
      } else {
        alertPopup(res.data);
      }
    })

  }, [reload, setReload])

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  }

  const handleUpdate = ({id=0}) => {
    debtApi(userData.token).put(`/debts/${id}`)
    .then(res => {
      if (res.data.success) {
        alertPopup(res.data);
        setReload(!reload)
      } else {
        alertPopup(res.data);
      }
    })
  }

  const openDebtFormPopup = useCallback(() => {
    setDebtFormPopupOpen(true);
  }, []);

  const closeDebtFormPopup = useCallback(() => {
    setDebtFormPopupOpen(false);
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const openDebtFormPopup1 = useCallback(() => {
    setDebtFormPopup1Open(true);
  }, []);

  const closeDebtFormPopup1 = useCallback(() => {
    setDebtFormPopup1Open(false);
  }, []);

  const openProfileFormPopup = useCallback(() => {
    setProfileFormPopupOpen(true);
  }, []);

  const closeProfileFormPopup = useCallback(() => {
    setProfileFormPopupOpen(false);
  }, []);

  const openProfileFormPopup1 = useCallback(() => {
    setProfileFormPopup1Open(true);
  }, []);

  const closeProfileFormPopup1 = useCallback(() => {
    setProfileFormPopup1Open(false);
  }, []);

  const openDebtFormPopup2 = useCallback(() => {
    setDebtFormPopup2Open(true);
  }, []);

  const closeDebtFormPopup2 = useCallback(() => {
    setDebtFormPopup2Open(false);
  }, []);
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
      <div className={styles.debtsDiv}>
        <div className={styles.fixedSidebarDiv} data-animate-on-scroll>
          <div className={styles.sidebarDiv}>
            <div className={styles.linksAndTitleDiv}>
              <div className={styles.frameDiv}>
                <label className={styles.appTitleLabel}>Debt-Buddy</label>
              </div>
              <div className={styles.linksDiv}>
                <Link className={styles.dashboard} to="/dashboard">
                  <img
                    className={styles.homeIcon}
                    alt=""
                    src="../homeicon.svg"
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
                <a className={styles.debtsA}>
                  <img
                    className={styles.managementIcon}
                    alt=""
                    src="../managementicon.svg"
                  />
                  <b className={styles.customersB}>Debts</b>
                </a>
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
            <div className={styles.logoutButtonDiv} onClick={handleLogout}>
              <b className={styles.logoutB}>Logout</b>
            </div>
          </div>
        </div>
        <div className={styles.mainDiv}>
          <div className={styles.navigationDiv}>
            <div className={styles.navigationButtonsDiv}>
              <div className={styles.leftButtonsDiv}>
                <button className={styles.drawerButton} onClick={openSidebar}>
                  <img
                    className={styles.toggleSideBarButtonIcon}
                    alt=""
                    src="../togglesidebarbutton.svg"
                  />
                </button>
                <button
                  className={styles.addDebtButton1}
                  onClick={openDebtFormPopup1}
                >
                  <img
                    className={styles.addDebtIcon}
                    alt=""
                    src="../adddebticon1.svg"
                  />
                </button>
                <Link className={styles.debtsButtonA} to="/debts">
                  <img
                    className={styles.managementIcon}
                    alt=""
                    src="../managementicon1.svg"
                  />
                </Link>
              </div>
              <div className={styles.rightButtonsDiv}>
                <button
                  className={styles.avatarButton}
                  onClick={openProfileFormPopup}
                >
                  <img
                    className={styles.vectorIcon}
                    alt=""
                    src="../vector.svg"
                  />
                </button>
                <button
                  className={styles.frameButton}
                  onClick={openProfileFormPopup1}
                >
                  <img
                    className={styles.navMenuIcon}
                    alt=""
                    src="../navmenu.svg"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <h1 className={styles.frameH1}>
              <b className={styles.logoutB}>Debts</b>
            </h1>
            <button
              className={styles.frameButton1}
              onClick={openDebtFormPopup2}
            >
              <b className={styles.newDebt1}>New Debt</b>
            </button>
            {
                loading
              ?
                <Skeleton />
              :
                <DebtDataTable data={debts} handleUpdate={handleUpdate}/>
            }
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
      {isSidebarOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Left"
          onOutsideClick={closeSidebar}
        >
          <Sidebar onClose={closeSidebar} />
        </PortalDrawer>
      )}
      {isDebtFormPopup1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDebtFormPopup1}
        >
          <DebtForm onClose={closeDebtFormPopup1} />
        </PortalPopup>
      )}
      {isProfileFormPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeProfileFormPopup}
        >
          <ProfileForm onClose={closeProfileFormPopup} />
        </PortalPopup>
      )}
      {isProfileFormPopup1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeProfileFormPopup1}
        >
          <ProfileForm onClose={closeProfileFormPopup1} />
        </PortalPopup>
      )}
      {isDebtFormPopup2Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDebtFormPopup2}
        >
          <DebtForm onClose={closeDebtFormPopup2} />
        </PortalPopup>
      )}
    </>
  );
};

export default Debts;
