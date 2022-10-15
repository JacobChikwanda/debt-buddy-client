import { FunctionComponent, useState, useCallback, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import debtApi from "../api/debtBuddy";
import CustomerForm from "./CustomerForm";
import PortalPopup from "./PortalPopup";
import alertPopup from "../misc/notifiers";
import styles from "./DebtForm.module.css";
import { useNavigate } from "react-router-dom";


const DebtForm = ({ onClose }) => {

  const navigate = useNavigate();

  const [isCustomerFormPopupOpen, setCustomerFormPopupOpen] = useState(false);
  const [isDebtFormPopupOpen, setDebtFormPopupOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [collectionDate, setCollectionDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [amount, setAmount] = useState();
  const [customerId, setCustomerId] = useState();
  const [customers, setCustomers] = useState([]);

  const sessionData = sessionStorage.getItem('user')?.toString() || ''
  const userData = JSON.parse(sessionData);
  
  useEffect(() => {
    setLoading(true);

    debtApi(userData.token).get('/customers')
    .then(res => {
      if (res.data.success) {
        setLoading(false);
        console.log(res.data);
        setCustomers(res.data.yourCustomers);
      } else {
        alertPopup(res.data);
      }
    })
  }, [])

  const press = () => {

    
    if (!collectionDate) {
      alertPopup({message: 'Provide Collection Date', success: false})
      return
    }
    
    if (!returnDate) {
      alertPopup({message: 'Provide Return Date', success: false})
      return
    }

    if (!amount) {
      alertPopup({message: 'Provide Amount', success: false})
      return
    }
    
    const debtData = {
      collectionDate,
      returnDate,
      customerId,
      amount
    }

    debtApi(userData.token).post('/debts', debtData)
    .then(res => {
      if (res.data.success) {
        alertPopup(res.data)
        navigate("/debts1");
      } else {
        alertPopup(res.data)
      }
    })
  }

  const openCustomerFormPopup = useCallback(() => {
    setCustomerFormPopupOpen(true);
  }, []);

  const closeCustomerFormPopup = useCallback(() => {
    setCustomerFormPopupOpen(false);
  }, []);

  return (
    <>
      <div className={styles.debtFormDiv}>
        <div className={styles.frameDiv}>
          <b className={styles.debtDetails}>Debt Details</b>
        </div>
        <button className={styles.frameButton} onClick={openCustomerFormPopup}>
          <div className={styles.addNewCustomer}>Add New Customer</div>
        </button>
        <div className={styles.frameDiv1}>
          <select
            className={styles.selectCustomerInput}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            {
                loading
              ?
                <Skeleton />
              :
                <>
                  <option value="" disabled selected>Select Customer</option>
                  {
                    customers.map(customer => {
                      return (
                        <option value={customer.id} onLoad={e => setCustomerId(e.target.id)} key={customer.id}>{`${customer.firstName} ${customer.lastName}`}</option>
                      )
                    })
                  }
                </>
            }
          </select>
        </div>
        <div className={styles.frameDiv2}>
          <div className={styles.frameDiv3}>
            <input
              className={styles.collectionDateInput}
              type="date"
              placeholder="Collection Date"
              required
              onChange={(e) => setCollectionDate(e.target.value.toString())}
            />
          </div>
          <div className={styles.frameDiv3}>
            <input
              className={styles.collectionDateInput}
              type='date'
              placeholder="Return Date"
              required
              onChange={(e) => setReturnDate(e.target.value.toString())}
            />
          </div>
        </div>
        <div className={styles.frameDiv1}>
          <input
            className={styles.selectCustomerInput}
            type="number"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value.toString())}
          />
        </div>
        <div className={styles.frameDiv6}>
          <button className={styles.frameButton1} onClick={press}>
            <div className={styles.addNewCustomer}>Create</div>
          </button>
          <button className={styles.frameButton2} onClick={onClose}>
            <div className={styles.addNewCustomer}>Cancel</div>
          </button>
        </div>
      </div>
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

export default DebtForm;
