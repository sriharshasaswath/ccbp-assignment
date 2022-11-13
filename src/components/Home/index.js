import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Button } from "react-bootstrap";
import FilterNav from "../FilterNav";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Loader from "react-loader-spinner";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import "./index.css";

const categoryOptions = [
  { item: "Resources", id: "0", value: "all" },
  { item: "Requests", id: "1", value: "request" },
  { item: "Users", id: "2", value: "user" },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

function Home() {
  const [cardsList, setcardsList] = useState([]);
  const [activeCategoryId, setactiveCategoryId] = useState("0");
  const [searchInput, setsearchInput] = useState("");
  const [apiStatus, setapiStatus] = useState(apiStatusConstants.initial);
  const navigate = useNavigate();

  useEffect(() => {
    getCardsList();
  }, []);

  useEffect(() => {
    getCardsList();
  }, [activeCategoryId]);

  useEffect(() => {
    getCardsList();
  }, [searchInput]);

  const enterSearchInput = () => {
    getCardsList();
  };

  const changeSearchInput = (searchInput) => {
    setsearchInput(searchInput);
    console.log(searchInput);
  };

  const changeCategory = (activeCategoryId) => {
    setactiveCategoryId(activeCategoryId);
    console.log(activeCategoryId);
  };

  const getCardsList = async () => {
    setapiStatus(apiStatusConstants.inProgress);
    const apiUrl = `https://media-content.ccbp.in/website/react-assignment/resources.json`;
    console.log(categoryOptions[parseInt(activeCategoryId)].value);
    const options = {
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.map((each) => ({
        title: each.title,
        iconUrl: each.icon_url,
        link: each.link,
        description: each.description,
        category: each.category,
        tag: each.tag,
        id: each.id,
      }));
      if (categoryOptions[parseInt(activeCategoryId)].value === "all") {
        setcardsList(updatedData);
        if (searchInput.length > 0) {
          setcardsList(cardsList.filter((each) => each.title == searchInput));
        }
      } else if (searchInput.length > 0) {
        setcardsList(cardsList.filter((each) => each.title == searchInput));
      } else {
        setcardsList(
          updatedData.filter(
            (each) =>
              each.tag === categoryOptions[parseInt(activeCategoryId)].value
          )
        );
      }

      setapiStatus(apiStatusConstants.success);
    } else {
      console.log("error");
      setapiStatus(apiStatusConstants.failure);
    }
  };

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader.TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const renderCardsListView = () => {
    return (
      <ul className="products-list">
        {cardsList.map((each) => (
          <Card cardData={each} key={each.id} />
        ))}
      </ul>
    );
  };

  const renderAllCards = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderCardsListView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  const addItem = () => {
    navigate("/addItem");
  };

  return (
    <div className="background">
      <div className="header-container">
        <img
          src="https://d1tgh8fmlzexmh.cloudfront.net/website/nextwave-logo.png"
          className="img"
        />
        <div className="profile-container">
          <Button variant="success" onClick={addItem}>
            Add Item
          </Button>
          <CgProfile className="profile" />
        </div>
      </div>
      <div>
        <FilterNav
          searchInput={searchInput}
          changeSearchInput={changeSearchInput}
          enterSearchInput={enterSearchInput}
          categoryOptions={categoryOptions}
          changeCategory={changeCategory}
          activeCategoryId={activeCategoryId}
        />
        {renderAllCards()}
      </div>
    </div>
  );
}

export default Home;
