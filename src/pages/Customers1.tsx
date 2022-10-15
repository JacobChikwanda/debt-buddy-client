import { FunctionComponent, useState, useCallback, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import PortalDrawer from "../components/PortalDrawer";
import { Link } from "react-router-dom";
import styles from "./Customers1.module.css";

const Customers1: FunctionComponent = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
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
                <a className={styles.dashboard}>
                  <img
                    className={styles.homeIcon}
                    alt=""
                    src="../homeicon1.svg"
                  />
                  <b className={styles.customersB}>Dashboard</b>
                </a>
                <a className={styles.customerA}>
                  <img
                    className={styles.debtorsIcon}
                    alt=""
                    src="../debtorsicon1.svg"
                  />
                  <b className={styles.customersB}>Customers</b>
                </a>
                <a className={styles.dashboard}>
                  <img
                    className={styles.managementIcon}
                    alt=""
                    src="../managementicon2.svg"
                  />
                  <b className={styles.customersB}>Debts</b>
                </a>
                <a className={styles.addDebtButton}>
                  <img
                    className={styles.addDebtIcon}
                    alt=""
                    src="../adddebticon.svg"
                  />
                  <b className={styles.customersB}>New Debt</b>
                </a>
              </div>
            </div>
            <div className={styles.logoutButtonDiv}>
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
                <button className={styles.addDebtButton1}>
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
                <button className={styles.avatarButton}>
                  <img
                    className={styles.vectorIcon}
                    alt=""
                    src="../vector.svg"
                  />
                </button>
                <button className={styles.frameButton}>
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
              <b className={styles.logoutB}>Customers</b>
            </h1>
            <h4 className={styles.frameH4}>
              <b className={styles.logoutB}>Your Statistics</b>
            </h4>
            <div className={styles.dashboardMidCards}>
              <div className={styles.frameDiv1}>
                <div className={styles.customersDiv1}>
                  <div className={styles.pendingDiv}>
                    <b className={styles.pendingDebts}>Customers</b>
                    <div className={styles.frameDiv2}>
                      <div className={styles.frameDiv}>
                        <b className={styles.logoutB}>0</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.pendingDiv1}>
                  <b className={styles.pendingDebts}>Pending Debts</b>
                  <div className={styles.frameDiv2}>
                    <div className={styles.frameDiv}>
                      <b className={styles.logoutB}>0</b>
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
                        <b className={styles.logoutB}>0</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.unpaidDiv}>
                  <div className={styles.pendingDiv3}>
                    <b className={styles.pendingDebts}>Paid Debts</b>
                    <div className={styles.frameDiv2}>
                      <div className={styles.frameDiv}>
                        <b className={styles.logoutB}>0</b>
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
                  <img
                    className={styles.customersIcon}
                    alt=""
                    src="../customers1@2x.png"
                  />
                </div>
                <div className={styles.frameDiv12}>
                  <img
                    className={styles.customersIcon}
                    alt=""
                    src="../paid1@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameDiv11}>
                <div className={styles.frameDiv12}>
                  <img
                    className={styles.customersIcon}
                    alt=""
                    src="../pending1@2x.png"
                  />
                </div>
                <div className={styles.frameDiv12}>
                  <img
                    className={styles.customersIcon}
                    alt=""
                    src="../unpaid1@2x.png"
                  />
                </div>
              </div>
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
    </>
  );
};

export default Customers1;
