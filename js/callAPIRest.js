async function obtenerTipoCambio() {
  const url = "https://api.exchangerate-api.com/v4/latest/CRC";
  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener el tipo de cambio.");
      const datos = await response.json();
      return datos.rates.USD;
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
}



