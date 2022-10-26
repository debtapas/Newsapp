import React, { Component } from 'react'

export class NewsItem extends Component {    
  render() {
    let {title, description, imageUrl, newsUrl, newsAuthor, newsDate, newSource} = this.props;
    return (        
      <div className='my-3'>
        <div className="card" >
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '85%', zIndex: '1'}}>{newSource}</span>
            <img src={!imageUrl ? 'https://images.moneycontrol.com/static-mcnews/2022/10/stocks_market-stock_stock-1-770x433.jpg' : imageUrl} className="card-img-top" alt="..."/>            
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{!description ? 'There is no description of this news' : description}...</p>
                <p className="card-text"><small className="text-muted">By <strong>{!newsAuthor ? 'Unknow' : newsAuthor}</strong> on <strong>{new Date(newsDate).toGMTString()}</strong></small></p>
                <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem