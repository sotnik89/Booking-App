import { useState, useEffect } from 'react';
import { Form, Formik, Field} from "formik";

const BASE_URL = "http://localhost:3000"

export default function FormHotels() {
    const [destinations, setDestinations] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDestinations() {
            try {
                const response = await fetch(`${BASE_URL}/destinations`);
                const data = await response.json();
                setDestinations(data);
            } catch (error) {
                console.error("Error download city:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDestinations();
    }, []);

    async function handleCityChange(event, setFieldValue) {
        const selectedValue = Number(event.target.value);
        setFieldValue("course", selectedValue);
        const targetCity = destinations.find(item => item.value === selectedValue);
        if (!targetCity) {
            setFilteredHotels([]);
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city: targetCity.label })
            });
            const data = await response.json();
            setFilteredHotels(data);
        } catch (error) {
            console.error("Error searching hotels:", error);
        }
    }
    if (loading) return <div>Downloading...</div>;
    return (
        <>
            <h1>HOTELS</h1>
            <Formik
                initialValues={{ course: '', hotel: '' }}
                onSubmit={(values) => console.log("Sent form:", values)}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <label htmlFor="course">Destination:</label>
                        <Field
                            as="select"
                            name="course"
                            id="course"
                            onChange={(e) => handleCityChange(e, setFieldValue)}
                        >
                            <option value="">Choose destination</option>
                            {destinations.map((item) => (
                                <option key={item.id} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </Field>
                        <label htmlFor="hotel">Available hotels</label>
                        <Field as="select" name="hotel" id="hotel" disabled={filteredHotels.length === 0}>
                            <option value="">
                                {filteredHotels.length === 0 ? "Firstly choose destination" : "Choose hotel"}
                            </option>
                            {filteredHotels.map((hotel) => (
                                <option key={hotel.id} value={hotel.name}>
                                    {hotel.name} ({hotel.hotel_rating})
                                </option>
                            ))}
                        </Field>

                        <button type="submit">Book hotel</button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

