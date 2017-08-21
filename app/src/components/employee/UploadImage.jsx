import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'

export default class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFilepPreviewUrl: ''
    };

    this.onImageDrop = this.onImageDrop.bind(this);
  }
  onImageDrop(files) {
    // const reader = new FileReader();
    // reader.onload = () => {
    //     const fileAsBinaryString = reader.result;
    //     console.log('fileAsBinaryString',fileAsBinaryString);
    //     this.setState({
    //       uploadedFile: files[0],
    //       uploadedFilepPreviewUrl: [fileAsBinaryString]
    //     });    
    //     // do whatever you want with the file content
    // };
    // reader.onabort = () => console.log('file reading was aborted');
    // reader.onerror = () => console.log('file reading has failed');

    // reader.readAsBinaryString(files[0]);
    this.setState({
      uploadedFile: files[0],
      uploadedFilepPreviewUrl: files[0].preview
    });
  }

  render() {
    return (
      <div>
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop}>
          {this.state.uploadedFilepPreviewUrl !== '' ? null :
            <p>Drop an photo or click to select a photo to upload.</p>
          }

          <div>
            {this.state.uploadedFilepPreviewUrl === '' ? null :
              <div>
                <p>{this.state.uploadedFile.name}</p>
                <img src={this.state.uploadedFilepPreviewUrl} />
              </div>}
          </div>
        </Dropzone>

        {/* <div>
          {this.state.uploadedFilepPreviewUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFilepPreviewUrl} />
            </div>}
        </div> */}
      </div>
    );
  }
}
