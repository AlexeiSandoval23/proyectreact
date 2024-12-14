import React from "react";

const Item = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <h2>{product.name}</h2>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button>Ver detalle</button>
    </div>
  );
};

export default Item;
