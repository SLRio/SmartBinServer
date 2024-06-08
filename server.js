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
    let smartBin = await smartbins.findOne();
    if (!smartBin) {
        smartBin = await smartbins.create({ MAmount: 0, GAmount: 0 });
    }
    return smartBin;
};

const updateLEDStatus1 = async (mAmount, gAmount) => {
    try {
        const smartBin = await findOrCreateSmartBin(); // Use the utility function
        smartBin.MAmount = mAmount; // Update MAmount field
        smartBin.GAmount = gAmount; // Update GAmount field
        await smartBin.save();
    } catch (error) {
        console.error('Error updating SmartBin data:', error);
    }
};

const updateLEDStatus2 = async (status) => {
    try {
        const led = await Led.findOne();
        if (led) {
            led.status2 = status; // Update status2 field
            await led.save();
        } else {
            await Led.create({ status2: status }); // Create new LED document with status2
        }
    } catch (error) {
        console.error('Error updating LED status2:', error);
    }
};

const updateLEDStatus3 = async (status) => {
    try {
        const led = await Led.findOne();
        if (led) {
            led.status3 = status; // Update status3 field
            await led.save();
        } else {
            await Led.create({ status3: status }); // Create new LED document with status3
        }
    } catch (error) {
        console.error('Error updating LED status3:', error);
    }
};

app.get('/api/smartbin', asyncHandler(async (req, res) => {
    try {
        const smartBin = await findOrCreateSmartBin(); // Use the utility function
        res.json(smartBin); // Send the SmartBin data as a JSON response
    } catch (error) {
        console.error('Error fetching SmartBin data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));

// Routes for LED

// Update status1 for LED1
app.get('/api/methane', (req, res) => {
    updateLEDStatus1(100, 200); // Update status1 to 1 for LED1
    res.json({ message: 'Methane updated' });
});

app.get('/api/led1/off', (req, res) => {
    updateLEDStatus1(0, 0); // Update status1 to 0 for LED1
    res.json({ message: 'LED1 turned off' });
});

// Update status2 for LED2
app.post('/api/led2', asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (status !== undefined) {
        await updateLEDStatus2(status);
        res.json({ message: `LED2 status updated to ${status}` });
    } else {
        res.status(400).json({ message: 'Invalid request: status is required' });
    }
}));

// Update status3 for LED3
app.get('/api/led3/on', (req, res) => {
    updateLEDStatus3(1); // Update status3 to 1 for LED3
    res.json({ message: 'LED3 turned on' });
});

app.get('/api/led3/off', (req, res) => {
    updateLEDStatus3(0); // Update status3 to 0 for LED3
    res.json({ message: 'LED3 turned off' });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});
