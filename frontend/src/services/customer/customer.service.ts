import Customer from "../../models/customer";
import { makeRequest } from "../util";

const customerApi = 'http://localhost:5001/customer/';

export const getAllCustomers = () => {
  return makeRequest(customerApi);
};

export const getCustomerById = async (customerId: number) => {
  return makeRequest(`${customerApi}${customerId}`);
};

export const createCustomer = async (customerData: Customer) => {
  return makeRequest(`${customerApi}add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  });
};

export const updateCustomer = async (customerId: number, updatedCustomerData: any) => {
  return makeRequest(`${customerApi}update/${customerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCustomerData),
  });
};

export const deleteCustomer = async (customerId: number) => {
  return makeRequest(`${customerApi}remove/${customerId}`, {
    method: 'DELETE',
  });
};