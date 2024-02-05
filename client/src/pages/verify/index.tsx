import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL } from "@/utils/mutations/userMutations";
import { useParams, useNavigate } from "react-router-dom";

import LoadingSpinner from "@/components/LoadingSpinner";

import "./verify.styles.css";

const Verify = () => {
  const { token } = useParams();
  const [verifyEmail, { loading }] = useMutation(VERIFY_EMAIL);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      verifyEmail({ variables: { verificationToken: token } })
        .then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect after 3 seconds
        })
        .catch((error) => {
          console.error("Verification error:", error);
          // I can add a redirect to an error page here
        });
    }
  }, [token, verifyEmail, navigate]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="verifyContainer">
      <LoadingSpinner />
    </div>
  );
};

export default Verify;
