import React from 'react';
import { Card, CardImg, Media } from "reactstrap";
import Image from "./Image.js";

export default class ImageCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
        this.renderImages = this.renderImages.bind(this);
    }

    componentWillMount() {
        const response = fetch("/get-images")
            .then(res => res.json())
            .then(res => {
                this.setState({ images: res });

            });
    }

    clicked(location){
        console.log(location);
    }

    renderImages() {
        return this.state.images.map(imageName => {
            let location = "http://localhost:3000/" + imageName;
            return (
                <Image imageUrl={location} imageName={imageName}/>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderImages()}
                </div>
            </div>);
    }
}