import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "~/utils/axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { startLoading, stopLoading } from "~/actions/loading";
import { sendMessage } from "~/actions/message";
import { useAppDispatch } from "~/hook";
import usePortal from "react-cool-portal";
import IsRequired from "~/icons/IsRequired";
import Tippy from "@tippyjs/react/headless";

const schema = yup.object().shape({
    name: yup.string().required("Name is required."),
    city: yup.string().required("City is required."),
    address: yup.string().required("Address is required.")
});

function Theater() {
    const [data, setData] = useState<ITheaters>();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { Portal, show, hide } = usePortal({ defaultShow: false });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<ITheatersValidation>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            city: "",
            address: ""
        }
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/theaters/${id}`, {
                    headers: { "Content-Type": "application/json" }
                });
                setData(response.data);
                setValue("name", response.data.name || "");
                setValue("city", response.data.city || "");
                setValue("address", response.data.address || "");
            } catch (error) {
                console.error(error);
            }
        })();
    }, [id, setValue]);

    const onSubmit: SubmitHandler<ITheatersValidation> = async (formData) => {
        hide();
        dispatch(startLoading());
        const name = formData.name;
        const city = formData.city;
        const address = formData.address;

        (async () => {
            try {
                await axios.patch(
                    `/theaters/${id}`,
                    {
                        ...(data?.name !== name && { name }),
                        ...(data?.address !== address && { address }),
                        ...(data?.city !== city && { city })
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")!).data.accessToken}`
                        }
                    }
                );
                dispatch(stopLoading());
                dispatch(sendMessage("Updated successfully!"));
                setTimeout(() => window.location.reload(), 2000);
            } catch (error) {
                dispatch(stopLoading());
                dispatch(sendMessage("Updated failed!"));
                console.error(error);
            }
        })();
    };

    return (
        data && (
            <>
                <div className="flex justify-end items-center mb-6">
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => {
                                show();
                            }}
                            className={`rounded-xl bg-block border-blue border hover:border-primary 
                           hover:bg-primary flex items-center justify-center p-3 w-[112px]`}
                        >
                            <i className="mr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={20}
                                    height={20}
                                    id="edit"
                                >
                                    <path
                                        className="fill-white"
                                        d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
                                    ></path>
                                </svg>
                            </i>
                            Update
                        </button>
                    </div>
                </div>
                <div className="bg-block p-6 rounded-3xl shadow-xl flex flex-col gap-6">
                    <div className="text-xl font-medium text-primary">{data.name}</div>
                    <div className="flex gap-6">
                        <div className="flex w-1/3 flex-col p-4 gap-2 mt-4 rounded-xl border border-blue">
                            <div className="text-base">
                                <span className="text-blue font-medium">Theater Information: </span>
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <div className="">
                                    <span className="text-blue font-medium">City: </span>
                                    {data.city}
                                </div>
                                <div className="">
                                    <span className="text-blue font-medium">Address: </span>
                                    {data.address}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-2/3 flex-col gap-2 mt-4 p-4 rounded-xl border border-blue">
                            <div className="text-base">
                                <span className="text-blue font-medium">Rooms: </span>
                            </div>
                            <ul className="grid grid-cols-3 gap-6 px-6 py-4">
                                {data.rooms.length > 0 ? (
                                    data.rooms.map((room) => (
                                        <li key={room.id} className="flex flex-col gap-2">
                                            <div>
                                                <span className="text-blue font-medium">Name: </span>
                                                {room.name}
                                            </div>
                                            <div>
                                                <span className="text-blue font-medium">Capacity: </span>
                                                {room.capacity}
                                            </div>
                                            <div>
                                                <span className="text-blue font-medium">Type: </span>
                                                {room.type}
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <span>No room has been created.</span>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <Portal>
                    <div className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-50 flex items-center justify-center">
                        <div className="flex items-center justify-center">
                            <div className="border border-blue p-8 bg-background relative rounded-xl max-h-[810px] w-[810px] max-w-[662px]  overflow-y-scroll no-scrollbar">
                                <button
                                    onClick={hide}
                                    className="absolute right-4 top-4 border border-blue rounded-full p-1 hover:border-primary hover:bg-primary"
                                >
                                    <i>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width={14}
                                            height={14}
                                            id="close"
                                        >
                                            <path
                                                className="fill-white"
                                                d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                                            ></path>
                                        </svg>
                                    </i>
                                </button>
                                <div className="flex justify-center mb-8">
                                    <div className="text-white font-semibold text-xl">Update theater</div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                    <div className="text-blue text-[15px]">Theater Information</div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="name" className="flex gap-1 mb-1 items-center">
                                            Name
                                            <IsRequired />
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Name . . ."
                                            {...register("name")}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        {<span className="text-deepRed">{errors.name?.message}</span>}
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="city" className="flex gap-1 mb-1 items-center">
                                            City
                                            <IsRequired />
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            placeholder="City . . ."
                                            {...register("city")}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        {<span className="text-deepRed">{errors.city?.message}</span>}
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="address" className="flex gap-1 mb-1 items-center">
                                            Address
                                            <IsRequired />
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder="Address . . ."
                                            {...register("address")}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        {<span className="text-deepRed">{errors.address?.message}</span>}
                                    </div>
                                    <div className="outline outline-1 outline-border my-2"></div>
                                    <button
                                        className="py-3 px-8 mt-3 text-base font-semibold rounded-lg border-blue border hover:border-primary hover:bg-primary"
                                        type="submit"
                                    >
                                        Update theater
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Portal>
            </>
        )
    );
}

export default Theater;
