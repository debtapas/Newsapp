import { wait } from '@testing-library/user-event/dist/utils';
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {    
    constructor(){
        super();
      //  console.log("This is constuructior for new compoment");
        this.state = {
            articles : [],
            loading : false,
            page : 1
        }
    }
    async componentDidMount(){
      //console.log("cdm");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=46adb4196f1f48b1a0ec19ccfd480b77&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();
      //console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      })
    }

    handlePrevClick = async()=>{      
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=46adb4196f1f48b1a0ec19ccfd480b77&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })
    }
    handleNextClick = async()=>{
      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=46adb4196f1f48b1a0ec19ccfd480b77&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
          this.setState({loading: true})
          let data = await fetch(url)
          let parsedData = await data.json()
          this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
          })
      }      
    }

  render() {
    //console.log("render")''
    // const { articles } = this.state;
    var articles = this.state.articles
    
    return (
      <>
      {articles.length>0 && 
            
            <div className='container my-5'>
              <h1 className="text-center">Top Headlines</h1>
              {this.state.loading && <Spinner/>}
              <div className="row">
              {!this.state.loading && this.state.articles.map((element)=>{
                  return <div className="col-md-3" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 40) : ''} description={element.description ? element.description.slice(0, 95) : ''} imageUrl={element.urlToImage} newsUrl={element.url} newsAuthor={element.author} newsDate={element.publishedAt} newSource={element.source.name} />
              </div>
              })}            
              </div>
              <div className="container d-flex justify-content-around">
                <button disabled = {this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&laquo; Previous</button>
                <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &raquo;</button>
              </div>
            </div>          
      }
      </>      
    )
  }
}

export default News