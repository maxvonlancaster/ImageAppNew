var React = require("react");
var ReactDOM = require("react-dom");
import ImageCollection from "./components/ImageCollection.js";
import ImageUpload from "./components/ImageUpload.js";
import 'bootstrap/dist/css/bootstrap.css';


export class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      testCollection: [],
      a: false
    };
  }


  getTestCollection(collectionName) {
    const response = fetch("/test/:" + collectionName)
      .then(res => res.json())
      .then(res => {
        this.setState({ testCollection: res });
      });
  }

  render() {
    this.state.a = true;
    let imgs = this.state.images;
    return (
      <div>
        <br/>
        <ImageCollection images={imgs}/>
        <ImageUpload />
      </div>
    );
  }

}

ReactDOM.render(<Hello />, document.getElementById("root"));

