'use client';

import Model from './Model'
import { Canvas } from '@react-three/fiber'

export default function Scene() {

    return (
        <Canvas style={{background: "#967969", width: "100vw", height: "100vh"}} camera={{ position: [0, 0, 2], }}>
            <Model />
        </Canvas>
    )
}