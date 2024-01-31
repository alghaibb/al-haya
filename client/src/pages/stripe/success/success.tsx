import { CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";

import "./success.styles.css";
import { Button } from "@/components/ui/button";

const SuccessStripe = () => {
  return (
    <div className="successContainer">
      <div className="success">
        <CheckCheck className="checkMark" />
        <div className="successTextContainer">
          <h3>Payment Successful!</h3>
          <p>Thank you for your purchase, we hope you enjoy it</p>
          <p>Have a wonderful day!</p>
          <Link to="/">
            <Button className="continueShoppingBtn">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessStripe;
