import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DebtForm from "../components/DebtForm";
import PortalPopup from "../components/PortalPopup";
import Sidebar from "../components/Sidebar";
import PortalDrawer from "../components/PortalDrawer";
import ProfileForm from "../components/ProfileForm";
import styles from "./Dashboard.module.css";
import { useLogin } from "../context/LoginProvider";
import DataChart from "../components/DataChart";
import CustomerDataChart from "../components/CustomerDataChart";
import debtApi from "../api/debtBuddy";
import Skeleton from 'react-loading-skeleton'
import alertPopup from "../misc/notifiers";

interface totalProps {
  totalCustomers: number,
  totalPaidDebts: number,
  totalPendingDebts: number,
  totalUnPaidDebts: number
}

interface dataProps {
  month: number,
  number: number
}

interface chartDataProps {
  data: dataProps[]
}

const Dashboard: FunctionComponent = () => {
  const [isDebtFormPopupOpen, setDebtFormPopupOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDebtFormPopup1Open, setDebtFormPopup1Open] = useState(false);
  const [isProfileFormPopupOpen, setProfileFormPopupOpen] = useState(false);
  const [isProfileFormPopup1Open, setProfileFormPopup1Open] = useState(false);

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<chartDataProps>()
  const [paidDebts, setPaidDebts] = useState<chartDataProps>()
  const [unPaidDebts, setUnPaidDebts] = useState<chartDataProps>()
  const [pendingDebts, setPendingDebts] = useState<chartDataProps>()
  const [months, setMonths] = useState([])
  const [totals, setTotals] = useState<totalProps>()

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('user')) {
      navigate('/')
    }

    setLoading(true)

    const sessionData = sessionStorage.getItem('user')?.toString() || ''
    const userData = JSON.parse(sessionData);

    debtApi(userData.token).get('/reports/quarterly')
    .then(res => {
      if (res.data.success) {
        setLoading(false)
        setCustomers(res.data.customers);
        setPaidDebts(res.data.paidDebts);
        setUnPaidDebts(res.data.unpaidDebts);
        setPendingDebts(res.data.pendingDebts);
        setTotals(res.data.totals);
        setMonths(res.data.quarterlyMonths)
        console.log(res.data.customers)
      } else {
        alertPopup(res.data)
      }
    })


  }, [])

  const handleLogout = () => {
    sessionStorage.clear()
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
      <div className={styles.dashboardDiv}>
        <div className={styles.fixedSidebarDiv} data-animate-on-scroll>
          <div className={styles.sidebarDiv}>
            <div className={styles.linksAndTitleDiv}>
              <div className={styles.frameDiv}>
                <label className={styles.appTitleLabel}>Debt-Buddy</label>
              </div>
              <div className={styles.linksDiv}>
                <a className={styles.dashboard}>
                  <img
                    className={styles.homeIcon}
                    alt=""
                    src="../homeicon2.svg"
                  />
                  <b className={styles.customersB}>Dashboard</b>
                </a>
                <Link className={styles.customerA} to="/customers">
                  <img
                    className={styles.debtorsIcon}
                    alt=""
                    src="../debtorsicon.svg"
                  />
                  <b className={styles.customersB}>Customers</b>
                </Link>
                <Link className={styles.customerA} to="/debts1">
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
            <Link className={styles.logoutButtonA} to="/" onClick={handleLogout}>
              <b className={styles.logoutB}>Logout</b>
            </Link>
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
              <b className={styles.logoutB}>Dashboard</b>
            </h1>
            <h4 className={styles.frameH4}>
              <b className={styles.logoutB}>Your Statistics</b>
            </h4>
            <div className={styles.dashboardMidCards}>
              <div className={styles.frameDiv1}>
                <div className={styles.customersDiv}>
                  <div className={styles.pendingDiv}>
                    <b className={styles.pendingDebts}>Customers</b>
                    <div className={styles.frameDiv2}>
                      <div className={styles.frameDiv}>
                        <b className={styles.logoutB}>{
                            loading
                          ?
                            <Skeleton />
                          :
                            totals?.totalCustomers
                        }</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.pendingDiv1}>
                  <b className={styles.pendingDebts}>Pending Debts</b>
                  <div className={styles.frameDiv2}>
                    <div className={styles.frameDiv}>
                      <b className={styles.logoutB}>{
                          loading
                        ?
                          <Skeleton />
                        :
                          totals?.totalPendingDebts
                      }</b>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.frameDiv1}>
                <div className={styles.unpaidDiv}>
                  <div className={styles.pendingDiv2}>
                    <b className={styles.pendingDebts}>Unpaid Debts</b>
                    <div className={styles.frameDiv2}>
                      <div className={styles.frameDiv}>
                        <b className={styles.logoutB}>{
                            loading
                          ?
                            <Skeleton />
                          :
                            totals?.totalUnPaidDebts
                        }</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.unpaidDiv}>
                  <div className={styles.pendingDiv3}>
                    <b className={styles.pendingDebts}>Paid Debts</b>
                    <div className={styles.frameDiv2}>
                      <div className={styles.frameDiv}>
                        <b className={styles.logoutB}>{
                            loading
                          ?
                            <Skeleton />
                          :
                            totals?.totalPaidDebts
                        }</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4 className={styles.frameH4}>
              <b className={styles.logoutB}>Analyze Business</b>
            </h4>
            <div className={styles.graphsDiv}>
              <div className={styles.frameDiv11}>
                <div className={styles.frameDiv12}>
                  <p>Customers</p>
                  {
                      loading
                    ?
                      <Skeleton />
                    :
                      <DataChart months={months} data={customers}/>
                  }
                </div>
                <div className={styles.frameDiv12}>
                  <p>Paid</p>
                  {
                      loading
                    ?
                      <Skeleton />
                    :
                      <DataChart months={months} data={paidDebts}/>
                  }
                  </div>
              </div>
              <div className={styles.frameDiv11}>
                <div className={styles.frameDiv12}>
                  <p>Pending</p>
                  {
                      loading
                    ?
                      <Skeleton />
                    :
                      <DataChart months={months} data={pendingDebts}/>
                  }
                  </div>
                <div className={styles.frameDiv12}>
                  <p>Unpaid</p>
                  {
                      loading
                    ?
                      <Skeleton />
                    :
                      <DataChart months={months} data={unPaidDebts}/>
                  }
                  </div>
              </div>
            </div>
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
    </>
  );
};

export default Dashboard;
