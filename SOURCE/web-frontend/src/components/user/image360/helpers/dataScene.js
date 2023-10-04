
// Object container all scene
const Scene = {
    outsideOne: {
        title: 'Nhà trưng bày chính',
        image: '/images/BaotangLD1.jpg',
        pitch: 17,
        yaw: 5,
        hotSpots: {
            // mapTour: {
            //     type: 'info',
            //     text: 'Sơ đồ tham quan bảo tàng',
            //     image: '/public/images/so-do-tham-quan.jpg',
            //     pitch: -1,
            //     yaw: -41,
            //     cssClass: 'hotSpotElementImg'
            // },
            nextScene: {
                type: 'custom',
                pitch: 9.8,
                yaw: 4.1,
                cssClass: 'moveScene',
                scene: 'insideOne'
            },
            nextTour: {
                type: 'custom',
                pitch: 0.2,
                text: 'Dạo quanh khuôn viên',
                yaw: -125,
                cssClass: 'moveScene',
                scene: 'outsideTwo'
            }
        }
    },
    outsideTwo: {
        title: 'Khuôn viên xung quanh bảo tàng',
        image: '/images/BaotangLD-outside.jpg',
        pitch: 17,
        yaw: 5,
        hotSpots: {
            outSide: {
                type: 'info',
                image: '/images/so-do-tham-quan.jpg',
                text: 'Nơi diễn ra các hoạt động trò chơi dân gian',
                pitch: -0.8,
                yaw: -111,
                cssClass: 'hotSpotElementImg'
            },
            nextScene: {
                type: 'custom',
                pitch: -11,
                yaw: 158,
                cssClass: 'moveScene',
                scene: 'insideOne'
            }
        }
    },
    insideOne: {
        title: "Bên trong nhà trưng bày",
        image: '/images/BaotangLD10.jpg',
        pitch: 10,
        yaw: 180,
        hotSpots: {
            typeWrite: {
                type: 'custom',
                pitch: -18,
                yaw: 87,
                nameModel: 'typeWrite',
                cssClass: 'hotSpotElement'
            },
            model2: {
                type: 'custom',
                pitch: -31,
                yaw: 11,
                cssClass: 'hotSpotElement'
            },
            machineGun: {
                type: 'custom',
                pitch: -7.5,
                yaw: 122,
                nameModel: 'machineGun',
                cssClass: 'hotSpotElement'
            },
            outSide: {
                type: 'custom',
                pitch: -49,
                yaw: -162,
                cssClass: 'moveScene',
                scene: 'outsideOne'
            }
        }
    }
}

export default Scene;