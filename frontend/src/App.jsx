import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/products";

const categoryIcons = {
  Electronics: "💻",
  Books: "📚",
  Clothing: "👕",
  Sports: "⚽",
  Home: "🏠",
  Beauty: "💄",
  Automotive: "🚗",
  Toys: "🧸",
};

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const [snapshotTime, setSnapshotTime] =
    useState(null);

  const [nextCursor, setNextCursor] =
    useState(null);

  const [cursorHistory, setCursorHistory] =
    useState([null]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const fetchProducts = async (
    cursor = null,
    selectedCategory = category,
    page = 1
  ) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (selectedCategory) {
        params.append(
          "category",
          selectedCategory
        );
      }

      if (cursor?.cursorId) {
        params.append(
          "cursorId",
          cursor.cursorId
        );

        params.append(
          "cursorUpdatedAt",
          cursor.cursorUpdatedAt
        );
      }

      if (snapshotTime) {
        params.append(
          "snapshotTime",
          snapshotTime
        );
      }

      const response = await fetch(
        `${API_URL}?${params.toString()}`
      );

      const data = await response.json();

      setProducts(data.products);

      if (!snapshotTime) {
        setSnapshotTime(
          data.snapshotTime
        );
      }

      setNextCursor(data.nextCursor);

      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = async (
    e
  ) => {
    const value = e.target.value;

    setCategory(value);

    setSnapshotTime(null);

    setCursorHistory([null]);

    setCurrentPage(1);

    try {
      setLoading(true);

      const params =
        new URLSearchParams();

      if (value) {
        params.append(
          "category",
          value
        );
      }

      const response = await fetch(
        `${API_URL}?${params.toString()}`
      );

      const data = await response.json();

      setProducts(data.products);

      setSnapshotTime(
        data.snapshotTime
      );

      setNextCursor(
        data.nextCursor
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (!nextCursor) return;

    const updatedHistory = [
      ...cursorHistory,
      nextCursor,
    ];

    setCursorHistory(updatedHistory);

    await fetchProducts(
      nextCursor,
      category,
      currentPage + 1
    );
  };

  const handlePrevious =
    async () => {
      if (currentPage === 1)
        return;

      const previousCursor =
        currentPage === 2
          ? null
          : cursorHistory[
              currentPage - 2
            ];

      await fetchProducts(
        previousCursor,
        category,
        currentPage - 1
      );
    };

  return (
    <div className="app">
      <header className="header">
        <h1>
          CodeVector Products
        </h1>

        <p>
          Browse 200,000+
          products
        </p>
      </header>

      <div className="controls">
        <select
          value={category}
          onChange={
            handleCategoryChange
          }
        >
          <option value="">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Clothing">
            Clothing
          </option>

          <option value="Sports">
            Sports
          </option>

          <option value="Home">
            Home
          </option>

          <option value="Beauty">
            Beauty
          </option>

          <option value="Automotive">
            Automotive
          </option>

          <option value="Toys">
            Toys
          </option>
        </select>
      </div>

      {loading ? (
        <h2 className="loading">
          Loading...
        </h2>
      ) : (
        <>
          <div className="products-grid">
            {products.map(
              (product) => (
                <div
                  key={
                    product._id
                  }
                  className="product-card"
                >
                  <div className="product-icon">
                    {categoryIcons[
                      product.category
                    ] || "📦"}
                  </div>

                  <h3>
                    {product.name}
                  </h3>

                  <p className="category">
                    {
                      product.category
                    }
                  </p>

                  <p className="price">
                    ₹
                    {product.price}
                  </p>

                  <p className="updated">
                    Updated:
                    {" "}
                    {new Date(
                      product.updatedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="pagination">
            <button
              disabled={
                currentPage === 1
              }
              onClick={
                handlePrevious
              }
            >
              ← Previous
            </button>

            <span>
              Page {currentPage}
            </span>

            <button
              disabled={
                !nextCursor
              }
              onClick={handleNext}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;