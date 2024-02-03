import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { VERIFY_ACCOUNT } from "../../utils/mutations/userMutations";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifyAccount] = useMutation(VERIFY_ACCOUNT);

  useEffect(() => {
    if (token) {
      verifyAccount({ variables: { token } })
        .then((response) => {
          console.log("Account verified successfully", response);
          navigate("/login");
        })
        .catch((error) => {
          console.log("Account verification failed", error);
        });
    }
  }, [token, verifyAccount, navigate]);

  return (
    <div>Verification successful. You can now log in with your account.</div>
  );
};

export default Verify;
