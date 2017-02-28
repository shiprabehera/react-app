import React, {Component} from 'react'
import Song from './song'
import axios from 'axios'

class App extends Component {

  constructor() {
    super()
    this.state = {
      keyword: 'tame impala',
      songs: []
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.searchByKeyword = this.searchByKeyword.bind(this)
    this.getTopTracks = this.getTopTracks.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.getArtistInfo(this.state.keyword)
    } ,3000)
  }


  searchByKeyword(e) {
    e.preventDefault()
    this.getArtistInfo(this.state.keyword)
  }

  getArtistInfo(name) {
    const url = `https://api.spotify.com/v1/search?q=${name}&type=artist&market=US`
    axios.get(url)
      .then(response => {
        this.getTopTracks(response.data.artists.items[0].id)
      })
  }

  getTopTracks(artistId) {
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`
    axios.get(url)
      .then(response => {
        this.setState({
          songs: response.data.tracks.slice(0,5).map(track => {
            return {name: track.name}
          })
        })
      })
  }

  onInputChange(e) {
    this.setState({keyword: e.target.value})
  }

  render() {
    const songList = this.state.songs.map((song, index) => {
      return <Song songName={song.name}  key={index} />
    })

    return (
      <div class="search">
        <form id='searchForm' onSubmit={this.searchByKeyword}>
          <input type='text' name='keyword' id='keyword' onChange={this.onInputChange} value={this.state.keyword}/>
          &ensp;
          <button type='submit'>Search</button>
        </form>
        {songList}
      </div>
    )
    }
}

export default App
