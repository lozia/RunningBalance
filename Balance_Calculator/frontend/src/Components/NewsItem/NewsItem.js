
function NewsItem (title, source, time) {


    return <div className="news-item">
        <h4 className="news-title">{title}</h4>
        <p className="news-source">
            {source}
        </p>
        <p className="news-publishedAt">
            {time}
        </p>
    </div>

}

export default NewsItem