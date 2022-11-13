import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

function AddItem() {
  const [apiStatus, setapiStatus] = useState(apiStatusConstants.initial);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notify = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notify1 = () => {
    toast.error("error !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const back = () => {
    navigate("/path");
  };

  const onSubmit = (data) => {
    if (data === undefined) {
      notify1();
    } else {
      notify();
    }
    console.log(data);
  };

  const getCardsList = async () => {
    setapiStatus(apiStatusConstants.inProgress);
    const apiUrl = `https://media-content.ccbp.in/website/react-assignment/add_resource.json`;
    const options = {
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      //   const fetchedData = await response.json();
      //   setapiStatus(apiStatusConstants.success);
    } else {
      console.log("error");
      setapiStatus(apiStatusConstants.failure);
      notify1();
    }
  };
  return (
    <div className="">
      <div className="header-container">
        <img
          src="https://d1tgh8fmlzexmh.cloudfront.net/website/nextwave-logo.png"
          className="img s"
        />
        <div className="profile-container">
          <CgProfile className="profile" />
        </div>
      </div>
      <hr className="hr" />
      <div className="back">
        <p onClick={back}>back to Users</p>
      </div>

      <div className="add-item-container">
        <div className="cont">
          <h1>Item Details</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form-conatiner">
            <p>Item Name</p>
            <input {...register("ItemName", { required: true })} />
            {errors.ItemName && (
              <span className="error">This field is required</span>
            )}
            <p>LInk</p>
            <input {...register("LInk", { required: true })} />
            {errors.LInk && (
              <span className="error">This field is required</span>
            )}
            <p>Resource Name</p>
            <input {...register("ResourceName", { required: true })} />
            {errors.ResourceName && (
              <span className="error">This field is required</span>
            )}
            <p>Descrition</p>
            <input {...register("Descrition", { required: true })} />
            {errors.Descrition && (
              <span className="error">This field is required</span>
            )}

            <input type="submit" onClick={getCardsList} className="button" />
            <ToastContainer />
          </form>
        </div>
        <div>
          <img
            className="item-image"
            src="https://res.cloudinary.com/dtghwdvrz/image/upload/v1668336427/img1_xsntza.png"
          />
        </div>
      </div>
    </div>
  );
}
export default AddItem;
