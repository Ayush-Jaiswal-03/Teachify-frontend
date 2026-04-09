import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

const MyIframe = () => (
  <iframe
    src="https://secure-share-s3.s3.ap-south-1.amazonaws.com/61147f40-597e-463a-879e-c97422ce9636__AYUSH_Resume_Backend.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260407T003530Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAWH4DDG5JMN2R3GHY%2F20260407%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=6421eb92e3b80d6fbf830b515b4067021b5052a9825a5dc4b9341e95b002ad59"
    title="Example Website"
    // width="100px"
    // height="150px"
    style={{ border: "none" }}
  />
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello Ji</h1>
      <MyIframe />
    </>
  );
}

export default App;
