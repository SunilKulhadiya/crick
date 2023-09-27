import React, { Component } from 'react';

import BaseUrl from "../AppConfig";

class SeriesMRepository {

  //-----------------------------
    async Get_SeriesFirstM() {
      let resMenuF=[], resMenuF2=[], ss=[], n, m, i;

      try {
        resMenuF = await fetch('https://icccricketschedule.com/wp-json/menu/primary', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        resMenuF = await resMenuF.json();
          let subM=[], subM2=[];
          for(n = 0; n < resMenuF.length; n++){
            if(resMenuF[n].post_title == "Series"){
              subM.push(resMenuF[n].submenu);

              for(m = 0; m < subM[0].length; m++){
                ss.push({"ID": subM[0][m].ID, "Title": subM[0][m].title, 
                        "post_parent": subM[0][m].post_parent, "isExpanded": false, "submenu": []});
                try {
                  resMenuF2 = await fetch(BaseUrl+'categories?parent='+subM[0][m].post_parent, {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  });
                  resMenuF2 = await resMenuF2.json();
                    for(i = 0; i < resMenuF2.length; i++){
                      ss[m].submenu.push({"name": resMenuF2[i].name,
                              "href": resMenuF2[i]._links["wp:post_type"][0].href});
                    }                    
                } catch (e) {
                  console.error("Error : ", e.message);
                }
              }

              return ss;
              n=resMenuF.length+1;
            }
          }
      } catch (e) {
        console.error(e);
      }
    }
  //-----------------------------
  async Get_MoreMenu(fetchMenu) {
    let resMenuF=[], resMenuF2=[], ss=[], n, m, i;

    try {
      resMenuF = await fetch('https://icccricketschedule.com/wp-json/menu/primary', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      resMenuF = await resMenuF.json();
        let subM=[], subM2=[];
        for(n = 0; n < resMenuF.length; n++){
          if(resMenuF[n].title == fetchMenu){
            subM.push(resMenuF[n].submenu);

            for(m = 0; m < subM[0].length; m++){
              ss.push({"ID": subM[0][m].ID, "Title": subM[0][m].title, 
                      "post_parent": subM[0][m].post_parent, "isExpanded": false, "submenu": []});
              try {
                resMenuF2 = await fetch(BaseUrl+'categories?parent='+subM[0][m].post_parent, {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                });
                resMenuF2 = await resMenuF2.json();
                  for(i = 0; i < resMenuF2.length; i++){
                    ss[m].submenu.push({"name": resMenuF2[i].name,
                            "href": resMenuF2[i]._links["wp:post_type"][0].href});
                  }                    
              } catch (e) {
                console.error("Error : ", e.message);
              }
            }

            return ss;
            n=resMenuF.length+1;
          }
        }
    } catch (e) {
      console.error(e);
    }

  }
  //---------------------------
}

  const SMR = new SeriesMRepository();

  export default SMR;