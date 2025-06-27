const BASE_URL = "http://localhost:3001";

export async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fallo en fetchProducts:", error);
    throw error;
  }
}

export async function fetchClients() {
  try {
    const res = await fetch(`${BASE_URL}/clients`);

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fallo en fetchProducts:", error);
    throw error;
  }
}

export async function fetchPromotionalDate() {
  try {
    const res = await fetch(`${BASE_URL}/promotionalDate`);

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fallo en fetchDate:", error);
    throw error;
  }
}

export async function updateClientPurchase(
  userId,
  userVip,
  cartData,
  purchaseDate,
  purchaseAmount
) {
  try {
    const response = await fetch(`${BASE_URL}/clients/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cartData,
        vip: userVip,
        dateOfLastPurchase: purchaseDate,
        lastPurchaseAmount: purchaseAmount,
      }),
    });

    if (!response.ok) {
      throw new Error("No se pudo actualizar el cliente");
    }

    const updatedClient = await response.json();
    console.log("Cliente actualizado:", updatedClient);
    return updatedClient;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
  }
}
