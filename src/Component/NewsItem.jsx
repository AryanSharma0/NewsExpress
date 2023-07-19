import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, date,author } = this.props;
    return ( 
      <div className="container my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                {"jh "}
                {this.props.author ? `By ${author} on` : "On "}
                {"  "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <Link to={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Go To News
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
