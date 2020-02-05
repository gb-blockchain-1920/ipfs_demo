import React from "react";
// import img from "./cat_bread_loaf.jpg";
import "./App.css";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient("http://localhost:5001");

function App() {
  const [imgHash, setImgHash] = React.useState();
  const [img, setImg] = React.useState();

  React.useEffect(() => {
    const getIPFS = async () => {
      const ver = await ipfs.version();
      console.log("IPFS Version=", ver);
    };
    getIPFS();
  }, []);

  //load file to IPFS
  const loadIPFS = async () => {
    for await (const result of ipfs.add(img)) {
    // const result = await ipfs.add("./cat_bread_loaf.jpg");
    // console.log(result);
    setImgHash(result.path);
    }
  };

  //get image arraybuffer
  const setImage = (event) => {
    // const temp = event.target.files[0];
    // console.log(temp);
    setImg(event.target.files[0]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={setImage}/>
        <button onClick={loadIPFS}>Load Image to IPFS</button>
        {imgHash && <img src={`http://localhost:8080/ipfs/${imgHash}`} />}
      </header>
    </div>
  );
}


export default App;
