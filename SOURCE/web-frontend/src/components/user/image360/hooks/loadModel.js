import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import typewriter from '../models/typewriter/scene.gltf'
export default function Model() {

    const loadModel = (scene, path, name) => {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(path, (model) => {
            console.log(`${name} - Loaded successfully!`);
            scene.add(model.scene);
        }, (progress) => {
            console.log(`Loading ${name} : ${progress.loaded} / ${progress.total}`);
        }, (err) => {
            console.log(`Error loading ${name} : ${err}`);
        });
    };

    const ModelTypeWriter = (scene) => {
        loadModel(scene, '../models/typewriter/scene.gltf', 'Type Writer 1966s - Máy đánh chữ');
      };

      const ModelMG = (scene) => {
        loadModel(scene, '../models/binh_su/Binhsu.gltf', 'Machine Gun - Súng máy');
      };

    return {ModelTypeWriter, ModelMG}
}
