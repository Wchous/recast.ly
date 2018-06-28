class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: window.exampleVideoData,
      selected: window.exampleVideoData[0]
    };
    this.select = this.select.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  select(target) {
    this.setState({selected: target});
  }

  fetch(event) {
    event.preventDefault();
    const query = $(".form-control").val();
    $(".form-control").val('');
    const self = this;
    $.ajax({
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      success: function(result) {
        console.log(result);
        self.setState({videos : result.items, selected : result.items[0]});
      },
      error: function(result) {
        console.log(result);
      },
      data: {
        maxResults: '5',
        part: 'snippet',
        q: query,
        type: 'video',
        videoEmbeddable: true,
        key: window.YOUTUBE_API_KEY
      },
      contentType: 'application/json'
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            {/*search went here*/}
            <Search fetch = {this.fetch}/> 
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
