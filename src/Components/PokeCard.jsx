import { Card, Placeholder } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";
import CardCSS from "../CSS/Card.module.css";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazy-load";
import Bowser from "bowser";

export default function PokeCard(props) {
  const isMobile =
    Bowser.getParser(window.navigator.userAgent).parsedResult.platform.type ===
    "mobile";

  const searched = useSelector((state) => state.search.value);

  // console.log(props.card);
  const marketHandler = () => {
    let hasCardMarketPrices, hasTCGPrices;
    try {
      hasCardMarketPrices = props.card.hasOwnProperty("cardmarket");
      hasTCGPrices = props.card.hasOwnProperty("tcgplayer");

      if (hasTCGPrices) {
        if (Object.keys(props.card.tcgplayer.prices).length > 0) {
          props.card.avn_price =
            props.card.tcgplayer.prices[
              Object.keys(props.card.tcgplayer.prices)[0]
            ].market;
        } else props.card.avn_price = 0;
      } else if (hasCardMarketPrices)
        props.card.avn_price = props.card.cardmarket.prices.trendPrice;
      else {
        console.log(props.card);
        props.card.avn_price = 0;
      }

      return props.card.avn_price;
    } catch (error) {}
  };

  return (
    <>
      <Card className="pokecard">
        <Card.Header className={CardCSS.card_header}>
          {props.card.name}
          {": "}
          {props.card.rarity
            ? !props.card.rarity.includes("ommon")
              ? props.card.rarity
              : ""
            : ""}
        </Card.Header>
        <Card.Body
          style={{
            background:
              "repeating-linear-gradient( -55deg, #222, #222 10px, #333 10px, #333 20px )",
          }}
        >
          <Zoom triggerOnce>
            <LazyLoad>
              <Card.Img onClick={props.onClick} src={props.card.images.small} />
            </LazyLoad>
          </Zoom>
        </Card.Body>
        <Card.Footer>
          <div className="footer_container">
            <p style={{ color: "#b9b18e" }}>{marketHandler()}$</p>
            {!isMobile ? (
              <p>
                {props.card.number}/{props.card.set.total}
                {searched ? "(" + props.card.set.name + ")" : ""}
              </p>
            ) : (
              <p>
                {props.card.number}/{props.card.set.total}
              </p>
            )}
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}
