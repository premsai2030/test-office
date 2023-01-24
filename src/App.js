import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import MenuIcon from "@mui/icons-material/Menu";

import { Model } from "./Office";
import {
  Box,
  List,
  SwipeableDrawer,
  ListItem,
  Divider,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const officeItems = [
  {
    position: { x: -150, y: 10, z: 200 },
    name: "Front Desk",
  },
  {
    position: { x: -200, y: 40, z: -100 },
    name: "Meeting Rooms",
  },
  {
    position: { x: -160, y: 100, z: 200 },
    name: "Top View",
  },
];

function Animate({ controls, lerping, to, target }) {
  useFrame(({ camera }, delta) => {
    if (lerping) {
      console.log("came her", camera);
      camera.position.lerp(to, delta * 2);
      // controls.current.target.lerp(to, delta * 2);
    }
  });
}

function App() {
  const ref = useRef();
  const [lerping, setLerping] = useState(false);
  const [to, setTo] = useState();
  const [target] = useState();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box role="presentation" width={500}>
      <Divider />
      <List>
        {officeItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => {
              console.log("done");
              setTo(item.position);
              setLerping(true);
              setState(false);
            }}
          >
            <ListItemButton>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          padding: "10px 5px",
        }}
      >
        <Box
          sx={{
            width: "5vw",
            cursor: "pointer",
          }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </Box>
        <Box
          sx={{
            width: "95vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          3D Design
        </Box>
      </Box>
      <SwipeableDrawer
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(false)}
      >
        {list()}
      </SwipeableDrawer>
      <Canvas
        camera={{ position: [-200, 10, 200], fov: 28 }}
        shadows
        onPointerDown={() => setLerping(false)}
        onWheel={() => setLerping(false)}
      >
        <primitive object={new THREE.AxesHelper(300)} />
        <Animate controls={ref} lerping={lerping} to={to} target={target} />
        <ambientLight intensity={0.5} />

        <OrbitControls ref={ref} />

        <Environment background preset="forest" blur={1} />
        <Model />
      </Canvas>
    </div>
  );
}

export default App;
