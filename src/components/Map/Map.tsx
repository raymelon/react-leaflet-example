/*eslint-disable */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Polyline,
  Popup,
} from "react-leaflet";
import { connect } from "react-redux";
import {
  setPlacePreviewVisibility,
  setSelectedPlace,
} from "../../store/actions";
import { IState, Place } from "../../store/models";
import AddMarker from "./AddMarker";

import "./Map.css";

const DISASTER_NEWS_SEED = [
  "PAGASA raises flood alert for low-lying coastal areas after overnight heavy rain.",
  "Class suspensions announced as monsoon rains trigger river overflow in nearby towns.",
  "Local disaster office prepositions rescue boats as tropical depression approaches.",
  "Authorities monitor possible landslides after continuous rainfall in upland barangays.",
  "Power outages reported in several districts after strong winds and flash flooding.",
  "Evacuation centers open early for families in flood-prone communities.",
];

const randomFromRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const Map = ({
  isVisible,
  places,
  selectedPlace,
  togglePreview,
  setPlaceForPreview,
}: any) => {
  const defaultPosition: LatLngExpression = [11.9995, 120.9842]; //[48.864716, 2.349]; // Paris position
  const [polyLineProps, setPolyLineProps] = useState([]);

  useEffect(() => {
    setPolyLineProps(
      places.reduce((prev: LatLngExpression[], curr: Place) => {
        prev.push(curr.position);
        return prev;
      }, [])
    );
  }, [places]);

  const showPreview = (place: Place) => {
    if (isVisible) {
      togglePreview(false);
      setPlaceForPreview(null);
    }

    if (selectedPlace?.title !== place.title) {
      setTimeout(() => {
        showPlace(place);
      }, 400);
    }
  };

  const showPlace = (place: Place) => {
    setPlaceForPreview(place);
    togglePreview(true);
  };

  const MarkerCustom = (props: any) => {
    const leafletRef: any = useRef();
    const [popupInfo] = useState(() => ({
      headline:
        DISASTER_NEWS_SEED[
          Math.floor(Math.random() * DISASTER_NEWS_SEED.length)
        ],
      chanceOfRain: randomFromRange(45, 96),
      chanceOfFlooding: randomFromRange(25, 88),
    }));

    const { position, area, isYouAreHere, popupOffset = [0, -12] } = props;

    const popupPlacement = useMemo(
      () => ({ offset: popupOffset as [number, number] }),
      [popupOffset]
    );

    useEffect(() => {
      if (isYouAreHere && leafletRef.current) {
        leafletRef.current.openPopup();
      }
    }, [isYouAreHere]);

    const onActionClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
    };

    return (
      <Marker ref={leafletRef} position={position}>
        <Popup
          autoClose={!isYouAreHere}
          closeOnClick={!isYouAreHere}
          className={isYouAreHere ? "map-popup--you-are-here-shell" : ""}
          minWidth={260}
          offset={popupPlacement.offset}
        >
          <div
            className={`map-popup ${
              isYouAreHere ? "map-popup--you-are-here" : ""
            }`}
          >
            <p className="map-popup__eyebrow">
              {isYouAreHere ? "CURRENT LOCATION" : area}
            </p>
            <h3 className="map-popup__title">
              {isYouAreHere ? "You are here" : "Flood Monitoring Bulletin"}
            </h3>
            <p className="map-popup__headline">{popupInfo.headline}</p>
            <div className="map-popup__stats">
              <span>Chance of rain: {popupInfo.chanceOfRain}%</span>
              <span>Chance of flooding: {popupInfo.chanceOfFlooding}%</span>
            </div>
            <div className="map-popup__actions">
              <a href="#" onClick={onActionClick}>
                Call emergency
              </a>
              <a href="#" onClick={onActionClick}>
                Dispatch relief
              </a>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  };

  return (
    <div className="map__container">
      <MapContainer
        center={defaultPosition}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={polyLineProps} />
        {places.map((place: Place) => (
          <Marker
            key={place.title}
            position={place.position}
            eventHandlers={{ click: () => showPreview(place) }}
          >
            <Tooltip>{place.title}</Tooltip>
          </Marker>
        ))}
        <AddMarker />

        <MarkerCustom position={[14.5995, 120.9842]} area="Metro Manila" />
        <MarkerCustom
          position={[10.3157, 123.8854]}
          area="Metro Cebu"
          popupOffset={[200, -6]}
        />
        <MarkerCustom position={[7.1907, 125.4553]} area="Davao City" />
        <MarkerCustom
          position={[11.9995, 120.9842]}
          area="Current location"
          isYouAreHere
        />
      </MapContainer>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { places } = state;
  return {
    isVisible: places.placePreviewsIsVisible,
    places: places.places,
    selectedPlace: places.selectedPlace,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePreview: (payload: boolean) =>
      dispatch(setPlacePreviewVisibility(payload)),
    setPlaceForPreview: (payload: Place) => dispatch(setSelectedPlace(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
