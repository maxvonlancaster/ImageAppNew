import React from 'react';

export default class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        const iStyle = {
            display: "none"
          }
        return (
            <div>
                <iframe name="dummyframe" id="dummyframe" style={iStyle} ></iframe>
                <form method="POST" action="/upload" encType="multipart/form-data" target="dummyframe">
                    <div>
                        <label>Select your image:</label>
                        <input type="file" name="user_img" />
                    </div>
                    <div>
                        <input type="submit" name="btn_upload_user_img" value="Upload" />
                    </div>
                </form>
            </div>);
    }
}