import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProductCard from "../components/ProductCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../App.css'

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await fetch(
      `https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=${category}`
    );
    const data = await res.json();
    console.log(data)
    setProducts(data);
    setFiltered(data);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filtered);
  }, [search, products]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="relative w-full">
          <div className="flex items-center justify-between p-4">
            {/*Header*/}
            <h2 className="text-2xl font-bold">Groceries</h2>

            {/*Nav-Icons*/}
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block border p-2 px-4 rounded-full w-2/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              <FontAwesomeIcon icon={faCartShopping} className="text-gray-700 text-xl" onClick={() => navigate('/checkout')} />
            </div>
          </div>


          {showSearch && (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-30 flex items-start p-4">
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full border p-3 rounded-full text-lg shadow"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

      </div>

      {/*Categories*/}
      <div className="flex flex-wrap gap-2 mb-4 pill">
        {["all", "fruit", "drinks", "bakery"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full border text-sm cursor-pointer font-medium transition ${category === cat
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/*Product Cards*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
