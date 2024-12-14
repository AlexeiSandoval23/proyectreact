import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext.jsx";
import { doc, getDoc } from "firebase/firestore"; // Importar funciones de Firestore
import { db } from "../../../../firebaseConfig.js"; // Configuración de Firestore
import Button from "../Button/Button.jsx";

const ItemDetailContainer = () => {
  const { productId } = useParams(); // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null); // Estado del producto seleccionado
  const [loading, setLoading] = useState(true); // Estado de carga
  const { addToCart } = useContext(CartContext); // Contexto del carrito

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Inicia el estado de carga
      try {
        // Referencia al documento del producto en Firestore
        const docRef = doc(db, "items", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() }); // Guardar datos del producto
        } else {
          console.error("El producto no existe en la base de datos.");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false); // Detiene el estado de carga
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Agregar al carrito
      alert(`${product.title} agregado al carrito`); // Nota: usamos "title" de la base de datos
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
            src={product.imageid} // Imagen del producto desde Firestore
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
