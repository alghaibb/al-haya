/* eslint-disable no-unused-vars */
import "./quantitySelector.styles.css";

interface QuantitySelectorProps {
  id: string;
  quantity: number;
  setQuantity: (id: string, quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  id,
  quantity,
  setQuantity,
}) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(id, Math.max(0, newQuantity));
  };

  const increment = () => setQuantity(id, quantity + 1);
  const decrement = () => setQuantity(id, Math.max(0, quantity - 1));

  return (
    <div className="quantitySelector">
      <button onClick={decrement}>−</button>
      <input type="number" value={quantity} onChange={handleQuantityChange} />
      <button onClick={increment}>+</button>
    </div>
  );
};

export default QuantitySelector;
