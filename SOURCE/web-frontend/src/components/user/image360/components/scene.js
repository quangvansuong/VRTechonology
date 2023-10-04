import React, { useState } from "react";
import { Pannellum } from "pannellum-react";
import dataScene from 'components/user/image360/helpers/dataScene.js';
import useModel from 'components/user/image360/hooks/useModel.js';
import Model from "components/user/image360/components/model3D.js";
import ModelContainer from "components/user/image360/components/modelContainer.js";

export default function Scene() {

    const { isOpen, openModel, closeModel } = useModel(false);
    const [scene, setScene] = useState(dataScene['outsideOne']);
    const [model, setModel] = useState(null);

    const hotSpots = (Element, i) => {
        if (Element.cssClass === 'hotSpotElement')
            return (
                <Pannellum.Hotspot
                    id={`hotspot-${i}`} // Thêm id cho hotspot
                    key={i}
                    type= "custom"
                    text={Element.text}
                    pitch={Element.pitch}
                    yaw={Element.yaw}
                    cssClass={Element.cssClass}
                    handleClick={() => { openModel(); setModel(Element.nameModel) }}
                />
            );

        else if (Element.cssClass === 'hotSpotElementImg')
            return (
                <Pannellum.Hotspot
                    id={`hotspot-${i}`} // Thêm id cho hotspot
                    key={i}
                    type= "custom"
                    text={Element.text}
                    pitch={Element.pitch}
                    yaw={Element.yaw}
                    cssClass={Element.cssClass}
                />
            );

        else if (Element.cssClass === 'moveScene')
            return (
                <Pannellum.Hotspot
                    id={`hotspot-${i}`} // Thêm id cho hotspot
                    key={i}
                    type= "custom"
                    pitch={Element.pitch}
                    yaw={Element.yaw}
                    cssClass={Element.cssClass}
                    handleClick={() => setScene(dataScene[Element.scene])}
                />
            );
    }

    return (
        <div>
            <Pannellum
                width= {'155%'}
                height= {'100vh'}
                title={scene.title}
                image={scene.image}
                pitch={scene.pitch}
                yaw={scene.yaw}
                hfov={120}
                autoLoad
                autoRotate = {0.8}
                compass = {true}
                showControls={true}
                showZoomCtrl={false}
                showFullscreenCtrl={true}
                orientationOnByDefault={true}
            >
                {Object.values(scene.hotSpots).map((Element, i) => (hotSpots(Element, i)))}
            </Pannellum>

            <Model isOpen={isOpen} isClose={() => closeModel()}>
                {isOpen && <ModelContainer nameModel={model} />}
            </Model>
        </div>
    );
}

