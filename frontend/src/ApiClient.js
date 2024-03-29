import axios from './axiosConfig';

const API_BASE_URL = 'http://localhost:5000';

// Register a new user
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// User login
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) { 
    throw error.response.data;
  }
};

// User logout
const logout = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Check if user is authenticated
const isAuthenticated = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/is_authenticated`);
    return response.data.isAuthenticated;
  } catch (error) {
    return false;
  }
};

// Get all lists
const getLists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lists`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new list
const createList = async (listData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/lists`, listData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a list
const updateList = async (listId, listData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/lists/${listId}`, listData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a list
const deleteList = async (listId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/lists/${listId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all items in a list
const getItems = async (listId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lists/${listId}/items`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new item in a list
const createItem = async (listId, itemData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/lists/${listId}/items`, itemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an item in a list
const updateItem = async (listId, itemId, itemData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/lists/${listId}/items/${itemId}`, itemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete an item from a list
const deleteItem = async (listId, itemId) => {
  try {
    console.log('Api client about to try deleting item', itemId, 'from list', listId, 'at', `${API_BASE_URL}/lists/${listId}/items/${itemId}`);
    const response = await axios.delete(`${API_BASE_URL}/lists/${listId}/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting item:', error)
    throw error.response.data;
  }
};

// Mark an item as complete
const markItemAsComplete = async (listId, itemId, completed) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/lists/${listId}/items/${itemId}/complete`, { completed });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Move an item from one list to another
const moveItem = async (fromListId, itemId, toListId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/lists/${fromListId}/items/${itemId}/move`, { to_list_id: toListId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get current user information
const getCurrentUserInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/current_user`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all subitems of an item in a list
const getSubitems = async (listId, itemId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lists/${listId}/items/${itemId}/subitems`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  register,
  login,
  logout,
  isAuthenticated,
  getLists,
  createList,
  updateList,
  deleteList,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  markItemAsComplete,
  moveItem,
  getCurrentUserInfo,
  getSubitems
};