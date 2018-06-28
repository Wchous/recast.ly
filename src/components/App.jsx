class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: window.exampleVideoData,
      selected: window.exampleVideoData[0]
    };
    this.select = this.select.bind(this);
    this.buildFetch = _.debounce(this.buildFetch, 500);
    this.buildFetch = this.buildFetch.bind(this);

    const results = searchYoutube('funny dog videos');
    results.then( (x)=>{ this.setState({videos: x.items , selected: x.items[0]}); });
    
  }



  select(target) {
    this.setState({selected: target});
  }

  buildFetch(){
    
    const query = $(".form-control").val();
    $(".form-control").val('');
    const results = searchYoutube(query);

    results.then( (x)=>{ this.setState({videos: x.items , selected: x.items[0]}); });
  }

  

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            {/*search went here*/}
            <Search buildFetch = {this.buildFetch}/> 
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {/*//video player here*/}
            <VideoPlayer video = {this.state.selected} />
          </div>
          <div className="col-md-5">
            {/*video list here*/}
            <VideoList videos = {this.state.videos} select ={this.select} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

window.searchYoutube = function(query) {


  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  const params = {maxResults: '5',
    part: 'snippet',
    q: query,
    type: 'video',
    videoEmbeddable: true,
    key: window.YOUTUBE_API_KEY};

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key] ));

  return fetch(url).then((result)=>result.json());



};