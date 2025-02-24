import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaymentComponent = () => {
  const [paid, setPaid] = useState(false);

  return (
    <div>
      {!paid ? (
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00", // Giá tiền cần thanh toán
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`Thanh toán thành công, ${details.payer.name.given_name}!`);
              setPaid(true);
            });
          }}
          onError={(err) => {
            console.error("Lỗi thanh toán:", err);
          }}
        />
      ) : (
        <h2>Thanh toán thành công!</h2>
      )}
    </div>
  );
};

export default PaymentComponent;
