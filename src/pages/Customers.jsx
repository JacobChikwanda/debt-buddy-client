import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PortalDrawer from "../components/PortalDrawer";
import DebtForm from "../components/DebtForm";
import PortalPopup from "../components/PortalPopup";
import ProfileForm from "../components/ProfileForm";
import CustomerForm from "../components/CustomerForm";
import styles from "./Customers.module.css";
import DataTable from "../components/DataTable";
import debtApi from "../api/debtBuddy";
import alertPopup from "../misc/notifiers";
import Skeleton from "react-loading-skeleton";

const Customers = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDebtFormPopupOpen, setDebtFormPopupOpen] = useState(false);
  const [isProfileFormPopupOpen, setProfileFormPopupOpen] = useState(false);
  const [isProfileFormPopup1Open, setProfileFormPopup1Open] = useState(false);
  const [isCustomerFormPopupOpen, setCustomerFormPopupOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(false)

  const navigate = useNavigate();

  const sessionData = sessionStorage.getItem('user')?.toString() || ''
  const userData = JSON.parse(sessionData);

  useEffect(() => {
    if (!sessionStorage.getItem('user')) {
      navigate('/')
    }

    setLoading(true)

    debtApi(userData.token).get('/customers')
    .then(res => {
      if (res.data.success) {
        setLoading(false);
        setCustomers(res.data.yourCustomers)
      } else {
        alertPopup(res.data);
      }
    })

  }, [reload, setReload])


  const handleDelete = ({id=0}) => {
    debtApi(userData.token).delete(`/customers/${id}`)
    .then(res => {
      if (res.data.success) {
        alertPopup(res.data);
        setReload(!reload)
      } else {
        alertPopup(res.data);
      }
    })
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  }

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const openDebtFormPopup = useCallback(() => {
    setDebtFormPopupOpen(true);
  }, []);

  const closeDebtFormPopup = useCallback(() => {
    setDebtFormPopupOpen(false);
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

  const openCustomerFormPopup = useCallback(() => {
    setCustomerFormPopupOpen(true);
  }, []);

  const closeCustomerFormPopup = useCallback(() => {
    setCustomerFormPopupOpen(false);
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
      <div className={styles.customersDiv}>
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
                    src="../homeicon1.svg"
                  />
                  <b className={styles.customersB}>Dashboard</b>
                </Link>
                <a className={styles.customerA}>
                  <img
                    className={styles.debtorsIcon}
                    alt=""
                    src="../debtorsicon1.svg"
                  />
                  <b className={styles.customersB}>Customers</b>
                </a>
                <Link className={styles.dashboard} to="/debts1">
                  <img
                    className={styles.managementIcon}
                    alt=""
                    src="../managementicon2.svg"
                  />
                  <b className={styles.customersB}>Debts</b>
                </Link>
                <a
                  onClick={openDebtFormPopup} 
                  className={styles.addDebtButton}
                >
                  <img
                    className={styles.addDebtIcon}
                    alt=""
                    src="../adddebticon.svg"
                  />
                  <b className={styles.customersB}>New Debt</b>
                </a>
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
                  onClick={openDebtFormPopup}
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
            <div className={styles.contentDiv1}>
              <h1 className={styles.frameH1}>
                <b className={styles.logoutB}>Customers</b>
              </h1>
              <button
                className={styles.frameButton1}
                onClick={openCustomerFormPopup}
              >
                <b className={styles.addCustomerB}>Add Customer</b>
              </button>
              {
                  loading
                ?
                  <Skeleton />
                :
                  <DataTable data={customers} handleDelete={handleDelete}/>

              }
            </div>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Left"
          onOutsideClick={closeSidebar}
        >
          <Sidebar onClose={closeSidebar} />
        </PortalDrawer>
      )}
      {isDebtFormPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDebtFormPopup}
        >
          <DebtForm onClose={closeDebtFormPopup} />
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
      {isCustomerFormPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeCustomerFormPopup}
        >
          <CustomerForm onClose={closeCustomerFormPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default Customers;
