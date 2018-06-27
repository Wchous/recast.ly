class App extends React.Component {
  constructor(){
    // super(props)

    this.state = {
      videos : window.exampleVideoData,
      selected : window.exampleVideoData[0]
    };
  }

  render(){
    return(
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            {/*search went here*/}
            <Search /> 
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {/*//video player here*/}
            <VideoPlayer video = {this.state.selected} />
          </div>
          <div className="col-md-5">
            {/*video list here*/}
            <VideoList videos = {this.state.videos} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
