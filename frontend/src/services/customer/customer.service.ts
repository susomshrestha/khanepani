import Customer from "../../models/customer";
import { makeRequest } from "../util";

const customerApi = '/api/customers/';

let customers: Customer[] = [
  {
    id: 1,
    name: 'Ram Shrestha',
    dharaNo: '123'
  },
  {
    id: 2,
    name: 'Shyam Shrestha',
    dharaNo: '12'
  },
  {
    id: 3,
    name: 'hari Shrestha',
    dharaNo: '1'
  },
  {
    id: 4,
    name: 'Sita Shrestha',
    dharaNo: '14'
  },
  {
    id: 5,
    name: 'Gita Shrestha',
    dharaNo: '23'
  },
]

export const getAllCustomers = () => {
  return customers;
  // return makeRequest(customerApi);
};

export const getCustomerById = async (customerId: number) => {
  return customers.find(i => i.id === customerId);
  // return makeRequest(`${customerApi}${customerId}`);
};

export const createCustomer = async (customerData: Customer) => {
  customers.push(customerData);
  return true;
  // return makeRequest(customerApi, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(customerData),
  // });
};

export const updateCustomer = async (customerId: number, updatedCustomerData: any) => {
  const ind = customers.findIndex(i => i.id === customerId);
  customers[ind] = updatedCustomerData;
  return true;
  // return makeRequest(`${customerApi}/${customerId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(updatedCustomerData),
  // });
};

export const deleteCustomer = async (customerId: number) => {
  const ind = customers.findIndex(i => i.id === customerId);
  customers.splice(ind, 1);
  return true;
  // return makeRequest(`${customerApi}/${customerId}`, {
  //   method: 'DELETE',
  // });
};