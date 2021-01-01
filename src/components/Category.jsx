import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import phone from "../components/images/phone.jpg";
import cars from "./images/cars.png";
import books from "./images/books.jpeg";
import mobile from "./images/mobiles.jpg";
import sports from "./images/sports.jpg";
import toy from "./images/toys.JPG";
import furniture from "./images/furniture.jpg";

import "../styles/category.css";
import { MdToys } from "react-icons/md";
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <table className="table-responsive">
          <tr>
            <td>
              <h5
                style={{
                  color: "orange",
                  padding: "45px",
                  fontWeight: "bold",
                }}
              >
                ALL CATEGORIES
              </h5>
            </td>
            <td>
              <div style={{ marginTop: "20%" }}>
                <a href="/category?Vehicles">
                  <img className="cat" src={cars} alt="cars" />
                  <p>CARS</p>
                </a>
              </div>
            </td>
            <td>
              <div style={{ marginTop: "20%" }}>
                <a href="/category?Electronics">
                  <img className="cat" src={mobile} alt="electronics" />
                  <p>ELECTRONICS</p>
                </a>
              </div>
            </td>
            <td>
              <div style={{ marginTop: "20%" }}>
                <a href="/category?Books">
                  <img className="cat" src={books} alt="books" />
                  <p>BOOKS</p>
                </a>
              </div>
            </td>
            <td>
              <div style={{ marginTop: "20%" }}>
                <a href="/category?Furniture">
                  <img className="cat" src={furniture} alt="furniture" />
                  <p>FURNITURE</p>
                </a>
              </div>
            </td>{" "}
            <td>
              <div style={{ marginTop: "20%" }}>
                <a href="/category?Toys">
                  <img className="cat" src={toy} alt="toys" />
                  <p>TOYS</p>
                </a>
              </div>
            </td>{" "}
            <td>
              <div style={{ marginTop: "20%" }}>
                <a href="/category?Sports">
                  <img className="cat" src={sports} alt="Sports" />
                  <p>SPORTS</p>
                </a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Category;
