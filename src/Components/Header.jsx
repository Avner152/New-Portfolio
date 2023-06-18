import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Bowser from "bowser";
import { slide as Menu } from "react-burger-menu";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { searchString, nameList } from "../redux/searchSlice";

export default function Header() {
  const [hamburgerOpened, setHamburgerOpened] = useState(false);
  const [profile, setProfile] = useState(null);
  const [provider, setProvider] = useState("");
  const [names, setNames] = useState([]);
  const [isMobile, setIsMobile] = useState(
    Bowser.getParser(window.navigator.userAgent).parsedResult.platform.type ===
      "mobile"
  );

  const str = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const nav_model = [
    { url: "/", text: "Home" },
    { url: "/set", text: "Sets" },
    { url: "/profile", text: "Profile" },
    { url: "/edit", text: "Edit" },
    { url: "/buy", text: "Buy" },
    { url: "/contact", text: "Contact Us" },
  ];

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=1000")
      .then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          setNames((names) => [
            ...names,
            { id: i, name: res.data.results[i].name },
          ]);
          dispatch(nameList({ id: i, name: res.data.results[i].name }));
        }
        // dispatch(nameList([...names]));
      })
      .catch((err) => console.log(err));
  }, []);

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const hamburgerHandler = () => {
    setHamburgerOpened(!hamburgerOpened);
    console.log(hamburgerOpened);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    dispatch(searchString(item.name));
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span
          style={{
            display: "block",
            textAlign: "left",
          }}
        >
          {item.name}
        </span>
      </>
    );
  };

  return (
    <>
      {!isMobile ? (
        <nav id="navigation">
          <ul className="flexed menuItems">
            {nav_model.map((m, k) => (
              <li key={k}>
                <Link to={m.url} data-item={m.text}>
                  {m.text}
                </Link>
              </li>
            ))}
            <li>
              <div className="search_wrapper" style={{ display: "flex" }}>
                <div style={{ color: "#fff" }}>Find a Pokemon:</div>
                <div id="search_bar">
                  <ReactSearchAutocomplete
                    items={names}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    formatResult={formatResult}
                  />
                </div>
              </div>
            </li>
          </ul>
          <div className="flexed to_right">
            {/* <LoginSocialFacebook
              isOnlyGetToken
              appId={process.env.REACT_APP_FB_APP_ID || ""}
              onLoginStart={onLoginStart}
              onResolve={({ provider, data }) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <FacebookLoginButton />
            </LoginSocialFacebook> */}
          </div>
        </nav>
      ) : (
        <>
          <Menu
            isOpen={hamburgerOpened}
            onOpen={hamburgerHandler}
            onClose={hamburgerHandler}
          >
            <div id="mobile_bar">
              <ReactSearchAutocomplete
                items={names}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                formatResult={formatResult}
              />
            </div>
            {nav_model.map((m, k) => (
              <Link
                onClick={hamburgerHandler}
                to={m.url}
                data-item={m.text}
                key={k}
              >
                {m.text}
              </Link>
            ))}
          </Menu>
        </>
      )}
    </>
  );
}
