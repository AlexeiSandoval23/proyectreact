import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext.jsx";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../../../firebaseConfig.js"; 
import Button from "../Button/Button.jsx";

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "items", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() }); 
        } else {
          console.error("El producto no existe en la base de datos.");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); 
      alert(`${product.title} agregado al carrito`); 
    }
  };

  return (
    <div>
      {loading ? (
        <h1>Cargando...</h1>
      ) : product ? (
        <div>
          <h1>{product.title}</h1>
          <img
            src={product.imageid} 
            alt={product.title}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />
          <p>Descripción: {product.description}</p>
          <p>Precio: ${product.price}</p>
          <Button onClick={handleAddToCart}>Agregar al carrito</Button>
        </div>
      ) : (
        <h1>Producto no encontrado</h1>
      )}
    </div>
  );
};

export default ItemDetailContainer;
