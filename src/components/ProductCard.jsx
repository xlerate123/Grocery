import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { parsePrice } from '../utils/parsePrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { img, name, price, available, description } = product;

  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: parsePrice(product.price),
      img: product.img,
      description: product.description
    };
    console.log("Adding to cart:", item);
    dispatch(addToCart(item));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex gap-4">

      <div className="w-1/3">
        <img
          src={img}
          alt={name}
          className="w-full h-32 object-contain rounded-xl"
        />
      </div>

      <div className="w-2/3 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>

        <div>
          <div className="mt-3 flex flex-wrap items-center justify-between text-sm">

            {available >= 10 ? (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium ml-5">
                Available
              </span>
            ) : (
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium ml-5">
                Only {available} left
              </span>
            )}
          </div>
          <span className="mr-5 font-bold text-base">{price}</span>
          <button
            onClick={handleAdd}
            className="mt-4 py-2 px-4 rounded-xl w-fit self-end cursor-pointer"
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
      </div>
      {added && (
        <div className="fixed top-4 right-4 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50">
          Added to Cart!
        </div>
      )}

    </div>


  );
};

export default ProductCard;
