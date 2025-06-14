'use client';

import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Line, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeColors } from '@/hooks/useThemeColors';

interface PlanetProps {
    radius: number;
    distance: number;
    speed: number;
    initialAngle: number;
    lineColor: string;
    textureUrl: string;
}

const Planet: React.FC<PlanetProps> = ({
    radius,
    distance,
    speed,
    initialAngle,
    lineColor,
    textureUrl
}) => {
    const planetRef = useRef<THREE.Mesh>(null);

    const linePoints = useMemo(() => {
        const points = [];
        const segments = 128;
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.sin(angle) * distance, Math.cos(angle) * distance, 0));
        }
        return points;
    }, [distance]);

    const texture = useLoader(THREE.TextureLoader, textureUrl);

    useFrame(({ clock }) => {
        if (planetRef.current) {
            const angle = clock.getElapsedTime() * speed + initialAngle;
            planetRef.current.position.y = Math.cos(angle) * distance;
            planetRef.current.position.x = Math.sin(angle) * distance;
            planetRef.current.rotation.y += 0.01;
        }
    });

    return (
        <>
            <ambientLight intensity={0.8} />
            <Sphere args={[radius, 32, 32]} ref={planetRef}>
                <meshStandardMaterial
                    attach="material"
                    map={textureUrl ? texture : undefined}
                />
            </Sphere>
            <Line points={linePoints} color={lineColor} lineWidth={0.3} />
        </>
    );
};



interface CameraControllerProps {
    cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
}

const CameraController: React.FC<CameraControllerProps> = ({ cameraRef }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((event: MouseEvent) => {
        const { clientX, clientY } = event;
        const x = (clientX / window.innerWidth) * 2 - 1;
        const y = -(clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    useFrame(() => {
        if (cameraRef.current) {
            const targetX = mousePosition.y * 0.05;
            const targetY = mousePosition.x * 0.05;

            // Apply rotation relative to the camera's current orientation
            const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(targetX, targetY, 0, 'YXZ'));
            cameraRef.current.quaternion.slerp(quaternion, 0.05); // Smooth spherical linear interpolation
        }
    });

    return null;
};

const SolarSystemCanvas: React.FC = () => {
    const { colors: theme } = useThemeColors();
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1080,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const initialCameraRotation = useMemo(() => new THREE.Euler(-0.5, 0.7, 0.3, 'YXZ'), []);
    const sunTexture = useLoader(THREE.TextureLoader, '/texture/sun.jpg');

    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{
                    position: [0, 0, 30],
                    fov: 75,
                }}
                className="absolute inset-0 z-0"
                style={{
                    backgroundColor: 'transparent',
                    width: windowSize.width,
                    height: windowSize.height,
                }}
            >
                <group position={[15, -2, 0]}>
                    <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 80]} fov={75} rotation={initialCameraRotation} />
                    <CameraController cameraRef={cameraRef} />

                    <ambientLight intensity={1} />
                    <pointLight position={[0, 0, 0]} intensity={1.5} />

                    {/* Sun */}
                    <Sphere args={[5, 64, 64]}>
                        <meshStandardMaterial
                            emissiveIntensity={1.5}
                            map={sunTexture}
                        />
                    </Sphere>

                    {/* Planets */}
                    <Planet
                        radius={0.6}
                        distance={7}
                        speed={0.15}
                        initialAngle={0}
                        lineColor={theme.solarSystemSubtext}
                        textureUrl="/texture/mercury.jpg"
                    />
                    <Planet
                        radius={0.8}
                        distance={10}
                        speed={0.12}
                        initialAngle={Math.PI / 4}
                        lineColor={theme.solarSystemSubtext}
                        textureUrl="/texture/venus.jpg"
                    />
                    <Planet
                        radius={1.0}
                        distance={14}
                        speed={0.1}
                        initialAngle={Math.PI / 2}
                        lineColor={theme.solarSystemSubtext}
                        textureUrl="/texture/earth.jpg"
                    />
                    <Planet
                        radius={0.7}
                        distance={18}
                        speed={0.08}
                        initialAngle={3 * Math.PI / 4}
                        lineColor={theme.solarSystemSubtext}
                        textureUrl="/texture/mars.jpg"
                    />
                    <Planet
                        radius={2.4}
                        distance={26}
                        speed={0.06}
                        initialAngle={Math.PI}
                        lineColor={theme.solarSystemSubtext}
                        textureUrl="/texture/jupiter.jpg"
                    />
                    <Planet
                        radius={2}
                        distance={32}
                        speed={0.05}
                        initialAngle={5 * Math.PI / 4}
                        lineColor={theme.solarSystemSubtext}
                        textureUrl="/texture/saturn.jpg"
                    />
                    <Planet
                        radius={1.6}
                        distance={38}
                        speed={0.04}
                        initialAngle={3 * Math.PI / 2}
                        lineColor={theme.solarSystemSubtext}
                        textureUrl="/texture/uranus.jpg"
                    />
                    <Planet
                        radius={1.5}
                        distance={44}
                        speed={0.03}
                        initialAngle={7 * Math.PI / 4}
                        lineColor={theme.solarSystemSubtext}
                        textureUrl="/texture/neptune.jpg"
                    />
                </group>
            </Canvas>
        </div>
    );
};

export default SolarSystemCanvas;
