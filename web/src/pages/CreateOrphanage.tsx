import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

import "../styles/pages/create-orphanage.css";
import mapIcon from "../utils/mapIcon";
import { LeafletMouseEvent } from "leaflet";

export default function CreateOrphanage() {
  // Default coords
  const defaultCoords = {
    latitude: -13.2907639,
    longitude: -50.4697997,
  };

  // User Coordinates
  const [userCoords, setUserCoords] = useState<Coordinates>({
    latitude: defaultCoords.latitude,
    longitude: defaultCoords.longitude,
    accuracy: 1,
    altitudeAccuracy: 0,
    altitude: 0,
    heading: 0,
    speed: 0,
  });

  // Click Coordinates - User selection
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  // On Render
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserCoords(position.coords);
    });
  }, []);

  // On Map Click
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  // Form fields
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Submit
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    console.log({
      latitude,
      longitude,
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    selectedImages.forEach((img) => {
      images.push(img);
    });

    const selectedImagesPreview = images.map((img) => {
      return URL.createObjectURL(img);
    });

    setPreviewImages(selectedImagesPreview);
  }

  //
  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[userCoords.latitude, userCoords.longitude]}
              style={{ width: "100%", height: 280 }}
              zoom={userCoords.latitude === defaultCoords.latitude ? 4 : 15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image"></div>

              <div className="images-container">
                {previewImages.map((image) => {
                  return (
                    <div className="preview-image" key={image}>
                      <img src={image} alt={name} />
                      <div className="delete-img">
                        <FaTimes color="#ff669d" />
                      </div>
                    </div>
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                type="file"
                onChange={handleSelectImages}
                id="image[]"
                multiple
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Visitação</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active-false" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
