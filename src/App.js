import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone'
const fileTypes = ['jpg', 'jpeg', 'png', 'what', 'ever', 'you', 'want'];
class App extends Component {

  onDrop(files) {
    var reader = new FileReader();
    var url = reader.readAsDataURL(files[0]);
    const scope = this;
    reader.onloadend = function(e) {
      console.log(reader.result);
      var extension = files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
      isSuccess = fileTypes.indexOf(extension) > -1;
      /*image validation code*/
      var image = new Image();
      image.src = reader.result;
      image.onload = function() {   
        if(image.width<200 || image.height<200)
        {                    
          scope.setState({
              MessageContent : 'Image size must be greater than 200x200 in pixel or less then 400x400 inpixel',
              MessageTitle : 'Alert'
          });
          /*scope.toggleAlert();*/
        }
        else if(image.width>400 || image.height>400)
        {
          scope.setState({
            MessageContent : 'Image size must be greater than 200x200 in pixel or less then 400x400 in pixel',
            MessageTitle : 'Alert'
          });
          /*scope.toggleAlert();*/
        }
        else if(isSuccess && files[0].size > 200000)
        {
          scope.setState({
              MessageContent : 'Image size must not exceed 200 KB',
              MessageTitle : 'Alert'
          });
          /*scope.toggleAlert();*/
        }
        else
        {
          /*scope.setState({
            avatarURL : files[0].preview,
            avatarData : reader.result,
            avatarSize : files[0].size
          });*/
        }
      };           
    }
   //console.log(files);
  }

  /*backend image upload node code*/
/*  var imageData = req.body.newProfile.avatarData;

                    if(imageData != undefined || imageData != '')
                    {
                        var data = imageData.replace(/^data:image\/\w+;base64,/, "");
                        var buf = new Buffer(data, 'base64');

                        var sv_url = './public/avatars/' + user.id;
                        fs.writeFile(sv_url ,buf , function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            console.log("The file was saved!");
                        });                     
                        user.imageUrl = config.baseURL + user.id; // image url
                    } else {
                        user.imageUrl = "";
                    }*/
  /*end of backend code*/
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone> 
      </div>
    );
  }
}

export default App;
