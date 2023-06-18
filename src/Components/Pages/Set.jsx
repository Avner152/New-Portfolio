import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokeCard from "../PokeCard";
import pokemon from "pokemontcgsdk";
import masterball150 from "../../assets/masterball150.png";
import { useSelector } from "react-redux";
import {
  Dropdown,
  Image,
  Spinner,
  Carousel,
  Modal,
  Button,
  Placeholder,
  Card,
  Container,
} from "react-bootstrap";
import Bowser from "bowser";
import LazyLoad from "react-lazy-load";

export default function Set() {
  const isMobile =
    Bowser.getParser(window.navigator.userAgent).parsedResult.platform.type ===
    "mobile";
  pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });

  const [chosenIdx, setChosenIdx] = useState(0);
  const [show, setShow] = useState(false);

  const [cards, setCards] = useState([]);
  const [ready, setReady] = useState(false);
  const [edition, setEdition] = useState(0);
  const [hasFirstEdition, setHasFirstEdition] = useState(0);
  const [sortMethod, setSortMethod] = useState("ID");
  const { set_id } = useParams();
  const toSearch = useSelector((state) => state.search.value);
  var firstSetIs = "";

  console.log("toSearch is: ", toSearch);

  const findCardsBySet = () => {
    pokemon.card.all({ q: `id:${set_id}` }).then((set) => {
      console.log("findCardsBySet: ", set);
      setCards(set.sort((c1, c2) => c1.id.split("-")[1] - c2.id.split("-")[1]));
      // setHasFirstEdition(Object.keys(set[0].tcgplayer.prices).length > 1);

      setReady(true);
    });
  };
  const findCardsByName = () => {
    pokemon.card.all({ q: `name:${toSearch}` }).then((set) => {
      console.log("findCardsByName: ", set);
      setCards(set.sort((c1, c2) => c1.id.split("-")[1] - c2.id.split("-")[1]));
      // setHasFirstEdition(Object.keys(set[0].tcgplayer.prices).length > 1);

      setReady(true);
    });
  };

  useEffect(() => {
    !toSearch ? findCardsBySet() : findCardsByName();
  }, [toSearch]);

  const editionHandler = () => {
    edition ? setEdition(0) : setEdition(1);
  };

  const sortById = () => {
    setCards(
      [...cards].sort((c1, c2) => c1.id.split("-")[1] - c2.id.split("-")[1])
    );
    setSortMethod("ID");
  };
  const sortByName = (e, order) => {
    let asc = [...cards].sort((c1, c2) => {
      if (c1.name < c2.name) return -1;
      else if (c1.name > c2.name) return 1;
      else return 0;
    });
    if (order) asc.sort().reverse();
    setCards(asc);

    setSortMethod(e.target.innerHTML);
    // setCards([cards.sort((card1, card2) => card1.set.name - card2.set.name)]);
  };
  const sortByPrice = (e, order) => {
    let asc = [...cards].sort((c1, c2) => c1.avn_price - c2.avn_price);
    if (!order) asc.sort().reverse();

    setCards(asc);

    setSortMethod(e.target.innerHTML);
  };

  const handleSelect = (selectedIndex, e) => {
    setChosenIdx(selectedIndex);
  };

  return (
    <>
      {!ready ? (
        <>
          <h1>Hold on a little ... </h1>
          <div className="flexed">
            {[...new Array(25)].map((item, k) => (
              <Card
                key={k}
                className="pokecard waiting"
                style={{ width: "15rem" }}
              >
                <Placeholder as={Card.Header} animation="glow">
                  <Placeholder xs={6} /> <Placeholder xs={4} />
                </Placeholder>

                <Card.Body className="waiting_body" animation="wave" />
                <Card.Footer>
                  <div className="footer_container">
                    <Placeholder
                      as={Card.Footer}
                      animation="glow"
                      style={{ width: "15rem" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Placeholder xs={3} />
                        <Placeholder xs={5} />
                      </div>
                    </Placeholder>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </div>

          <Card className="pokecard" style={{ width: "15rem" }}>
            <Placeholder as={Card.Header} animation="glow">
              <Placeholder xs={6} /> <Placeholder xs={4} />
            </Placeholder>

            <Card.Body
              style={{
                background:
                  "repeating-linear-gradient( -55deg, #222, #222 10px, #333 10px, #333 20px )",
              }}
            >
              <Card.Img />
            </Card.Body>
            <Card.Footer>
              <div className="footer_container">
                <Placeholder
                  as={Card.Footer}
                  animation="glow"
                  style={{ width: "15rem" }}
                >
                  <Placeholder xs={6} />
                </Placeholder>
              </div>
            </Card.Footer>
          </Card>
        </>
      ) : (
        <>
          {!toSearch ? (
            <>
              <Image className="cover_img" src={cards[0].set.images.logo} />
              <p style={{ fontSize: ".75rem" }}>{cards[0].set.releaseDate}®</p>
            </>
          ) : (
            <h1 style={{ textTransform: "capitalize" }}>{toSearch}</h1>
          )}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort By: {sortMethod}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={sortById} active>
                ID
              </Dropdown.Item>
              <Dropdown.Item
                value="Ascending Name A-Z"
                onClick={(e) => sortByName(e, 0)}
              >
                Ascending Name A-Z
              </Dropdown.Item>
              <Dropdown.Item
                value="Descending Name Z-Z"
                onClick={(e) => sortByName(e, 1)}
              >
                Descending Name Z-A
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => sortByPrice(e, 0)}>
                Price High to Low
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => sortByPrice(e, 1)}>
                Price Low to High
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="flexed">
            {cards.map((c, k) => (
              <PokeCard
                card={c}
                idx={k}
                key={k}
                edition={edition}
                price={hasFirstEdition ? 0 : 1}
                total={cards.length}
                onClick={() => {
                  setShow(true);
                  setChosenIdx(k);
                }}
              />
            ))}
          </div>
        </>
      )}

      {cards.length > 0 ? (
        <Modal show={show} size="md" onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <h1>{cards[chosenIdx].name}</h1>
          </Modal.Header>
          <Modal.Body>
            <Carousel
              touch={true}
              interval={null}
              activeIndex={chosenIdx}
              onSelect={handleSelect}
            >
              {cards.map((card, k) => (
                <Carousel.Item key={k}>
                  <LazyLoad>
                    <Image src={card.images.small} />
                  </LazyLoad>
                </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
          <Modal.Footer style={{ flexDirection: "column" }}>
            {/* <div style={{ display: "flex" }}> */}
            <p
              style={
                cards[chosenIdx].types
                  ? { backgroundColor: `var(--${cards[chosenIdx].types[0]})` }
                  : {}
              }
            >
              <b>Artist</b>: {cards[chosenIdx].artist}
            </p>
            <p
              style={
                cards[chosenIdx].types
                  ? { backgroundColor: `var(--${cards[chosenIdx].types[0]})` }
                  : {}
              }
            >
              <b>Rarity</b>: {cards[chosenIdx].rarity}
            </p>
            <p
              style={
                cards[chosenIdx].types
                  ? { backgroundColor: `var(--${cards[chosenIdx].types[0]})` }
                  : {}
              }
            >
              <b>Average Sell Price</b>:{" "}
              <span
                style={
                  cards[chosenIdx].types
                    ? { backgroundColor: `var(--${cards[chosenIdx].types[0]})` }
                    : {}
                }
              >
                {cards[chosenIdx].avn_price}$
              </span>
            </p>
            <a
              style={
                cards[chosenIdx].types
                  ? { backgroundColor: `var(--${cards[chosenIdx].types[0]})` }
                  : {}
              }
              href={
                cards[chosenIdx].cardmarket
                  ? cards[chosenIdx].cardmarket.url
                  : "#"
              }
              target={cards[chosenIdx].cardmarket ? "_blank" : "_self"}
            >
              {cards[chosenIdx].cardmarket
                ? "Compare Prices!"
                : "No Data to Compare :("}
            </a>
            {/* </div> */}
          </Modal.Footer>
        </Modal>
      ) : (
        <></>
      )}

      {hasFirstEdition ? (
        <div className="flexed">
          {/* <Form.Check type="switch" onChange={editionHandler}></Form.Check> */}
          <div className="toggle-button-cover" onClick={editionHandler}>
            <div className="button b2" id="edition-toggle">
              <input type="checkbox" className="checkbox" />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
