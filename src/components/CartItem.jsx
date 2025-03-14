import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../utils/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center border-b p-4">
      <img src={item.image} alt={item.title} className="h-20 w-20 object-cover rounded" />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-500">${item.price}</p>
        <div className="flex items-center mt-2">
          <button className="px-2 bg-gray-200" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
          <span className="px-4">{item.quantity}</span>
          <button className="px-2 bg-gray-200" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
        </div>
      </div>
      <button className="text-red-500" onClick={() => dispatch(removeFromCart(item.id))}>❌</button>
    </div>
  );
}

export default CartItem;
