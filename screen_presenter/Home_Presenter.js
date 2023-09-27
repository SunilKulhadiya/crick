import React, { Component } from 'react';

import BaseUrl from "../AppConfig";

class HomePage {

    //-----------------------------    
    async Get_FeaturedArticles () {
        let res=[];
        try {
            res = await fetch(BaseUrl+'posts?filter[posts_per_page]=1', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            });
            res = await res.json();
            // console.log("HomeScreen.js, GETData",res[0].date);
            // console.log("HomeScreen.js, GETData",res.length);
            let l = 0, ImgUrl='';
            for(l=0; l<res.length; l++){
              //console.log("HomeScreen.js, GETData",res[l]._links['wp:featuredmedia'][0].href);
              try {
                let resUrl = await fetch(res[l]._links['wp:featuredmedia'][0].href, {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                });
                resUrl = await resUrl.json();
                //console.log("HomeScreen.js, GETData, resUrl, media_details : ", resUrl.media_details.sizes.medium.source_url);
                ImgUrl = resUrl.media_details.sizes.medium.source_url;
              } catch (e) {
                console.error(e);
              }
              res[l]._links['wp:featuredmedia'][0].href = ImgUrl;
              //console.log("HomeScreen.js, GETData, ImgUrl : ",res[l]._links['wp:featuredmedia'][0].href);
              if(l>=res.length-1){
                console.log("Home_Presenter.js, GETData",res[0].date);
                //Set_DATAFeaturedArt(res);
                return res;
              }
            }
          } catch (e) {
            console.error(e);
          }
    };
    //-----------------------------
    async Get_CricketCovrage () {
        let res=[];
        try {
            res = await fetch(BaseUrl+'posts?categories=2', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            });
            res = await res.json();
            // console.log("HomeScreen.js, GETData",res[0].date);
            // console.log("HomeScreen.js, GETData",res.length);
            let l = 0, ImgUrl='';
            for(l=0; l<res.length; l++){
              //console.log("HomeScreen.js, GETData",res[l]._links['wp:featuredmedia'][0].href);
              try {
                let resUrl = await fetch(res[l]._links['wp:featuredmedia'][0].href, {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                });
                resUrl = await resUrl.json();
                //console.log("HomeScreen.js, GETData, resUrl, media_details : ", resUrl.media_details.sizes.medium.source_url);
                ImgUrl = resUrl.media_details.sizes.medium.source_url;
              } catch (e) {
                console.error(e);
              }
              res[l]._links['wp:featuredmedia'][0].href = ImgUrl;
              //console.log("HomeScreen.js, GETData, ImgUrl : ",res[l]._links['wp:featuredmedia'][0].href);
              if(l>=res.length-1){
                return res;
              }
            }
          } catch (e) {
            console.error(e);
          }
    }
    //-----------------------------
    async Get_Top5Top10 () {
      let resTop5=[];
      try {
          resTop5 = await fetch(BaseUrl+'posts?categories=1405', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          resTop5 = await resTop5.json();
          let l = 0, ImgUrl='', recno = resTop5.length;
          for(l=0; l<resTop5.length; l++){
            try {
              let resUrl = await fetch(resTop5[l]._links['wp:featuredmedia'][0].href, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              resUrl = await resUrl.json();
              ImgUrl = resUrl.media_details.sizes.medium.source_url;
            } catch (e) {
              console.error(e);
            }
            resTop5[l]._links['wp:featuredmedia'][0].href = ImgUrl;
            if(l>=resTop5.length-1){
              return resTop5;
            }
          }
        } catch (e) {
          console.error(e);
        }
    }
    //-----------------------------
    async Get_CricketNews () {
      let resCNews=[];
      try {
          resCNews = await fetch(BaseUrl+'posts?categories=3', {
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
            try {
              let resUrl = await fetch(resCNews[l]._links['wp:featuredmedia'][0].href, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              resUrl = await resUrl.json();
              ImgUrl = resUrl.media_details.sizes.medium.source_url;
            } catch (e) {
              console.error(e);
            }
            resCNews[l]._links['wp:featuredmedia'][0].href = ImgUrl;
            if(l>=resCNews.length-1){
              return resCNews;
            }
          }
        } catch (e) {
          console.error(e);
        }
    }
    //-----------------------------
    async Get_CricketSchdule (api) {
      let resCSchdule=[];
      try {
        resCSchdule = await fetch(BaseUrl+'posts?categories=1', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          resCSchdule = await resCSchdule.json();
          // console.log("HomeScreen.js, GETData",res[0].date);
          // console.log("HomeScreen.js, GETData",res.length);
          let l = 0, ImgUrl='', recnoCNews = resCSchdule.length;
              console.log("Home_Presenter.js, count : ", resCSchdule.length);
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
              ImgUrl = resUrl.media_details.sizes.medium.source_url;
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
    async Get_CricketTeam (api) {
      console.log("Home_Presenter.js, Get_CricketSchdule, api : ",api);
      let resCTeam=[];
      try {
        resCTeam = await fetch(BaseUrl+'posts?categories=3', {
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
              ImgUrl = resUrl.media_details.sizes.medium.source_url;
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

  const HP = new HomePage();

  export default HP;