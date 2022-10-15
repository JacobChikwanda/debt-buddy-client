import { toast } from 'react-toastify';

interface alertProps {
    success: boolean,
    message: string
}

const alertPopup = (data: alertProps) => {
    if (data.success) {
        return toast(data.message, {
            type: "success"
          })
    } else {
        toast(data.message, {
            type: "error"
          })
    }
}

export default alertPopup;