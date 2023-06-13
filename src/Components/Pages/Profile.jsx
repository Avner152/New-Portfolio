import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import { useState } from "react";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";

export default function Profile() {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);

  const [searchPos, setSearchPos] = useState("");
  const [positionFound, SetPositionFound] = useState(false);
  const [positionAddressName, SetPositionAddressName] = useState("");
  const [pos, setPos] = useState({
    center: {
      lat: 32.04949,
      lng: 34.8108,
    },
    zoom: 11,
  });

  const [posList, setPostList] = useState([
    { lat: 32.05081, lng: 34.81153, text: "Here i started my Life" },
    { lat: 32.049492, lng: 34.810799, text: "Here i Live now" },
  ]);

  const renderMarkers = (map, maps) => {
    // console.log(maps.Marker());
    posList.map((pos) => {
      let marker = new maps.Marker({
        position: pos,
        map,
        title: pos.text,
      });
      return marker;
    });
  };

  // Geo Codde \\
  const getAddressName = ({ lat, lng }) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        SetPositionAddressName(response.results[0].formatted_address);
        setSearchPos(response.results[0].formatted_address);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const findPosByAddress = (address) => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        getAddressName({ lat, lng });
        setPos({
          center: { lat, lng },
          zoom: 20,
        });
        SetPositionFound(true);
      },
      (error) => {
        alert(error);
        SetPositionFound(false);
      }
    );
  };

  const clickHandler = () => {
    findPosByAddress(searchPos);
  };

  return (
    <div style={{ minHeight: "50vh" }}>
      <h1>This page is still under construction....please be patient</h1>

      <Container style={{ display: "flex", justifyContent: "center" }}>
        <FloatingLabel
          style={{ width: "15%" }}
          controlId="floatingInputGrid"
          label="Find your position"
        >
          <Form.Control
            placeholder="a"
            value={searchPos || positionAddressName}
            onChange={(e) => setSearchPos(e.target.value)}
          />
        </FloatingLabel>
        <Button onClick={clickHandler}>
          {!positionAddressName ? "Search!" : "Add!"}
        </Button>
      </Container>
      <Container>{positionFound ? <>{}</> : null}</Container>

      <div className="gm_wrapper">
        <GoogleMapReact
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          onClick={(e) =>
            setPos({
              center: {
                lat: e.lat,
                lng: e.lng,
              },
              zoom: 11,
            })
          }
          yesIWantToUseGoogleMapApiInternals={true}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAP_KEY,
            // language: "he",
          }}
          center={pos.center}
          zoom={pos.zoom}
        ></GoogleMapReact>
      </div>
    </div>
  );
}
