import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from './store';
import { AlcoholItemDef, AlcoholShape, getRandomAlcoholItem } from './foodData';
import * as THREE from 'three';

const LANE_WIDTH = 2.5;
const SPAWN_Z = -150;

interface ObstacleData {
  id: number;
  lane: number;
  z: number;
  type: 'barrier' | 'overhead' | 'train';
  junk: AlcoholItemDef;
}

// Small 3D model of the drink so each obstacle reads as alcohol, not a plain block
function DrinkModel({ shape, color, scale = 1 }: { shape: AlcoholShape; color: string; scale?: number }) {
  const body = <meshStandardMaterial color={color} roughness={0.25} metalness={0.1} transparent opacity={0.9} />;
  const label = <meshStandardMaterial color="#FFF8E1" roughness={0.6} />;
  if (shape === 'bottle') {
    return (
      <group scale={scale}>
        <mesh castShadow position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
          {body}
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.205, 0.205, 0.22, 16]} />
          {label}
        </mesh>
        <mesh position={[0, 0.68, 0]}>
          <cylinderGeometry args={[0.07, 0.2, 0.18, 16]} />
          {body}
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.24, 12]} />
          {body}
        </mesh>
      </group>
    );
  }
  if (shape === 'can') {
    return (
      <group scale={scale}>
        <mesh castShadow position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.5, 16]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.51, 0]}>
          <cylinderGeometry args={[0.15, 0.18, 0.03, 16]} />
          <meshStandardMaterial color="#B0BEC5" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    );
  }
  if (shape === 'glass') {
    return (
      <group scale={scale}>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.04, 16]} />
          <meshStandardMaterial color="#ECEFF1" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.32, 8]} />
          <meshStandardMaterial color="#ECEFF1" transparent opacity={0.7} />
        </mesh>
        <mesh castShadow position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.24, 0.06, 0.3, 16]} />
          {body}
        </mesh>
      </group>
    );
  }
  // cup
  return (
    <group scale={scale}>
      <mesh castShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.24, 0.17, 0.5, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.49, 0]}>
        <cylinderGeometry args={[0.245, 0.245, 0.03, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
    </group>
  );
}

