import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../../../../firebaseConfig.js"; 

const CartPage = () => {
  const { cart, clearCart, removeFromCart } = useContext(CartContext);


  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


  const handlePurchase = async () => {
    if (cart.length === 0) {
      toast.warn("El carrito está vacío, no se puede realizar la compra.");
      return;
    }

    const order = {
      buyer: {
        name: "Prueba", 
        email: "ejemplo@example.com",
        phone: "1234567890",
      },
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      date: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      toast.success(`Compra realizada con éxito. ID de orden: ${docRef.id}`);
      clearCart();
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      toast.error("Error al procesar la compra. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Carrito</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3>{item.title}</h3>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Subtotal: ${item.price * item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h2>Total: ${totalPrice}</h2>
          <button
            onClick={handlePurchase}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            Comprar
          </button>
          <button
            onClick={clearCart}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ffc107",
              color: "#333",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Vaciar carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
