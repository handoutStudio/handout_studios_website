'use client';

import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useGLTF, Text, Float, MeshTransmissionMaterial } from '@react-three/drei';

useGLTF.preload('/medias/shards.glb');

export default function Model() {
    const { viewport } = useThree()
    const { nodes } = useGLTF('/medias/shards.glb');
    
    return (
            <group scale={viewport.width / 1.5} >
                { nodes.Scene.children.map( (mesh, i) => <Mesh data={mesh} key={i}/> ) }
                <Font />
            </group>
    )
}

function Font() {
    const src = '/fonts/PPNeueMontreal-Regular.ttf'
    const textOption = { color: "white", anchorX: "center", anchorY: "middle" }
    return (
        <group>
            <Text font={src} position={[-.10, 0.10, -.1]} fontSize={0.5} {...textOption}> {`404`} </Text>
            {/* <Text font={src} position={[0, -.12, -.1]} fontSize={0.02} {...textOption}> {`The link is broken`} </Text> */}
            <Text font={src} position={[0, -.15, -.1]} fontSize={0.03} {...textOption} onClick={() => window.location.href = '/'}> {`Go Back Home`} </Text>
        </group>
    )
}

function Mesh({data}) {
    return (
        <Float>
            <mesh {...data}>
                <MeshTransmissionMaterial roughness={0} transmission={0.99} thickness={0.3} ior={1.8} chromaticAberration={2} resolution={150} color={ new THREE.Color('#7a0007') } />
            </mesh>
        </Float>
    )
}