export function Obstacles() {
  const [obstacles, setObstacles] = useState<ObstacleData[]>([]);
  const speed = useGameStore((state) => state.speed);
  const status = useGameStore((state) => state.status);
  const hitJunkFood = useGameStore((state) => state.hitJunkFood);
  const endGame = useGameStore((state) => state.endGame);
  const playerLane = useGameStore((state) => state.playerLane);
  const playerY = useGameStore((state) => state.playerY);
  const playerHeight = useGameStore((state) => state.playerHeight);

  const obstacleId = useRef(0);

  useFrame((_, delta) => {
    if (status !== 'playing') {
      if (obstacles.length > 0) {
        setObstacles([]);
      }
      return;
    }

    setObstacles((prev) => {
      let newObstacles = prev.map((obs) => ({
        ...obs,
        z: obs.z + speed * delta,
      }));

      // Collision detection
      for (const obs of newObstacles) {
        const obsDepth = obs.type === 'train' ? 6 : 1;
        const obsMinZ = obs.z - obsDepth / 2;
        const obsMaxZ = obs.z + obsDepth / 2;

        if (obsMaxZ > -0.5 && obsMinZ < 0.5 && obs.lane === playerLane) {
          let hit = false;
          const pMinY = playerY - playerHeight / 2;
          const pMaxY = playerY + playerHeight / 2;

          if (obs.type === 'barrier') {
            if (pMinY < 1) hit = true;
          } else if (obs.type === 'overhead') {
            if (pMaxY > 0.5) hit = true;
          } else if (obs.type === 'train') {
            hit = true;
          }

          if (hit) {
            // For "train" (large wall) obstacles, it's game over instantly
            if (obs.type === 'train') {
              endGame();
              return prev;
            }
            // For alcohol obstacles, apply impairment effects
            hitJunkFood(
              obs.junk.penalty,
              obs.junk.effect,
              obs.junk.effectDuration,
              { item: obs.junk.name, fact: obs.junk.fact, isHealthy: false }
            );
            // Remove this obstacle after hit
            newObstacles = newObstacles.filter(o => o.id !== obs.id);
            return newObstacles;
          }
        }
      }

      newObstacles = newObstacles.filter((obs) => obs.z < 10);

      // Spawn new
      const minZ = newObstacles.length > 0 ? Math.min(...newObstacles.map(o => o.z)) : 0;
      if (minZ > SPAWN_Z + 30) {
        const numToSpawn = Math.random() > 0.7 ? 2 : 1;
        const usedLanes = new Set<number>();

        for (let i = 0; i < numToSpawn; i++) {
          let lane;
          do {
            lane = Math.floor(Math.random() * 3) - 1;
          } while (usedLanes.has(lane));
          usedLanes.add(lane);

          const rand = Math.random();
          let type: 'barrier' | 'overhead' | 'train' = 'barrier';
          if (rand > 0.85) type = 'train';
          else if (rand > 0.45) type = 'overhead';

          newObstacles.push({
            id: obstacleId.current++,
            lane,
            z: SPAWN_Z - (Math.random() * 5),
            type,
            junk: getRandomAlcoholItem(),
          });
        }
      }

      return newObstacles;
    });
  });

  return (
    <>
      {obstacles.map((obs) => {
        const junkColor = obs.junk.color;
        const warningColor = '#EF5350';

        const junkMat = <meshStandardMaterial color={junkColor} roughness={0.55} metalness={0.05} />;
        const warnMat = <meshStandardMaterial color={warningColor} emissive={warningColor} emissiveIntensity={0.35} roughness={0.4} />;

        if (obs.type === 'barrier') {
          return (
            <group key={obs.id} position={[obs.lane * LANE_WIDTH, 0.5, obs.z]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.8, 1, 1]} />
                {junkMat}
              </mesh>
              <group position={[0, 0.5, 0]}>
                <DrinkModel shape={obs.junk.shape} color={junkColor} scale={1.1} />
              </group>
              <mesh position={[-0.5, 0.65, 0]}>
                <coneGeometry args={[0.15, 0.25, 8]} />
                {warnMat}
              </mesh>
              <mesh position={[0.5, 0.65, 0]}>
                <coneGeometry args={[0.15, 0.25, 8]} />
                {warnMat}
              </mesh>
            </group>
          );
        } else if (obs.type === 'overhead') {
          return (
            <group key={obs.id} position={[obs.lane * LANE_WIDTH, 1.25, obs.z]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.8, 1.5, 1]} />
                <meshStandardMaterial color={junkColor} roughness={0.55} metalness={0.05} transparent opacity={0.85} />
              </mesh>
              <mesh position={[0, -0.9, 0]}>
                <coneGeometry args={[0.25, 0.3, 8]} />
                {warnMat}
              </mesh>
              <group position={[0, -0.35, 0.55]}>
                <DrinkModel shape={obs.junk.shape} color={junkColor} scale={0.9} />
              </group>
            </group>
          );
        } else {
          return (
            <group key={obs.id} position={[obs.lane * LANE_WIDTH, 1.5, obs.z]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[2, 3, 6]} />
                {junkMat}
              </mesh>
              <mesh position={[0, 1.2, 3.05]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.15, 1.5, 0.05]} />
                <meshStandardMaterial color={warningColor} emissive={warningColor} emissiveIntensity={0.5} roughness={0.3} />
              </mesh>
              <mesh position={[0, 1.2, 3.05]} rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[0.15, 1.5, 0.05]} />
                <meshStandardMaterial color={warningColor} emissive={warningColor} emissiveIntensity={0.5} roughness={0.3} />
              </mesh>
            </group>
          );
        }
      })}
    </>
  );
}
