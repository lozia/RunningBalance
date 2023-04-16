import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import './News.scss'



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

                </div>
            </InnerLayout>
        </div>
    )

    
}


export default News