import { Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchString } from "../../redux/searchSlice";

export default function Body() {
  const series = [
    { name: "Base", img: "https://images.pokemontcg.io/base1/logo.png" },
    { name: "Gym", img: "https://images.pokemontcg.io/gym1/logo.png" },
    { name: "Neo", img: "https://images.pokemontcg.io/neo1/logo.png" },
    { name: "Legendary", img: "https://images.pokemontcg.io/base6/logo.png" },
    { name: "E-Card", img: "https://images.pokemontcg.io/ecard1/logo.png" },
    { name: "EX", img: "https://images.pokemontcg.io/ex1/logo.png" },
    {
      name: "Diamond & Pearl",
      img: "https://images.pokemontcg.io/dp1/logo.png",
    },
    {
      name: "POP",
      img: "https://den-media.pokellector.com/logos/Nintendo-Promos.logo.50.png",
    },
    {
      name: "Platinum",
      img: "https://images.pokemontcg.io/pl1/logo.png",
    },
    {
      name: "HeartGold & SoulSilver",
      img: "https://images.pokemontcg.io/hgss1/logo.png",
    },
    {
      name: "Black & White",
      img: "https://images.pokemontcg.io/bw1/logo.png",
    },
    {
      name: "XY",
      img: "https://images.pokemontcg.io/xy1/logo.png",
    },
    {
      name: "Sun & Moon",
      img: "https://images.pokemontcg.io/sm1/logo.png",
    },
    {
      name: "Sword & Shield",
      img: "https://images.pokemontcg.io/swsh1/logo.png",
    },
    {
      name: "Scarlet & Violet",
      img: "https://images.pokemontcg.io/sv1/logo.png",
    },
  ];

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const toSearch = useSelector((state) => state.search.value);

  return (
    <>
      <h1>IL-PokeCollector by Avner Levy</h1>
      <h4>1.1V</h4>

      <div className="series">
        {series.map((s, k) => (
          <Link to={`/sets/${s.name}`} className="img pulse" key={k}>
            <Image width={200} src={s.img} />
          </Link>
        ))}
      </div>

      {toSearch ? navigate(`/set/filter`) : null}
    </>
  );
}
