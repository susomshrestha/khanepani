const NepaliDate = require('nepali-datetime');
const meterModel = require('../models/meterModel');

async function getAllMeterReading() {
    try {
        const results = await meterModel.getAll();
        return results;
    } catch (error) {
        throw error;
    }
}

async function getMeterReadingById(id) {
    try {
        const meter = await meterModel.getById(id);
        if (!meter || meter.length === 0) {
            throw new Error('Meter not found');
        }
        return meter[0];
    } catch (error) {
        throw error;
    }
}

async function getMeterReadingByCustomerId(customerId) {
    try {
        const meter = await meterModel.getByCustomerId(customerId);
        if (!meter || meter.length === 0) {
            throw new Error('Meter not found');
        }
        return meter;
    } catch (error) {
        throw error;
    }
}

async function addMeterReading(meter) {
    try {
        const result = await meterModel.add({...meter, createdAt: new NepaliDate().toString()});
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateMeterReading(id, meter) {
    try {
        const result = await meterModel.update(id, meter);
        if (result && result.affectedRows === 0) {
            throw new Error('Meter not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
}

async function removeMeterReading(id) {
    try {
        const result = await meterModel.remove(id);
        if (result && result.affectedRows === 0) {
            throw new Error('Meter not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllMeterReading, getMeterReadingById, addMeterReading, updateMeterReading, removeMeterReading, getMeterReadingByCustomerId };
