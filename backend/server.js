import express from "express";
import cors from "cors";
import fs from "fs";
import db from './db.json' with { type: 'json'};

const server = express();
const PORT = 3000;

server.use(cors());
server.use(express.json());

const saveDatabase = (data) => {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2), 'utf-8');
};

server.get("/", (request, response) => {
    response.json({
        message: "Hotels Details Finder API is running",
        endpoints: {
            destinations: "/destinations",
            hotels: "/hotels",
            hotelById: "/hotels/:id"
        }
    });
});
server.get("/destinations", (request, response) => {
    response.json(db.destination);
});

server.get("/hotels/:id", (request, response) => {
    const hotelId = +request.params.id;
    const hotel = db.hotels.find((item) => item.id === hotelId);
    if (hotel) {
        response.json(hotel);
    } else {
        response.status(404).json({error: "Hotel not found"});
    }
});

server.get("/hotels", (request, response) => {
    const { search, city, destination, rating } = request.query;
    let hotels = [...db.hotels];
    if (search) {
        hotels = hotels.filter((hotel) =>
            hotel.name && hotel.name.toLowerCase().includes(search.toLowerCase().trim())
        );
    }
    const targetCity = destination || city;
    if (targetCity) {
        hotels = hotels.filter((hotel) =>
            hotel.city && hotel.city.toLowerCase().trim() === targetCity.toLowerCase().trim()
        );
    }
    if (rating) {
        hotels = hotels.filter((hotel) => hotel.hotel_rating >= Number(rating));
    }
    response.json(hotels);
});

server.post('/search', (request, response) => {
    const { city } = request.body;
    if (!city) {
        return response.status(400).json({ error: "Please enter parameter 'city' " });
    }
    const filteredHotels = db.hotels.filter(hotel =>
        hotel.city && hotel.city.toLowerCase() === city.toLowerCase()
    );
    response.json(filteredHotels);
});

server.post("/destinations", (request, response) => {
    const newDestination = {
        id: db.destination.length ? db.destination[db.destination.length - 1].id + 1 : 1,
        label: request.body.label
    };
    db.destination.push(newDestination);
    saveDatabase(db);
    console.log("Added:", newDestination);
    response.status(201).json(newDestination);
})
server.put("/destinations/:id", (request, response) => {
    const destinationId = +request.params.id;
    const updatedLabel = request.body.label;
    const destination = db.destination.find(item => item.id === destinationId);
    if (destination) {
 destination.label = updatedLabel;
        saveDatabase(db);
        response.json(destination);
    } else {
        response.status(404).send("Destination not found");
    }
})
server.delete("/destinations/:id", (request, response) => {
    const destinationId = +request.params.id;
    const exists = db.destination.find(item => item.id === destinationId);
    if (exists) {
        db.destination = db.destination.filter(item => item.id !== destinationId);
        saveDatabase(db);
        response.status(200).json({ message: "Deleted", id: destinationId });
    } else {
        response.status(404).json({ message: "Destination not found" });
    }
})
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})