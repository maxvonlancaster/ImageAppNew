import React from 'react';

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const iStyle = {
            display: "none"
        }
        const cardStyle = {
            width: "400px"
        }
        return (
            <div className="col card mt-4">
                <iframe name="dummyframe" id="dummyframe" style={iStyle} ></iframe>
                <form method="POST" action="/upload" encType="multipart/form-data" target="dummyframe">
                    <div className="form-group">
                        <div>
                            <label>Select your image:</label>
                        </div>
                        <div>
                            <input type="file" name="user_img" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" name="btn_upload_user_img" value="Upload" onClick={() => window.location.reload()} />
                    </div>
                </form>
            </div>);
    }
}