import "./shippingreturns.styles.css";

const ShippingReturnsPage = () => {
  return (
    <div className="shippingReturnsContainer">
      <h1 className="shippingReturnsTitle">Shipping & Returns</h1>

      <section className="shippingPolicy">
        <h2>Shipping Policy</h2>
        <p>
          We aim to process and ship all orders within 1-2 business days.
          Delivery times may vary depending on your location and the shipping
          method chosen at checkout. Once your order has been shipped, you will
          receive a tracking number via email so you can track your package's
          journey to your doorstep.
        </p>
        <p>
          Please note, shipping costs are non-refundable and we cannot ship to
          PO Boxes or military addresses at this time.
        </p>
      </section>

      <section className="returnsPolicy">
        <h2>Returns Policy</h2>
        <p>
          Your satisfaction is our top priority. If you're not completely happy
          with your purchase, you may return it within 30 days of receipt for a
          full refund or exchange. Please ensure that items are returned in
          their original condition, with all tags attached and in their original
          packaging.
        </p>
        <p>
          To start a return, please contact our customer service team to receive
          a return authorization and shipping instructions. Return shipping
          costs are the responsibility of the customer, and original shipping
          fees are non-refundable.
        </p>
      </section>
    </div>
  );
};

export default ShippingReturnsPage;
