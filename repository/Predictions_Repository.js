import React, { Component } from 'react';

import BaseUrl from "../AppConfig";

class PredictionRepository {

    //-----------------------------
    async Get_MatchPrediction () {
      let resCNews=[];
      try {
          resCNews = await fetch(BaseUrl+'posts?categories=4211', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          resCNews = await resCNews.json();
          let l = 0, ImgUrl='', recnoCNews = resCNews.length;
          for(l=0; l<resCNews.length; l++){
            try {
              let resUrl = await fetch(resCNews[l]._links['wp:featuredmedia'][0].href, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              resUrl = await resUrl.json();
              resCNews[l]._links['wp:featuredmedia'][0].href = resUrl.media_details.sizes.full.source_url;
            } catch (e) {
              console.error(e);
            }
            if(l>=resCNews.length-1){
              return resCNews;
            }
          }
        } catch (e) {
          console.error(e);
        }
    }
    //-----------------------------
    async Get_Dream11 (api) {
      let resCSchdule=[];
      try {
        resCSchdule = await fetch(BaseUrl+'posts?categories=32', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          resCSchdule = await resCSchdule.json();
          let l = 0, ImgUrl='', recnoCNews = resCSchdule.length;
          for(l=0; l<resCSchdule.length; l++){
            try {
              let resUrl = await fetch(resCSchdule[l]._links['wp:featuredmedia'][0].href, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              resUrl = await resUrl.json();
              resCSchdule[l]._links['wp:featuredmedia'][0].href = resUrl.media_details.sizes.full.source_url;
            } catch (e) {
              console.error(e);
            }
            if(l>=resCSchdule.length-1){
              return resCSchdule;
            }
          }
        } catch (e) {
          console.error(e);
        }
    }


}

  const PredRepository = new PredictionRepository();

  export default PredRepository;