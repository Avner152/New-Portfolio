import pokemon from "pokemontcgsdk";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import cardsCSS from "../../CSS/Sets.module.css";
import LazyLoad from "react-lazy-load";
import { useDispatch } from "react-redux";
import { searchString } from "../../redux/searchSlice";

export default function SetList() {
  pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
  const [cards, setCards] = useState([]);
  const { _set } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    pokemon.set.all({ q: `series:"${_set}"` }).then((sets) => {
      console.log(sets); // "Base"
      setCards(sets);
    });

    dispatch(searchString(""));
    // pokemon.set.where({ q: `series:${_set}` }).then((set) => {
    //   console.log(set.data);
    // });
  }, []);

  return (
    <div className="mt-5" style={{ minHeight: "51vh" }}>
      {cards.length > 0 ? (
        <Image width={250} src={cards[0].images.logo} />
      ) : null}
      <Container className="flexed mt-3">
        <Row>
          {cards.map((c, k) => (
            <Col xs={6} key={k}>
              <Link to={`/set/${c.id}`}>
                <Card className={cardsCSS.pkm_card}>
                  <Card.Header className={cardsCSS.card_header}>
                    {c.name}
                  </Card.Header>
                  <Card.Body className={cardsCSS.card_body}>
                    <div className={cardsCSS.wrapper}>
                      <LazyLoad>
                        <Card.Img
                          src={c.images.logo}
                          className={cardsCSS.logo}
                        />
                      </LazyLoad>
                      <LazyLoad>
                        <Card.Img
                          src={c.images.symbol}
                          className={cardsCSS.symbol}
                        />
                      </LazyLoad>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
