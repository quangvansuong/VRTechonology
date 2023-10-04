import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleNotch, faPenToSquare, faPencil, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AddOrUpdateText } from "../../../components/utils/Utils";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";
import { generateSlug } from "../../../components/utils/Utils";

import { getHeritageById } from "services/HeritageRepository";
import { getHeritageTypes } from "services/HeritageTypeRepository";
import { getLocations } from "../../../services/LocationRepository";
import { getManagementUnits } from "../../../services/ManagementUnitRepository";
import { addHeritage } from "../../../services/HeritageRepository";
import { putHeritage } from "../../../services/HeritageRepository";
import NotificationModal from "../../../components/admin/modal/NotificationModal";

import DefaultImage from "images/post-default-full.png"

export default ({ type = "" }) => {

    let mainText = AddOrUpdateText(type, "di sản");
    const initialState = {
        heritage_type_id: 0,
        name: '',
        image_url: '',
        location_id: 0,
        management_unit_id: 0,
        time: '',
        urlslug: '',
        description: ''
    }, [heritage, setHeritage] = useState(initialState);

    const [heritageTypeList, setHeritageTypeList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [managementUnitList, setManagementUnitList] = useState([]);
    const [successFlag, SetSuccessFlag] = useState(false);
    const [errors, setErrors] = useState({});

    let { id } = useParams();
    id = id ?? 0;

    let maintAction = '';
    if (id === 0) {
        maintAction = 'thêm';
    }
    else {
        maintAction = 'cập nhật';
    }

    //console.log(id);
    useEffect(() => {
        document.title = "Thêm/ cập nhật di sản";

        if (id !== 0) {
            getHeritageById(id).then(data => {
                //console.log(data)
                if (data) {
                    const {
                        id: ignoredId,
                        ...heritageData } = data;
                    setHeritage({
                        ...heritageData
                    });
                    //console.log("Đã bỏ qua id: " + ignoredId);
                } else {
                    setHeritage(initialState);
                }
            })
        }

        getHeritageTypes().then(data => {
            if (data) {
                setHeritageTypeList(data.data);
            }
            else
                setHeritageTypeList([]);
            //console.log(data)
        })

        getLocations().then(data => {
            if (data) {
                setLocationList(data.data);
            }
            else
                setHeritageTypeList([]);
            //console.log(data)
        })

        getManagementUnits().then(data => {
            if (data) {
                setManagementUnitList(data.data);
            }
            else
                setHeritageTypeList([]);
            //console.log(data)
        })
    }, [])
    //console.log(heritage)

    //validate lỗi bổ trống
    const validateAllInput = () => {
        const validationErrors = {};

        if (heritage.heritage_type_id === 0) {
            validationErrors.heritage_type_id = 'Vui lòng chọn loại di sản';
        }

        if (heritage.name.trim() === '') {
            validationErrors.name = 'Vui lòng nhập tên di sản';
        }

        if (heritage.image_url.trim() === '') {
            validationErrors.image_url = 'Vui lòng chọn địa chỉ url của ảnh';
        }

        if (heritage.location_id === 0) {
            validationErrors.location_id = 'Vui lòng chọn địa điểm';
        }

        if (heritage.management_unit_id === 0) {
            validationErrors.management_unit_id = 'Vui lòng chọn đơn vị quản lý';
        }

        if (heritage.time.trim() === '') {
            validationErrors.time = 'Vui lòng nhập thời gian';
        }

        if (heritage.urlslug.trim() === '') {
            validationErrors.urlslug = 'Slug chưa được tạo';
        }

        if (heritage.description.trim() === '') {
            validationErrors.description = 'Vui lòng nhập mô tả chi tiết';
        }

        setErrors(validationErrors);
        // Kiểm tra nếu có lỗi
        if (Object.keys(validationErrors).length === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    const handleSubmit = () => {
        // Nếu không có lỗi mới xóa hoặc cập nhật
        if (validateAllInput() === false) {
            if (id === 0) {
                addHeritage(heritage).then(data => {
                    SetSuccessFlag(data);
                    //console.log(data);
                });
            }
            else {
                putHeritage(id, heritage).then(data => {
                    SetSuccessFlag(data);
                    //console.log(data);
                });
            }
        }
    }

    //Xử lý khi bấm xóa bên component con NotificationModal
    const childToParent = (isContinue) => {
        if (isContinue === true && id === 0) {
            setHeritage(initialState);
             // Reset flag sau khi thêm thành công
            setTimeout(() => { SetSuccessFlag(false); }, 1000)
        }
    }

    return (
        <main>
            <div className="mt-12 px-4">
                <div className="bg-white editor mx-auto flex w-10/12 max-w-2xl flex-col p-6 text-gray-800 shadow-lg mb-12 rounded-lg border-t-4 border-purple-400">
                    <div className="flex mb-4 items-center space-x-5">
                        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                            <h2 className="leading-relaxed">{mainText.headingText}</h2>
                            <p className="text-sm text-gray-500 font-normal leading-relaxed">Vui lòng điền vào các ô bên dưới</p>
                        </div>
                    </div>
                    <h2 className="font-semibold text-sm text-teal-500">
                        Tên di sản
                    </h2>
                    <input
                        name="name"
                        required
                        type="text"
                        value={heritage.name || ''}
                        onChange={e => setHeritage({
                            ...heritage,
                            name: e.target.value,
                            urlslug: generateSlug(e.target.value),
                        })}
                        placeholder="Nhập tên di sản"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.name &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.name}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        UrlSlug
                    </h2>
                    <input
                        name="urlslug"
                        required
                        type="text"
                        value={heritage.urlslug || ''}
                        // onChange={e => setHeritage({
                        //     ...heritage,
                        //     UrlSlug: e.target.value
                        // })}
                        placeholder="Nhập định danh slug"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.urlslug &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.urlslug}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Loại di sản
                    </h2>
                    <select
                        name='heritage_type_id'
                        value={heritage.heritage_type_id}
                        required
                        onChange={e => {
                            setHeritage({
                                ...heritage,
                                heritage_type_id: parseInt(e.target.value, 10)
                            })
                        }}
                        className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none">
                        <option value=''>--- Chọn loại di sản ---</option>
                        {heritageTypeList.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {errors.heritage_type_id &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.heritage_type_id}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Địa điểm
                    </h2>
                    <select
                        name='location_id'
                        value={heritage.location_id}
                        required
                        onChange={e => {
                            setHeritage({
                                ...heritage,
                                location_id: parseInt(e.target.value, 10)
                            })
                        }}
                        className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none">
                        <option value=''>--- Chọn địa điểm ---</option>
                        {locationList.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {errors.location_id &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.location_id}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Đơn vị quản lý
                    </h2>
                    <select
                        name='management_unit_id'
                        value={heritage.management_unit_id}
                        required
                        onChange={e => {
                            setHeritage({
                                ...heritage,
                                management_unit_id: parseInt(e.target.value, 10)
                            })
                        }}
                        className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none">
                        <option value=''>--- Chọn đơn vị quản lý ---</option>
                        {managementUnitList.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {errors.management_unit_id &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.management_unit_id}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Thời gian
                    </h2>
                    <input
                        name="time"
                        required
                        type="text"
                        value={heritage.time || ''}
                        onChange={e => setHeritage({
                            ...heritage,
                            time: e.target.value,
                        })}
                        placeholder="Nhập thời gian"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.time &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.time}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Mô tả chi tiết
                    </h2>
                    <textarea
                        name="description"
                        required
                        type="text"
                        value={heritage.description || ''}
                        onChange={e => setHeritage({
                            ...heritage,
                            description: e.target.value
                        })}
                        placeholder="Nhập mô tả chi tiết"
                        className="description mb-4 sec h-36 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" spellcheck="false" ></textarea>
                    {errors.description &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.description}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Hình ảnh
                    </h2>
                    <input
                        name="image_url"
                        required
                        type="text"
                        value={heritage.image_url || ''}
                        onChange={e => setHeritage({
                            ...heritage,
                            image_url: e.target.value,
                        })}
                        placeholder="Nhập link ảnh"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.image_url &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.image_url}
                        </p>
                    }

                    {!isEmptyOrSpaces(heritage.image_url) && <>
                        <p className="text-gray-600 mb-4 text-center">Ảnh hiện tại</p>
                        <img src={heritage.image_url} className="w-full h-auto mb-4 rounded-lg" />
                    </>}

                    <div className="buttons flex">
                        <hr className="mt-4" />
                        <Link to="/admin/dashboard/all-heritage" className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500">
                            Hủy
                        </Link>
                        <button id="notification_buttonmodal" onClick={() => { handleSubmit() }} type="submit" className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer !hover:bg-indigo-700 !bg-indigo-500 p-2 px-5 font-semibold text-white">
                            {mainText.buttonText}
                        </button>
                    </div>

                    <NotificationModal mainAction={maintAction} isSuccess={successFlag} isContinue={childToParent} type="heritage" />
                </div>

            </div>
        </main>
    );
}
