"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Group } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";

import countries from "../../../config/data/globe.json";

import { Position } from "@/types/main/position";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      threeGlobe: any;
    }
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Group>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.2,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 8,
    maxRings: 10,
    ...globeConfig,
  };

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };

    globeMaterial.color = new Color(
      globeConfig.globeColor || defaultProps.globeColor,
    );
    globeMaterial.emissive = new Color(
      globeConfig.emissive || defaultProps.emissive,
    );
    globeMaterial.emissiveIntensity =
      globeConfig.emissiveIntensity || defaultProps.emissiveIntensity;
    globeMaterial.shininess = globeConfig.shininess || defaultProps.shininess;
  }, [isInitialized, globeConfig]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const arcs = data;
    const points = [];

    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];

      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
          ),
        ) === i,
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat)
      .arcStartLng((d) => (d as { startLng: number }).startLng)
      .arcEndLat((d) => (d as { endLat: number }).endLat)
      .arcEndLng((d) => (d as { endLng: number }).endLng)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e) => (e as { arcAlt: number }).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
  }, [isInitialized, data, defaultProps]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 2) / 5),
      );

      const ringsData = data
        .filter((d, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  const { resolvedTheme } = useTheme();

  scene.fog = new Fog(0xffffff, 400, 2000);

  return (
    <Canvas
      key={resolvedTheme}
      camera={new PerspectiveCamera(50, aspect, 180, 1800)}
      scene={scene}
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight || "#ffffff"} />
      <directionalLight
        color={globeConfig.directionalLeftLight || "#ffffff"}
        // position={[-400, 100, 400]}
        // intensity={0.8}
      />
      <directionalLight
        color={globeConfig.directionalTopLight || "#ffffff"}
        // position={[-200, 500, 200]}
        // intensity={0.8}
      />
      <pointLight
        color={globeConfig.pointLight || "#ffffff"}
        // position={[-200, 500, 200]}
        // intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        autoRotate={globeConfig.autoRotate ?? true}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 1}
        enablePan={false}
        enableZoom={false}
        maxDistance={cameraZ}
        maxPolarAngle={Math.PI - Math.PI / 3}
        minDistance={cameraZ}
        minPolarAngle={Math.PI / 3.5}
      />
    </Canvas>
  );
}

function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];

  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;

    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
