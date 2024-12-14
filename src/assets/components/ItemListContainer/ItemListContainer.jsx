import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig.js";
import { toast } from "react-toastify"; 

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productCollection = collection(db, "items");

        const q = categoryId
          ? query(productCollection, where("categoryid", "==", categoryId))
          : productCollection;

        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
        toast.success("Productos cargados correctamente", { autoClose: 2000 });
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        toast.error("Error al cargar los productos"); 
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} agregado al carrito`, { autoClose: 2000 });
  };

  return (
    <div>
      <h1>{greeting}</h1>
      {loading ? (
        <h2>Cargando productos...</h2>
      ) : products.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <img
                src={product.imageid}
                alt={product.title}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  marginRight: "20px",
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Precio: ${product.price}</p>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No se encontraron productos</h2>
      )}
    </div>
  );
};

export default ItemListContainer;
