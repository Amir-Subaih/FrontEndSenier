import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from '../addState/AddState.module.css'
import { UserContext } from "../context/User";
import { toast } from "react-toastify";
import {useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fixing default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const AddState = () => {
    const navigat=useNavigate();
    let { userToken,userId} = useContext(UserContext);

    const [address, setAddress] = useState("");
    const [typeEstates, setTypeEstates] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [typeEstateSR, setTypeEstateSR] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState(null);//for map
    const [selectedLocation, setSelectedLocation] = useState(null); // State to store the temporarily selected location

    useEffect(() => {
        // Enable tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);

    // Function to set the confirmed location based on the selected location
  const handleGetLocation = () => {
    if (selectedLocation) {
      setLocation(selectedLocation);
    } else {
      toast.error('No location selected.');
    }
  };//for map

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        console.log("test");
        const formData = new FormData();
        formData.append("ownerId",userId);
        formData.append("address", address);
        formData.append("typeEstates",typeEstates);
        formData.append("price", parseInt(price));
        formData.append("area", parseInt(area));
        formData.append("typeEstateSR", typeEstateSR);
        formData.append("description",description);
        if (location) {
            formData.append("latitude", location.latitude);
            formData.append("longitude",location.longitude);
        }else{
            toast.error("Please add location");
            return;
        }

        if (["House", "Apartment", "Chalet"].includes(typeEstates)) {
            formData.append("bathrooms", parseInt(bathrooms));
            formData.append("bedrooms", parseInt(bedrooms));
        }

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        const data = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(data);
        const config = {
            headers: 
            {
                "Content-Type": "multipart/form-data",
                token: userToken,
            }
        };
        try {
            const { data } = await axios.post(
                "https://estatetest.onrender.com/api/estate/create",
                formData,
                config
            );
            if (data.message === "success") {
                toast.success("Successfully added estate");
                navigat('/profile/myEstate');
            } else {
                // Handle other response states (e.g., error messages)
                toast.error(data.message);
            }
        } catch (err) {
            // Handle network errors or other exceptions
            if (err.response && err.response.status === 401) {
                // Unauthorized access
                toast.error("Unauthorized access. Please log in.");
                navigat('/login');
            } else {
                // Other errors
                console.error(err);
                toast.error("An error occurred. Please try again later.");
            }
        }
        

        // Explicitly reset state fields
        setAddress("");
        setTypeEstates("");
        setBathrooms("");
        setBedrooms("");
        setPrice("");
        setArea("");
        setTypeEstateSR("");
        setDescription("");
        setImages([]);
    };
    
    // const showBathroomsBedrooms = ["House", "Apartment", "Chalet",""].includes(typeEstates);
    const showBathroomsBedrooms = !["Store", "Land"].includes(typeEstates);

    // Component to handle map clicks and set the selected location
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setSelectedLocation({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      },
    });

    // Render a marker at the selected location
    return selectedLocation ? (
        <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}>
          <Popup>
            Selected location: <br /> Latitude: {selectedLocation.latitude}, Longitude: {selectedLocation.longitude}
          </Popup>
        </Marker>
      ) : null;
    };



    return (
        <div className="container">
            <div className={`${style.AddState}`}>
            <p>Let's Make it Happen</p>
            <span>Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together.</span>
            </div>

            <form onSubmit={handleSubmit} id="myForm">
                <div className="row">
                <div className="col-md-3">
                    <div className="location">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> City:</label>
                    <select className="form-select w-75 border-4" required value={address} onChange={(e) => setAddress(e.target.value)}>
                        <option value="">Select Location</option>
                        <option value="Ramallah">Ramallah</option>
                        <option value="Tulkarm">Tulkarm</option>
                        <option value="Nablus">Nablus</option>
                        <option value="Jenin">Jenin</option>
                        <option value="Jerusalem">Jerusalem</option>
                        <option value="Gaza">Gaza</option>
                        <option value="Haifa">Haifa</option>
                    </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="type">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> Type of State:</label>
                    <select className="form-select w-75 border-4"  required value={typeEstates} onChange={(e) => setTypeEstates(e.target.value)}>
                        <option value="">Property Type</option>
                        <option value="House">House</option>
                        <option value="Apartment">Flat</option>
                        <option value="Land">Land</option>
                        <option value="Store">Store</option>
                        <option value="Chalet">Chalet</option>
                    </select>
                    </div>
                </div>
                {/* ززززززززززززززز */}

                {showBathroomsBedrooms&&(
                    <>
                    <div className="col-md-3">
                    <div className="Bathrooms">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> No. of Bathrooms:</label>
                    <select className="form-select w-75 border-4" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                        <option value="">Select no. of Bathrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    </div>
                </div>
                
                <div className="col-md-3">
                    <div className="Bedrooms mb-3">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> No. of Bedrooms:</label>
                    <select className="form-select w-75 border-4" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                        <option value="">Select no. of Bedrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    </div>
                </div>
                    </>
                )}
                {/* ,,,,,,,,,,,,,,,,,,, */}
                <div className="col-md-3">
                    <div className="price ">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> Price:</label>
                    <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input type="number" id="myForm" required placeholder='Enter Price In Dollar' className="form-control border-4" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <span className="input-group-text">.00</span>
                    </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="area">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> Area(m²):</label>
                    <input type="number" required placeholder='Area in m²' className="form-control border-4" value={area} onChange={(e) => setArea(e.target.value)}/>
                    </div>
                </div>

                <div className="col-md-3">
                        <div className="renterORseller mt-4">
                            <label className={`mb-2 me-2 ${style.label}`}><span className="text-danger">*</span> Renter or Seller:</label>
                            <input
                                type="radio"
                                name="renterOrSeller"
                                value="Rent"
                                required
                                className="form-check-input border-4 me-2"
                                checked={typeEstateSR === "Rent"}
                                onChange={(e) => setTypeEstateSR(e.target.value)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Stores and Lands Per Year, Apartment Per Month, Chalet Per Day"  // Add tooltip here
                            />
                            <label className={`me-2 ${style.label}`}>Renter</label>
                            <input
                                type="radio"
                                name="renterOrSeller"
                                value="Sale"
                                required
                                className="form-check-input border-4 me-2"
                                checked={typeEstateSR === "Sale"}
                                onChange={(e) => setTypeEstateSR(e.target.value)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="This is for selling the property"  // Add tooltip here
                            />
                            <label className={`me-2 ${style.label}`}>Seller</label>
                        </div>
                    </div>

                <div className="detalis mb-2">
                <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> Details:</label>
                    <textarea
                        required
                        className="form-control border-4 w-25"
                        placeholder='Detalis on state'
                        value={description}
                        id="myForm"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="map mb-4">
                  <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> Location Estate:</label><br/>
                  <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker /> {/* Component to handle and display the selected location */}
                        {location && ( // Render a marker at the confirmed location
                        <Marker position={[location.latitude, location.longitude]}>
                            <Popup>
                            You are here: <br /> Latitude: {location.latitude}, Longitude: {location.longitude}
                            </Popup>
                        </Marker>
                        )}
                   </MapContainer>
                  <button onClick={handleGetLocation} className={`mt-3 ${style.btn1}`}>Get Location</button>
                  {location &&(
                    <p className={`${style.mas}`}>Location added success</p>
                  )}
                </div>{/* for map */}
                
                <div className="images mb-4">
                <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> Images:</label>
                    <input
                        type="file"
                        multiple
                        required
                        className="form-control border-4 w-50"
                        onChange={(e) => setImages(e.target.files)}
                    />
                
                </div>
                
                </div>
                <button type="submit"  className={`${style.btn}`}>Submit</button>
                
            </form>

        </div>
    );
};

export default AddState;