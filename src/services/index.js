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
