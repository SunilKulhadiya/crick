import React, { Component } from 'react';

import BaseUrl from "../AppConfig";

class WorldCupRepository {

    //-----------------------------
    async Get_ICCWCUP () {
      let resCNews=[];
      try {
          resCNews = await fetch(BaseUrl+'posts?categories=5970', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          resCNews = await resCNews.json();
          // console.log("HomeScreen.js, GETData",res[0].date);
          // console.log("HomeScreen.js, GETData",res.length);
          let l = 0, ImgUrl='', recnoCNews = resCNews.length;
          for(l=0; l<resCNews.length; l++){
            //console.log("HomeScreen.js, GETData",res[l]._links['wp:featuredmedia'][0].href);
            try {
              let resUrl = await fetch(resCNews[l]._links['wp:featuredmedia'][0].href, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              resUrl = await resUrl.json();
              //console.log("HomeScreen.js, GETData, resUrl, media_details : ", resUrl.media_details.sizes.medium.source_url);
              ImgUrl = resUrl.media_details.sizes.full.source_url;
            } catch (e) {
              console.error(e);
            }
            resCNews[l]._links['wp:featuredmedia'][0].href = ImgUrl;
            //console.log("HomeScreen.js, GETData, ImgUrl : ",res[l]._links['wp:featuredmedia'][0].href);
            if(l>=resCNews.length-1){
              return resCNews;
            }
          }
        } catch (e) {
          console.error(e);
        }
    }
    //-----------------------------
    async Get_T20WCUP () {
      let resCSchdule=[];
      try {
        resCSchdule = await fetch(BaseUrl+'posts?categories=93', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          resCSchdule = await resCSchdule.json();
          // console.log("HomeScreen.js, GETData",res[0].date);
          // console.log("HomeScreen.js, GETData",res.length);
          let l = 0, ImgUrl='';
          for(l=0; l<resCSchdule.length; l++){
            //console.log("HomeScreen.js, GETData",res[l]._links['wp:featuredmedia'][0].href);
            try {
              let resUrl = await fetch(resCSchdule[l]._links['wp:featuredmedia'][0].href, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              resUrl = await resUrl.json();
              //console.log("HomeScreen.js, GETData, resUrl, media_details : ", resUrl.media_details.sizes.medium.source_url);
              ImgUrl = resUrl.media_details.sizes.full.source_url;
            } catch (e) {
              console.error(e);
            }
            resCSchdule[l]._links['wp:featuredmedia'][0].href = ImgUrl;
            //console.log("HomeScreen.js, GETData, ImgUrl : ",res[l]._links['wp:featuredmedia'][0].href);
            if(l>=resCSchdule.length-1){
              return resCSchdule;
            }
          }
        } catch (e) {
          console.error(e);
        }
    }
    //-----------------------------
    async Get_WTestCh () {
      let resCTeam=[];
      try {
        resCTeam = await fetch(BaseUrl+'posts?categories=5182', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          resCTeam = await resCTeam.json();
          let l = 0, ImgUrl='';
          for(l=0; l<resCTeam.length; l++){
            try {
              let resUrl = await fetch(resCTeam[l]._links['wp:featuredmedia'][0].href, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              resUrl = await resUrl.json();
              ImgUrl = resUrl.media_details.sizes.full.source_url;
            } catch (e) {
              console.error(e);
            }
            resCTeam[l]._links['wp:featuredmedia'][0].href = ImgUrl;
            if(l>=resCTeam.length-1){
              return resCTeam;
            }
          }
        } catch (e) {
          console.error(e);
        }
    }

}

  const WCR = new WorldCupRepository();

  export default WCR;