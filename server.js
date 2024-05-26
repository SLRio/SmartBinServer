import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db.js";
import asyncHandler from "express-async-handler";
import Led from "./ledModal.js";


dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

const updateLEDStatus1 = async (methane) => {
    try {
        const led = await MAmount.findOne();
        if (MAmount) {
            MAmount.MAmount = status; // Update status1 field
            await MAmount.save();
        } else {
            await MAmount.create({ MAmount: status }); // Create new LED document with status1
        }
    } catch (error) {
        console.error('Error updating LED status1:', error);
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




// Routes for ledw

// Update status1 for led1
app.get('/api/methane', (req, res) => {
    updateLEDStatus1(100); // Update status1 to 1 for led1
    res.json({ message: 'methane updated' });
});

app.get('/api/led1/off', (req, res) => {
    updateLEDStatus1(0); // Update status1 to 0 for led1
    res.json({ message: 'LED1 turned off' });
});

// Update status2 for led2
app.get('/api/led2/on', (req, res) => {
    updateLEDStatus2(1); // Update status2 to 1 for led2
    res.json({ message: 'LED2 turned on' });
});

app.get('/api/led2/off', (req, res) => {
    updateLEDStatus2(0); // Update status2 to 0 for led2
    res.json({ message: 'LED2 turned off' });
});

// Update status3 for led3
app.get('/api/led3/on', (req, res) => {
    updateLEDStatus3(1); // Update status3 to 1 for led3
    res.json({ message: 'LED3 turned on' });
});

app.get('/api/led3/off', (req, res) => {
    updateLEDStatus3(0); // Update status3 to 0 for led3
    res.json({ message: 'LED3 turned off' });
});



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});
