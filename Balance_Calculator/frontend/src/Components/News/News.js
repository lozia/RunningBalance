import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import './News.scss'
import NewsItem from '../NewsItem/NewsItem';



function News() {
    const {news, getNews} = useGlobalContext()
    useEffect(() =>{
        getNews()
    }, [])

    return(
        <div className='news-main'>
            <InnerLayout>
                <h1>NEWS</h1>
                <h2 className="news-intro">Today's Happening <span>{}</span></h2>
                <div className='news-content'>
                {news.map((data) => {
                    // console.log(length(data))
                    return <NewsItem title={data.title} source={data.source} time={data.publishedAt} />
                })}
                </div>
            </InnerLayout>
        </div>
    )

    
}


export default News