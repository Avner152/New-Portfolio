import pokemon from "pokemontcgsdk";
import {
  Button,
  Container,
  Image,
  Row,
  Col,
  Card,
  Carousel,
  Placeholder,
} from "react-bootstrap";
import LazyLoad from "react-lazy-load";

// import chari from "../assets/charizard.png";
import bg from "../../assets/bg.jpg";
import logo from "../../assets/logo.png";
import booster from "../../assets/booster.webp";
import { Slide, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import Bowser from "bowser";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchString, nameList } from "../../redux/searchSlice";

export default function Main() {
  const [randomPokemon, setRandomPokemon] = useState([]);
  const [randomColor, setRandomColor] = useState("");
  const [regen, setRegen] = useState(true);
  const isMobile =
    Bowser.getParser(window.navigator.userAgent).parsedResult.platform.type ===
    "mobile";
  const list = useSelector((state) => state.search.list);

  const dispatch = useDispatch();
  useEffect(() => {
    if (list.length > 0) {
      let rand = 5 + Math.floor(Math.random() * 256);
      pokemon.card.all({ q: `name:${list[rand].name}` }).then((set) => {
        setRandomPokemon(
          set
            .sort((c1, c2) => {
              let num;
              try {
                num =
                  c1.cardmarket.prices.trendPrice >
                  c2.cardmarket.prices.trendPrice;
              } catch (error) {
                return 0;
              }
              return num;
            })
            .slice(0, 6)
        );
      });
    }
  }, [list, regen]);

  useEffect(() => {
    if (randomPokemon.length < 6 && randomPokemon.length > 0) {
      console.log("less than 6");
      for (const k in randomPokemon) {
        let temp = [...randomPokemon, randomPokemon[k]];
        setRandomPokemon(temp);
      }
    }
  }, [randomPokemon]);

  useEffect(() => {
    if (randomPokemon.length)
      setRandomColor(`var(--${randomPokemon[0].types[0]})`);
  }, [randomPokemon]);

  const desktopInit = () => {
    return (
      <>
        <section id="sec2" className="sec2">
          <Image className="logo" width={350} src={logo} />
          <div
            style={{
              float: "left",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image className="normalimg" src={booster} />
            <div style={{ position: "relative", bottom: "100px" }}>
              <Link to={"/set"}>
                <Button className="sec2_buttons">Find Your Set</Button>
              </Link>
              <Button className="sec2_buttons">Log In!</Button>
            </div>
          </div>
          <Container
            style={{ display: "flex", flexWrap: "wrap", maxWidth: "50%" }}
          ></Container>
          {randomPokemon.length >= 6 ? (
            <Link
              onClick={() =>
                dispatch(
                  searchString(
                    list[randomPokemon[0].nationalPokedexNumbers[0] - 1].name
                  )
                )
              }
              to={`/set/${
                list[randomPokemon[0].nationalPokedexNumbers[0] - 1].name
              }`}
            >
              <Container
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  maxWidth: "50%",
                }}
              >
                <Row>
                  <Col>
                    <Card className="pokecard">
                      <Card.Header></Card.Header>
                      <Card.Body>
                        <Zoom triggerOnce>
                          <Card.Img src={randomPokemon[0].images.small} />
                        </Zoom>
                      </Card.Body>
                      <Card.Footer>
                        <div className="footer_container"></div>
                      </Card.Footer>
                    </Card>
                  </Col>

                  <Col style={{ zIndex: 5 }} xs={6}>
                    <Card className="pokecard">
                      <Card.Header></Card.Header>
                      <Card.Body>
                        <Zoom triggerOnce>
                          <Card.Img src={randomPokemon[1].images.small} />
                        </Zoom>
                      </Card.Body>
                      <Card.Footer>
                        <div className="footer_container"></div>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="pokecard">
                      <Card.Header></Card.Header>
                      <Card.Body>
                        <Zoom triggerOnce>
                          <Card.Img src={randomPokemon[2].images.small} />
                        </Zoom>
                      </Card.Body>
                      <Card.Footer>
                        <div className="footer_container"></div>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
                <span
                  style={{
                    backgroundColor: `var(--${randomPokemon[0].types[0]})`,
                  }}
                  className="random-des"
                >
                  Random Pokemon
                </span>
                <span
                  style={{
                    backgroundColor: `var(--${randomPokemon[0].types[0]})`,
                  }}
                  className="random-name-des"
                >
                  {list[randomPokemon[0].nationalPokedexNumbers - 1].name}
                </span>
                <Row style={{ position: "relative", top: "-10vw" }}>
                  <Col style={{ zIndex: 6 }} xs={5}>
                    <Card className="pokecard">
                      <Card.Header></Card.Header>
                      <Card.Body>
                        <Zoom triggerOnce>
                          <Card.Img src={randomPokemon[3].images.small} />
                        </Zoom>
                      </Card.Body>
                      <Card.Footer>
                        <div className="footer_container"></div>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col style={{ zIndex: 6 }}>
                    <Card className="pokecard">
                      <Card.Header></Card.Header>
                      <Card.Body>
                        <Zoom triggerOnce>
                          <Card.Img src={randomPokemon[4].images.small} />
                        </Zoom>
                      </Card.Body>
                      <Card.Footer>
                        <div className="footer_container"></div>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col xs={4}>
                    <Card className="pokecard">
                      <Card.Header></Card.Header>
                      <Card.Body>
                        <Zoom triggerOnce>
                          <Card.Img src={randomPokemon[5].images.small} />
                        </Zoom>
                      </Card.Body>
                      <Card.Footer>
                        <div className="footer_container"></div>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Link>
          ) : (
            <>
              <Container
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  maxWidth: "50%",
                }}
              >
                <Row>
                  <Col>
                    <Placeholder
                      as={Card}
                      className="pokecard"
                      animation="glow"
                    >
                      <Placeholder as={Card.Header}></Placeholder>
                      <Placeholder as={Card.Body}>
                        <Placeholder as={Card.Img} src={bg} />
                      </Placeholder>
                      <Placeholder as={Card.Footer}>
                        <div className="footer_container"></div>
                      </Placeholder>
                    </Placeholder>
                  </Col>

                  <Col style={{ zIndex: 5 }} xs={6}>
                    <Placeholder
                      as={Card}
                      className="pokecard"
                      animation="glow"
                    >
                      <Placeholder as={Card.Header}></Placeholder>
                      <Placeholder as={Card.Body}>
                        <Placeholder as={Card.Img} src={bg} />
                      </Placeholder>
                      <Placeholder as={Card.Footer}>
                        <div className="footer_container"></div>
                      </Placeholder>
                    </Placeholder>
                  </Col>
                  <Col>
                    <Placeholder
                      as={Card}
                      className="pokecard"
                      animation="glow"
                    >
                      <Placeholder as={Card.Header}></Placeholder>
                      <Placeholder as={Card.Body}>
                        <Placeholder as={Card.Img} src={bg} />
                      </Placeholder>
                      <Placeholder as={Card.Footer}>
                        <div className="footer_container"></div>
                      </Placeholder>
                    </Placeholder>
                  </Col>
                </Row>

                <Row style={{ position: "relative", top: "-10vw" }}>
                  <Col style={{ zIndex: 6 }} xs={5}>
                    <Placeholder
                      as={Card}
                      className="pokecard"
                      animation="glow"
                    >
                      <Placeholder as={Card.Header}></Placeholder>
                      <Placeholder as={Card.Body}>
                        <Placeholder as={Card.Img} src={bg} />
                      </Placeholder>
                      <Card.Footer>
                        <div className="footer_container"></div>
                      </Card.Footer>
                    </Placeholder>
                  </Col>
                  <Col style={{ zIndex: 6 }}>
                    <Placeholder
                      as={Card}
                      className="pokecard"
                      animation="glow"
                    >
                      <Placeholder as={Card.Header}></Placeholder>
                      <Placeholder as={Card.Body}>
                        <Placeholder as={Card.Img} src={bg} />
                      </Placeholder>
                      <Placeholder as={Card.Footer}>
                        <div className="footer_container"></div>
                      </Placeholder>
                    </Placeholder>
                  </Col>
                  <Col xs={4}>
                    <Placeholder
                      as={Card}
                      className="pokecard"
                      animation="glow"
                    >
                      <Placeholder as={Card.Header}></Placeholder>
                      <Placeholder as={Card.Body}>
                        <Placeholder as={Card.Img} src={bg} />
                      </Placeholder>
                      <Placeholder as={Card.Footer}>
                        <div className="footer_container"></div>
                      </Placeholder>
                    </Placeholder>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </section>
      </>
    );
  };

  const mobileInit = () => {
    return (
      <>
        <Image className="logo" width={350} src={logo} />
        <div
          style={{
            float: "left",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image className="normalimg" src={booster} />
          <div style={{ position: "relative", bottom: "100px" }}>
            <Link to={"/set"}>
              <Button className="sec2_buttons">Find Your Set</Button>
            </Link>
            <Button className="sec2_buttons">Log In!</Button>
          </div>
        </div>
        <div style={{ marginTop: "20vw" }}>
          {randomPokemon.length > 0 ? (
            <>
              <hr className="hr" />
              <div className="t_h1">
                <h1
                  className="mb-3"
                  style={{
                    backgroundColor: `var(--${randomPokemon[0].types[0]})`,
                    fontWeight: 600,
                  }}
                >
                  {randomPokemon[0].name}
                </h1>
              </div>
              <Carousel className="main_carousel" touch={true} interval={null}>
                {randomPokemon.map((rp, k) => (
                  <Carousel.Item key={k}>
                    <LazyLoad>
                      <Image src={rp.images.large} />
                    </LazyLoad>
                  </Carousel.Item>
                ))}
              </Carousel>
            </>
          ) : (
            <>
              <Placeholder
                as={Card}
                animation="wave"
                style={{ margin: "auto", width: "19rem", alignItems: "center" }}
              >
                <Placeholder
                  as={Card.Img}
                  src={bg}
                  animation="wave"
                  style={{ maxWidth: "19rem", borderRadius: "1rem" }}
                />
              </Placeholder>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Button
        className="regen_btn"
        style={{
          boxShadow: "unset",
          backgroundColor: randomColor,
          border: "3px solid #282828",
        }}
        onClick={() => setRegen(!regen)}
      >
        Regenerate Pokemon!
      </Button>
      {!isMobile ? desktopInit() : mobileInit()}
    </>
  );
}
