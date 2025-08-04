import { create } from 'zustand';
import axiosInstance from '../services/axios';

const useAuthStore = create(set => ({
  authUser: null,
  checkAuth: false,

  isSigningUpUser: false,
  isLogingInUser: false,
  isLogingOutUser: false,

  registerUser: async data => {
    try {
      set({ isSigningUpUser: true });
      const res = await axiosInstance.post('/users/register', data);
      set({ authUser: res.data.data, isSigningUpUser: false });
    } catch (error) {
      set({ isSigningUpUser: false });
    }
  },

  logInUser: async data => {
    try {
      set({ isLogingInUser: true });
      const res = await axiosInstance.post('/users/login', data);
      set({ authUser: res.data.data, isLogingInUser: false });
    } catch (error) {
      set({ isLogingInUser: false });
    }
  },

  logOutUser: async () => {
    try {
      set({ isLogingOutUser: true });
      const res = await axiosInstance.post('/users/logout');
      set({ authUser: null, isLogingOutUser: false });
    } catch (error) {
      set({ isLogingOutUser: false });
    }
  },

  getCurrentUser: async () => {
    try {
      set({ checkAuth: true });
      const res = await axiosInstance.post('/users/getCurrentUser');
      set({ authUser: null, checkAuth: false });
    } catch (error) {
      set({ checkAuth: false });
    }
  },
}));

export default useAuthStore;
