import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "../redux/cartSlice";
import '../checkoutCard.css'
import { parsePrice } from "../utils/parsePrice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(cartItems);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredItems(
      cartItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [cartItems, searchQuery]);

  const subtotal = cartItems
    .filter((item) => !item.isFree)
    .reduce((sum, item) => sum + parsePrice(item.price) * (item.quantity || 0), 0);

  const handleIncrement = (item) => dispatch(addToCart(item));
  const handleDecrement = (item) => {
    item.quantity > 1
      ? dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
      : dispatch(removeFromCart(item.id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 font-sans">

      <header className="mb-6">
        <div className="relative w-full">

          <div className="flex items-center justify-between p-4">
            {/*Header*/}
            <h2 className="text-2xl font-bold" onClick={() => navigate('/')}>Groceries</h2>

            {/*Nav-Icons*/}
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block border p-2 px-4 rounded-full w-2/3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex items-center space-x-4">
              <button
                className="block md:hidden text-gray-600 text-xl"
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <FontAwesomeIcon icon={faHeart} className="text-red-500 text-2xl" />
              <FontAwesomeIcon icon={faUser} className="text-gray-500 text-xl" />
              <FontAwesomeIcon icon={faCartShopping} className="text-gray-700 text-xl" />
            </div>
          </div>


          {showSearch && (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-30 flex items-start p-4">
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full border p-3 rounded-full text-lg shadow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setShowSearch(false)}
                className="ml-2 text-gray-600 text-xl"
                aria-label="Close search"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <h1 className="flex font-bold text-2xl text-gray-500 mt-4 ch">Checkout</h1>
      </header>

      {/*Cart Items*/}
      <div className="space-y-6 mb-40">
        {filteredItems.length === 0 ? (
          <p className="text-gray-500">
            {searchQuery ? "No matching items in cart" : "Your cart is empty"}
          </p>
        ) : (
          filteredItems.map((item) => (
            <div className="card-container" key={item.id}>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="absolute top-2 right-2 bg-green-500 text-white rounded-md font-bold cursor-pointer px-2"
                aria-label="Remove item"
              >
                ×
              </button>

              <img
                src={item.img}
                alt={item.name}
                className="card-image"
              />

              <div className="card-details">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Product Code: {item.id}</p>
                </div>

                <div className="ml-8 flex justify-center items-center">
                  {item.isFree ? (
                    <span className="text-sm font-bold text-green-600">FREE</span>
                  ) : (
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="quantity-button bg-red-200 hover:bg-red-300"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center font-medium text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="quantity-button bg-green-300 hover:bg-green-400"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  {!item.isFree && (
                    <p className="font-semibold text-gray-900 text-sm">
                      £{(parsePrice(item.price) * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/*Total, Subtotal, Discount*/}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-300 px-8 py-4 z-10 max-w-4xl mx-auto rounded-t-2xl">
          <div className="flex justify-end">
            <div className="flex flex-col w-full max-w-xl">
              <div className="flex justify-between mb-2 ml-auto w-3/3">
                <span className="text-sm text-gray-600">Subtotal:</span>
                <span className="text-sm w-3/3">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 ml-auto w-3/3">
                <span className="text-sm text-gray-600">Discount:</span>
                <span className="text-sm w-3/3">£0.00</span>
              </div>
              <div className="flex justify-between items-center ml-auto w-3/3">
                <div className="text-base font-semibold ">Total</div>
                <div className="flex items-center gap-6">
                  <span className="text-base font-semibold mr-6">£{subtotal.toFixed(2)}</span>
                  <button className="w-48 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition duration-200 cursor-pointer">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CheckoutPage;
