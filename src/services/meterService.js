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

async function addMeterReading(Meter) {
    try {
        const result = await meterModel.add(Meter);
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateMeterReading(id, Meter) {
    try {
        const result = await meterModel.update(id, Meter);
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

module.exports = { getAllMeterReading, getMeterReadingById, addMeterReading, updateMeterReading, removeMeterReading };
