import React, { Component } from 'react';

import BaseUrl from "../AppConfig";

class DetailRepository {

    //-----------------------------
    async Get_Detail (urll) {
      console.log("Detail_Repository.js, Get_Detail, Page ID : ", urll);
      let resCNews=[];
      try {
          resCNews = await fetch(BaseUrl+'posts/'+urll, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          resCNews = await resCNews.json();
          // console.log("HomeScreen.js, GETData",res[0].date);
          // console.log("HomeScreen.js, GETData",res.length);
          let ImgUrl='';
            try {
              let resUrl = await fetch(resCNews._links['wp:featuredmedia'][0].href, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              resUrl = await resUrl.json();

              var results = resUrl["media_details"];
              results = results['sizes'];
              
                resCNews._links['wp:featuredmedia'][0].href = resUrl.media_details.sizes.full.source_url;
            } catch (e) {
              console.error(e);
            }
            //resCNews[0]._links['wp:featuredmedia'][0].href = ImgUrl;            
            return resCNews;
        } catch (e) {
          console.error(e);
        }
    }
    //-----------------------------
    async Get_SeriesDetail (urll) {
      console.log("Detail_Repository.js, Get_Detail, Page ID : ", urll);
      let resCNews=[], resUrl, l;
      try {
          resCNews = await fetch(urll, {
            method: 'GET',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json',},
          });
          resCNews = await resCNews.json();
          
          for(l=0; l<resCNews.length; l++){
            console.log("HomeScreen.js, GETData",resCNews[l]._links['wp:featuredmedia'][0].href);
            try {
                resUrl = await fetch(resCNews[l]._links['wp:featuredmedia'][0].href, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              resUrl = await resUrl.json();
              resCNews[l]._links['wp:featuredmedia'][0].href = resUrl.media_details.sizes.full.source_url;
              console.log("HomeScreen.js, GETData",resCNews[l]._links['wp:featuredmedia'][0].href);
            } catch (e) {
              console.error(e);
            }
            if(l>=resCNews.length-1){
              return resCNews;
            }
          }

          return resCNews;
        } catch (e) {
          console.error(e);
        }
    }

}

  const DR = new DetailRepository();

  export default DR;