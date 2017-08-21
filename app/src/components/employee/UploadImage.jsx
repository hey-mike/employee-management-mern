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
  }
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
      uploadedFilepPreviewUrl: files.preview
    });

    console.log('onImageDrop',files);
  }

  render() {
    return (
      <div>
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}>
          <p>Drop an photo or click to select a photo to upload.</p>
        </Dropzone>

        <div>
          {this.state.uploadedFilepPreviewUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFilepPreviewUrl} />
            </div>}
        </div>
      </div>
    );
  }
}
