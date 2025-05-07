import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import { GLTF, SkeletonUtils } from 'three-stdlib';

type GLTFResult = GLTF & {
    nodes: {
        Plane: THREE.Mesh;
        Plane_1: THREE.Mesh;
        ['Ground-Mate']: THREE.Mesh;
        Plane002: THREE.Mesh;
        Plane002_1: THREE.Mesh;
        Plane003: THREE.Mesh;
        Plane003_1: THREE.Mesh;
        Plane004: THREE.Mesh;
        Plane004_1: THREE.Mesh;
        Plane005: THREE.Mesh;
        Plane005_1: THREE.Mesh;
        Plane006: THREE.Mesh;
        Plane006_1: THREE.Mesh;
        Sun: THREE.DirectionalLight & { target: THREE.Object3D };
    };
    materials: {
        C1: THREE.MeshStandardMaterial;
        ['Page-Color']: THREE.MeshStandardMaterial;
        ['Ground-Mate-Color']: THREE.MeshStandardMaterial;
        ['C1.005']: THREE.MeshStandardMaterial;
        ['C1.006']: THREE.MeshStandardMaterial;
        ['Material.002']: THREE.MeshStandardMaterial;
        ['C1.002']: THREE.MeshStandardMaterial;
        ['Material.003']: THREE.MeshStandardMaterial;
        ['C1.007']: THREE.MeshStandardMaterial;
        ['Material.004']: THREE.MeshStandardMaterial;
        ['C1.008']: THREE.MeshStandardMaterial;
        ['Material.005']: THREE.MeshStandardMaterial;
    };
};

interface BookModelProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
}

const BookModel = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: BookModelProps) => {
    const groupRef = useRef<THREE.Group>(null);

    // Load the model
    const { scene } = useGLTF('models/books.glb') as unknown as GLTF & {
        nodes: { Sun: THREE.DirectionalLight & { target: THREE.Object3D } };
    };

    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;

    return (
        <group
            ref={groupRef}
            position={position as [number, number, number]}
            rotation={rotation as [number, number, number]}
            scale={scale as [number, number, number]}
            dispose={null}
        >
            <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={23.913} position={[10.88, 4.12, -11.36]} rotation={[-2.894, 0.736, 2.974]} />
            <directionalLight
                intensity={7}
                color="#f3bc85"
                position={[0, 6.38, 0]}
                rotation={[-2.352, 0.63, 2.606]}
                target={nodes.Sun?.target}
            >
                {nodes.Sun?.target && (
                    <primitive object={nodes.Sun.target} position={[0, 0, -1]} />
                )}
            </directionalLight>
            <group scale={[1.2, 1, 1.6]}>
                <mesh geometry={nodes.Plane.geometry} material={materials.C1} />
                <mesh geometry={nodes.Plane_1.geometry} material={materials['Page-Color']} />
            </group>
            {/* <mesh geometry={nodes['Ground-Mate'].geometry} material={materials['Ground-Mate-Color']} scale={[4, 1, 4]} /> */}
            <group position={[0, 0.78, 0]} rotation={[0, Math.PI / 10, 0]} scale={[0.92, 0.53, 1.6]}>
                <mesh geometry={nodes.Plane002.geometry} material={materials['C1.005']} />
                <mesh geometry={nodes.Plane002_1.geometry} material={materials['Page-Color']} />
            </group>
            <group position={[0, 1.22, 0]} scale={[1, 0.53, 1.6]}>
                <mesh geometry={nodes.Plane003.geometry} material={materials['C1.006']} />
                <mesh geometry={nodes.Plane003_1.geometry} material={materials['Material.002']} />
            </group>
            <group position={[1.92, 0.94, 0]} rotation={[-1.574, -0.105, 1.536]} scale={[0.76, 0.53, 1]}>
                <mesh geometry={nodes.Plane004.geometry} material={materials['C1.002']} />
                <mesh geometry={nodes.Plane004_1.geometry} material={materials['Material.003']} />
            </group>
            <group position={[0, 1.66, 0]} rotation={[0, -0.244, 0]} scale={[1, 0.7, 1.6]}>
                <mesh geometry={nodes.Plane005.geometry} material={materials['C1.007']} />
                <mesh geometry={nodes.Plane005_1.geometry} material={materials['Material.004']} />
            </group>
            <group position={[0, 2.21, 0]} rotation={[0, -0.733, 0]} scale={[1.2, 0.8, 1.4]}>
                <mesh geometry={nodes.Plane006.geometry} material={materials['C1.008']} />
                <mesh geometry={nodes.Plane006_1.geometry} material={materials['Material.005']} />
            </group>
        </group>
    );
};

useGLTF.preload('models/books.glb');

export default BookModel;
