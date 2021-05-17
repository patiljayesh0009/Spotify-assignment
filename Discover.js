import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import axios from 'axios';
export default class Discover extends Component {


 

  constructor() {
    super();

    this.state = {

      newReleases: [],
      playlists: [],
      categories: [],
      
    };
  }

 
  componentDidMount() {

    axios('https://accounts.spotify.com/api/token',{
    
      
    
      headers: {
        'Authorization':'Basic ' + btoa('Client_ID' +":"+"Client_Secret"),
        'Content-Type': 'application/x-www-form-urlencoded'
      },method: 'post',
      data: "grant_type=client_credentials",
      
    }).then(tokenRes=> {
     console.log(tokenRes.data.items);
      axios('https://api.spotify.com/v1/browse/new-releases?locale=sv_US',{
        'method':'GET',
        'headers' :{
          'Content-Type': 'application/json',
                'Authorization': 'Bearer' + tokenRes.data.access_token
        }
      }).then(newreleases=>{
        this.setState({newReleases:newreleases.data.albums})
      }).catch(error=>console.log(error))
      axios('	https://api.spotify.com/v1/browse/featured-playlists?locale=sv_US',{
        'method':'GET',
        'headers' :{
          'Content-Type': 'application/json',
                
                'Authorization': 'Bearer ' + tokenRes.data.access_token
        }
      }).then(playList=>{
      
        this.setState({playlists:playList.data.playlists});
      }).catch(error=>console.log(error))
      
      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US',{
        'method':'GET',
        'headers' :{
          'Content-Type': 'application/json',
              
                'Authorization': 'Bearer ' + tokenRes.data.access_token
        }
      }).then(category=>{
        this.setState({categories:category.data.categories.items});
      }).catch(error=>console.log(error))




        
    }).catch(error=>console.log(error))  }
  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
