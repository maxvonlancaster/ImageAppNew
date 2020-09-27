import React from 'react';
import { Media, Tooltip } from "reactstrap";
import "./tooltip.css";

export default class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: this.props.imageUrl,
            imageName: this.props.imageName.split(".")[0],
            imageExtension: this.props.imageName.split(".")[1],
            imageNameFull: this.props.imageName
        }
        this.delete = this.delete.bind(this);
    }

    delete() {
        const response = fetch("/delete/?imageName=" + this.state.imageName + "&imageExtension=" + this.state.imageExtension)
            .then(res => res.json())
            .then(res => {
            });
        window.location.reload();
    }

    render() {
        const imgStyle = {
            maxHeight: 128,
            maxWidth: 128
        }


        let tooltipOpen = false;
        let toggle = () => { }

        return (
            <div className="col">
                <table>
                    <tr><td>
                        <Media object style={imgStyle} src={this.state.imageUrl} id={this.state.imageName} key={this.state.imageName} />
                        <span className="tooltiptext">{this.state.imageName}, click button to delete it</span>
                    </td></tr>
                    <tr><td>
                        <a href="#" className="btn btn-warning a-btn-slide-text" onClick={() => this.delete()}>
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            <span><strong>Delete</strong></span>
                        </a>
                    </td></tr>
                </table>
            </div>);
    }
}