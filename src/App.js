import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
// import { Model } from "./S2wt_kamdo_industrial_divinities";
// import { Model } from "./test_model";
import { Model } from "./Office";
// import useTextToSpeech from "react-hook-text-to-speech";

function Animate({ controls, lerping, to, target }) {
  useFrame(({ camera }, delta) => {
    if (lerping) {
      camera.position.lerp(to, delta * 2);
      controls.current.target.lerp(target, delta * 2);
    }
  });
}

// function Buttons({ gotoAnnotation }) {
//   const obj = {
//     title: "Bathroom Sink",
//     description: "<p>Bathroom Sink is good for washing your hands</p>",
//     camPos: {
//       x: 0,
//       y: 30,
//       z: 0,
//     },
//     lookAt: {
//       x: 0,
//       y: 0,
//       z: 0,
//     },
//   };
//   return (
//     <Html position={[0, 3, 0]}>
//       <text
//         fontSize={17}
//         fontFamily="monospace"
//         style={{ cursor: "pointer" }}
//         onClick={() => {
//           gotoAnnotation(obj);
//         }}
//       >
//         top
//       </text>
//     </Html>
//   );
// }

function App() {
  // const convert = useTextToSpeech();
  const ref = useRef();
  const [lerping, setLerping] = useState(false);
  const [to] = useState();
  const [target] = useState();
  // const [selected, setSelected] = useState(-1);
  // const [startText, setStartText] = useState(false);
  // const [langauges, setLanguages] = useState(null);
  // const [speak, setSpeak] = useState(false);
  // const [speech, setSpeech] = useState("");

  // useEffect(() => {
  //   // if (langauges === null || langauges?.length === 0) {
  //   //   if (langauges?.length === 0) {
  //   //     const synthesis = window.speechSynthesis;
  //   //     const voices = synthesis.getVoices();
  //   //     const whatToSpeak = new window.SpeechSynthesisUtterance("book");
  //   //     synthesis.voice = voices[1];
  //   //     console.log(whatToSpeak);
  //   //     whatToSpeak.pitch = 1;
  //   //     whatToSpeak.rate = 1;
  //   //     synthesis.cancel();
  //   //     synthesis.speak(whatToSpeak);
  //   //     console.log(synthesis);
  //   //     setLanguages(voices);
  //   //   } else {
  //   //     setLanguages([]);
  //   //   }
  //   // }

  //   if (startText) {
  //     const SpeechRecognition =
  //       window.SpeechRecognition || window.webkitSpeechRecognition;
  //     const speech = new SpeechRecognition();
  //     speech.start();
  //     speech.onresult = (e) => {
  //       const results = e.results[0][0].transcript;
  //       setSpeech(results);
  //       // console.log(results);
  //     };

  //     speech.onerror = function (e) {
  //       // console.log("onerror", e);
  //       speech.stop();
  //       setStartText(false);
  //     };

  //     speech.onend = function () {
  //       speech.stop();
  //       setStartText(false);
  //     };
  //   }
  // }, [startText]);

  // useEffect(() => {
  //   if (speak) {
  //     convert(speech);
  //     setSpeak(false);
  //   }
  // }, [convert, speak, speech]);

  // function gotoAnnotation(values) {
  //   setTo(values.camPos);
  //   setTarget(values.lookAt);
  //   // setSelected(values);
  //   setLerping(true);
  // }
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [20, 2, 0], fov: 28 }}
        // gl={{ logarithmicDepthBuffer: true }}
        shadows
        onPointerDown={() => setLerping(false)}
        onWheel={() => setLerping(false)}
      >
        <Animate controls={ref} lerping={lerping} to={to} target={target} />
        <ambientLight intensity={0.5} />
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          ref={ref}

          // enableZoom={false}
          // makeDefault
          // minPolarAngle={Math.PI / 2}
          // maxPolarAngle={Math.PI / 2}
        />

        {/* <fog attach="fog" args={["black", 15, 21.5]} /> */}
        {/* <Grid
          renderOrder={-1}
          position={[0, -1.85, 0]}
          infiniteGrid
          cellSize={0.6}
          cellThickness={0.6}
          sectionSize={3.3}
          sectionThickness={1.5}
          sectionColor={[0.5, 0.5, 10]}
          fadeDistance={30}
        /> */}
        {/* 
        <Stage
          intensity={0.5}
          environment="city"
          shadows={{ type: "accumulative", bias: -0.001 }}
          adjustCamera={false}
        >
      </Stage> */}
        <Environment background preset="forest" blur={1} />
        <Model />
        {/* <Html position={[0, 2, 0]}>
          <button
            onClick={() => {
              setStartText(true);
            }}
            // style={{ marginTop: "100px" }}
          >
            speech
          </button>
          <button
            onClick={() => {
              setSpeak(true);
            }}
          >
            speak
          </button>
        </Html> */}

        {/* <Buttons gotoAnnotation={gotoAnnotation} /> */}
      </Canvas>
    </div>
  );
}

export default App;

// function Box(props) {
//   // This reference gives us direct access to the THREE.Mesh object
//   const ref = useRef();
//   // Hold state for hovered and clicked events
//   const [hovered, hover] = useState(false);
//   const [clicked, click] = useState(false);
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (ref.current.rotation.x += delta));
//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={clicked ? 1.5 : 1}
//       onClick={(event) => click(!clicked)}
//       onPointerOver={(event) => hover(true)}
//       onPointerOut={(event) => hover(false)}
//       castShadow={true}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }
