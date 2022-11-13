import { GoPrimitiveDot } from "react-icons/go";
import { AiFillFire } from "react-icons/ai";
import { TiArrowRepeat } from "react-icons/ti";
import "./index.css";

const Card = (props) => {
  const { cardData } = props;
  const { title, iconUrl, link, description, category, tag, id } = cardData;

  return (
    <div className="card-item">
      <div className="img-container">
        <img src={iconUrl} className="card-img" />
        <div className="name-container">
          <p className="para">{title}</p>
          <p className="category">{category}</p>
        </div>
      </div>
      <div className="desc-container">
        <p className="link">{link}</p>
        <p className="desc">{description}</p>
      </div>
    </div>
  );
};
export default Card;
