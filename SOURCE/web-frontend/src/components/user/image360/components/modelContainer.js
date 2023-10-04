/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Model from "components/user/image360/hooks/loadModel";
import 'components/user/image360/styles/model.css'


export default function ModelContainer({ nameModel }){

    const mountRef = useRef(null);

    const [animationId, setAnimationId] = useState();

    let currentRef;

    useEffect(() => {
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
        let modelGroup = new THREE.Group();
        let renderer = new WebGLRenderer({ alpha: true, powerPreference: 'high-performance', precision: 'lowp', animation: true});
        // Khởi tạo không gian 3 chiều tương tác với object
        let orbitControls = new OrbitControls(camera, renderer.domElement);
        let shouldAnimate = true;
        // Điều khiển quỹ đạo của object
        orbitControls.enableDamping = true;

        currentRef = mountRef.current;
        createScene(scene, camera, modelGroup);
        initRenderer(currentRef, renderer);
        const animate = () => {
            if(shouldAnimate) {
                const id = requestAnimationFrame(animate);
                setAnimationId(id);
                orbitControls.autoRotate = true;
                orbitControls.update();
                // error: Khi kết xuất gửi 1 element html
                renderer.render(scene, camera);
            }
        };

        animate();

        // Biến phần tử thành canvas say khi render, hiển thị canvas bên trong scene
        currentRef.appendChild(renderer.domElement);

        return () => {
            // Optimize clean memory cache
            shouldAnimate = false;

            currentRef.removeChild(renderer.domElement);
            scene.clear();
            camera.clear();
            modelGroup.clear();
            renderer.clear();
            cancelAnimationFrame(animationId);

            //
            scene = null;
            camera = null;
            renderer = null;
            modelGroup = null;
            orbitControls = null;
        }
    }, [])

    const createScene = (scene, camera, modelGroup) => {
        const ambientLight = new THREE.AmbientLight(0xeeeeee, 0.8);
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        camera.position.set(0, 0, 1)
        scene.add(ambientLight);
        scene.add(pointLight);
        // // Các kích thước khung không gian 3D
        // const sceneWidth = 2;
        // const sceneHeight = sceneWidth * (window.innerHeight / window.innerWidth);
        // const sceneDepth = 2;

        // // Tính toán giá trị vector giữa các kích thước để giữ model ở giữa
        // const middleVector = new THREE.Vector3(
        //     sceneWidth / 2,
        //     sceneHeight / 2,
        //     (sceneDepth + sceneWidth) / 2
        // );

        // //  Di chuyển camera tới giữa
        // camera.position.copy(middleVector);

        // // Di chuyển center tới giữa
        // camera.lookAt(new THREE.Vector3(sceneWidth / 2, sceneHeight / 2, 0));

        // add camera to the scene
        scene.add(camera);

        importModel(modelGroup, scene);
    }

    const importModel = (modelGroup, scene) =>{
        if(nameModel === 'typeWrite'){
            const { ModelTypeWriter } = Model();
            ModelTypeWriter(modelGroup);
        }
        else if(nameModel === 'machineGun'){
            const { ModelMG } = Model();
            ModelMG(modelGroup);
        }

        scene.add(modelGroup);
    }

    const initRenderer = (currentRef, renderer) =>{
        const { clientWidth: width, clientHeight: height } = currentRef;
        renderer.setSize(width, height);
        // Set up độ phân giải cho model
        renderer.setPixelRatio(window.devicePixelRatio);
    }

    return(
        <div className="container3d" ref={mountRef}>

        </div>
    )
}