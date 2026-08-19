"use client";

import { useState } from "react";

import { useCart } from "@/context/CartContext";

interface ProductSize {
  id: string;
  size: string;
  quantity: number;
}

interface ProductPurchaseProps {
  productId: string;
  productName: string;
  price: number;
  image: string;
  sizes: ProductSize[];
  stock: number;
}

export default function ProductPurchase({
  productId,
  productName,
  price,
  sizes,
  stock,
  image,
}: ProductPurchaseProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const selectedSizeData = sizes.find(
    (size) => size.size === selectedSize,
  );

  const maxQuantity = selectedSizeData
    ? selectedSizeData.quantity
    : stock;

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(current + 1, maxQuantity),
    );
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(current - 1, 1),
    );
  }

  function handleAddToCart() {
    if (sizes.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return;
    }

    addItem({
      productId,
      productName,
      price,
      image,
      size: selectedSize || null,
      quantity,
    });

    alert("Product added to cart!");
  }

  return (
    <div className="mt-8 space-y-8">
      {/* Size Selection */}
      {sizes.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold">Select Size</p>

            {selectedSize && (
              <p className="text-sm text-muted">
                Selected: {selectedSize}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {sizes.map((size) => {
              const unavailable = size.quantity <= 0;
              const selected = selectedSize === size.size;

              return (
                <button
                  key={size.id}
                  type="button"
                  disabled={unavailable}
                  onClick={() => {
                    setSelectedSize(size.size);
                    setQuantity(1);
                  }}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${selected
                    ? "border-primary bg-primary text-black"
                    : "border-border bg-card hover:border-primary"
                    } ${unavailable
                      ? "cursor-not-allowed opacity-40"
                      : ""
                    }`}
                >
                  {size.size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      {stock > 0 && (
        <div>
          <p className="mb-3 font-semibold">Quantity</p>

          <div className="flex w-fit items-center overflow-hidden rounded-xl border border-border">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="px-5 py-3 text-xl transition hover:bg-surface disabled:opacity-40"
            >
              −
            </button>

            <span className="min-w-14 text-center">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity >= maxQuantity}
              className="px-5 py-3 text-xl transition hover:bg-surface disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <button
        type="button"
        disabled={stock <= 0}
        onClick={handleAddToCart}
        className="w-full rounded-xl bg-primary px-6 py-4 font-semibold text-black transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}