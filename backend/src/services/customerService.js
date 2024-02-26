const customerModel = require('../models/customerModel');

async function getAllCustomers() {
    try {
        const customers = await customerModel.getAll();
        return customers;
    } catch (error) {
        throw error;
    }
}

async function getCustomerById(id) {
    try {
        const customer = await customerModel.getById(id);
        if (!customer || customer.length === 0) {
            throw new Error('Customer not found');
        }
        return customer[0];
    } catch (error) {
        throw error;
    }
}

async function addCustomer(customer) {
    try {
        const result = await customerModel.add(customer);
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateCustomer(id, customer) {
    try {
        const result = await customerModel.update(id, customer);
        if (result && result.affectedRows === 0) {
            throw new Error('Customer not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
}

async function removeCustomer(id) {
    try {
        const result = await customerModel.remove(id);
        if (result && result.affectedRows === 0) {
            throw new Error('Customer not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllCustomers, getCustomerById, addCustomer, updateCustomer, removeCustomer };
