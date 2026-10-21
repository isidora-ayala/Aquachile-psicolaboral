import { usuarios } from '../data/mock';

export const authService = {
  login: async (email, password) => {
    await new Promise(r => setTimeout(r, 300));
    const user = usuarios.find(u => u.email === email && u.password === password);
    if (user) {
      return {
        success: true,
        user: {
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      };
    }
    return { success: false, error: 'Credenciales inválidas' };
  },

  logout: async () => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true };
  },

  getCurrentUser: () => {
    return null;
  }
};
