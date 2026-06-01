import { useState, useEffect } from 'react';
import { Form, Formik, Field } from "formik";

const BASE_URL = "http://localhost:3000";

export default function FormHotels() {
    const [destinations, setDestinations] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`${BASE_URL}/destinations`)
            .then(res => res.json())
            .then(data => {
                setDestinations(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка сети:", err);
                setLoading(false);
            });
    }, []);
    const onCitySelect = async (event, setFieldValue) => {
        const selectElementValue = event.target.value; // Получаем то, что выбрал юзер
        setFieldValue("course", selectElementValue);
        setFieldValue("hotel", "");

        if (!selectElementValue) {
            setFilteredHotels([]);
            return;
        }
        const foundCity = destinations.find(item => String(item.value) === String(selectElementValue));
        if (foundCity) {
            console.log(`Запрашиваем отели для: ${foundCity.label}`);
            try {
                const response = await fetch(`${BASE_URL}/hotels?destination=${encodeURIComponent(foundCity.label)}`);
                const hotelsData = await response.json();
                console.log("Сервер прислал отели:", hotelsData);
                setFilteredHotels(hotelsData);
            } catch (error) {
                console.error("Ошибка при получении отелей:", error);
            }
        }
    };
    if (loading) return <div>Downloading...</div>;

    return (
        <>
            <h1>HOTELS</h1>
            <Formik
                initialValues={{ course: '', hotel: '' }}
                onSubmit={(values) => console.log("Отправка формы:", values)}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <label htmlFor="course">Destination:</label>
                        <Field
                            as="select"
                            name="course"
                            id="course"
                            onChange={(e) => onCitySelect(e, setFieldValue)}
                        >
                            <option value="">Choose destination</option>
                            {destinations.map((item) => (
                                <option key={item.id} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </Field>
                        <label htmlFor="hotel">Available hotels</label>
                        <Field
                            as="select"
                            name="hotel"
                            id="hotel"
                            disabled={filteredHotels.length === 0}
                        >
                            <option value="">
                                {filteredHotels.length === 0 ? "Firstly choose destination" : "Choose hotel"}
                            </option>
                            {filteredHotels.map((hotel) => (
                                <option key={hotel.id} value={hotel.id}>
                                    {hotel.name} {hotel.hotel_rating ? `(${hotel.hotel_rating}★)` : ''}
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
