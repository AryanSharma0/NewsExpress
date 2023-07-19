import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    categories: "general",
    totalResults: 0,
    articles: [],
  };
  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    categories: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [ ],
      loading: true,
      page: 1,
    };
    document.title = `NewsExpress-${this.capitalizeFirstLetter(
      this.props.category
    )} `;
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  async updateNews() {
    this.props.setProgress(0);
    console.log(process.env.REACT_APP_NEWS_API_KEY);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
        this.props.setProgress(30);

    let parsedData = await data.json();
        this.props.setProgress(50);

    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    await this.updateNews();
  }

  // For next page Data
  // nextSubmit = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };
  //  For previous Data
  // previousSubmit = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <div className="container my-4">
        <h2 style={{ marginTop: "90px" }}>
          NewsExpress -Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines{" "}
        </h2>
        {this.state.loading && <Spinner />}

        {this.state.articles ? (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element, index) => {
                  return (
                    <div className="col-md-3 mx-3" key={index}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGaZZyL_iov6-2PFhJ39KcaofpxtbVCEWoxTuxeCgPeh4ex6_003Y_LkkEZ5LlkxR0mK18jJVYB0&usqp=CAU&ec=48665701"
                        }
                        newsUrl={element.url ? element.url : ""}
                        author={element.author ? element.author : ""}
                        date={element.publishedAt ? element.publishedAt : ""}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        ) : (
          <div className="d-flex justify-content-center mt-5">
            Sorry, No Data found!!!
          </div>
        )}
        {/* For next or previous button but we have inserted infinite scrolling to it */}

        {/* <div>
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-dark btn-sm mx-4 px-4"
              onClick={this.previousSubmit}
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              onClick={this.nextSubmit}
              type="button"
              className="btn btn-dark btn-sm mx-4 px-4"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalArticles / this.props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div> */}
      </div>
    );
  }
}

export default News;
