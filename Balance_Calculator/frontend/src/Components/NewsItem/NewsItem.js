import './NewsItem.scss'
import React from 'react'

function NewsItem ({ title, source, publishedAt, url}) {

    return <div className="news-item">
        <h4 className="news-title">
            <a href={url}>
                {title}
            </a>
        </h4>
        <p className='new-source'>
            {source.name}
        </p>
        <p className="news-publishedAt">
            {publishedAt}
        </p>
    </div>

}

export default NewsItem