import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db.js";
import asyncHandler from "express-async-handler";
import SmartBin from "./smartBinModel.js"; // Ensure you import the SmartBin model
import Led from "./ledModel.js"; // Ensure you import the Led model

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

// Utility function to find or create a SmartBin document
const findOrCreateSmartBin = async () => {
    let smartBin = await SmartBin.findOne();
    if (!smartBin) {
        smartBin = await SmartBin.create({ MAmount: 0, GAmount: 0 });
    }
    return smartBin;
};

const updateMAmount = async (mAmount) => {
    try {
        const smartBin = await findOrCreateSmartBin();
        smartBin.MAmount = mAmount;
        await smartBin.save();
    } catch (error) {
        console.error('Error updating MAmount:', error);
    }
};

const updateGAmount = async (gAmount) => {
    try {
        const smartBin = await findOrCreateSmartBin();
        smartBin.GAmount = gAmount;
        await smartBin.save();
    } catch (error) {
        console.error('Error updating GAmount:', error);
    }
};

const updateLEDStatus2 = async (status) => {
    try {
        let led = await Led.findOne();
        if (led) {
            led.status2 = status;
        } else {
            led = new Led({ status2: status });
        }
        await led.save();
    } catch (error) {
        console.error('Error updating LED status2:', error);
    }
};

const updateLEDStatus3 = async (status) => {
    try {
        let led = await Led.findOne();
        if (led) {
            led.status3 = status;
        } else {
            led = new Led({ status3: status });
        }
        await led.save();
    } catch (error) {
        console.error('Error updating LED status3:', error);
    }
};

app.get('/api/smartbin', asyncHandler(async (req, res) => {
    try {
        const smartBin = await findOrCreateSmartBin();
        res.json(smartBin);
    } catch (error) {
        console.error('Error fetching SmartBin data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));

// Routes for SmartBin

// Update MAmount
app.post('/api/smartbin/mamount', asyncHandler(async (req, res) => {
    const { mAmount } = req.body;
    if (mAmount !== undefined) {
        try {
            await updateMAmount(mAmount);
            res.json({ message: `MAmount updated to ${mAmount}` });
        } catch (error) {
            console.error('Error updating MAmount:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(400).json({ message: 'Invalid request: mAmount is required' });
    }
}));

// Update GAmount
app.post('/api/smartbin/gamount', asyncHandler(async (req, res) => {
    const { gAmount } = req.body;
    if (gAmount !== undefined) {
        try {
            await updateGAmount(gAmount);
            res.json({ message: `GAmount updated to ${gAmount}` });
        } catch (error) {
            console.error('Error updating GAmount:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(400).json({ message: 'Invalid request: gAmount is required' });
    }
}));

// Routes for LED

app.get('/api/led1/off', asyncHandler(async (req, res) => {
    try {
        await updateMAmount(0);
        await updateGAmount(0);
        res.json({ message: 'LED1 turned off' });
    } catch (error) {
        console.error('Error turning off LED1:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));

// Update status2 for LED2
app.post('/api/led2', asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (status !== undefined) {
        try {
            await updateLEDStatus2(status);
            res.json({ message: `LED2 status updated to ${status}` });
        } catch (error) {
            console.error('Error updating LED2:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(400).json({ message: 'Invalid request: status is required' });
    }
}));

// Update status3 for LED3
app.get('/api/led3/on', asyncHandler(async (req, res) => {
    try {
        await updateLEDStatus3(1);
        res.json({ message: 'LED3 turned on' });
    } catch (error) {
        console.error('Error turning on LED3:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));

app.get('/api/led3/off', asyncHandler(async (req, res) => {
    try {
        await updateLEDStatus3(0);
        res.json({ message: 'LED3 turned off' });
    } catch (error) {
        console.error('Error turning off LED3:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});
