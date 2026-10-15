export async function getRandomJoke() {
  const controller = new AbortController();
  // Evita que la pantalla quede cargando si el servicio no responde.
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random', {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('El servicio no está disponible.');

    const data = await response.json();
    if (typeof data.value !== 'string' || !data.value.trim()) {
      throw new Error('El servicio no devolvió un chiste.');
    }
    return data.value;
  } finally {
    clearTimeout(timeout);
  }
}
