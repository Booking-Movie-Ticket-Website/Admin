import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "~/utils/axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { startLoading, stopLoading } from "~/actions/loading";
import { sendMessage } from "~/actions/message";
import { useAppDispatch } from "~/hook";
import convertReleaseDate from "~/utils/convertReleaseDate";
import usePortal from "react-cool-portal";
import IsRequired from "~/icons/IsRequired";
import Tippy from "@tippyjs/react";
import { convertToBase64 } from "~/utils/convertToBase64";

const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required."),
    dateOfBirth: yup.date().required("Release date is required.").typeError("Release date must be a date."),
    nationality: yup.string().required("Nationality is required."),
    biography: yup.string().required("Director is required.")
});
function Actor() {
    const [data, setData] = useState<IActorData>();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { Portal, show, hide } = usePortal({ defaultShow: false });
    const [gender, setGender] = useState("");
    const [genderVisible, setGenderVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IActorData>({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: "",
            dateOfBirth: new Date(),
            nationality: "",
            biography: ""
        }
    });

    const convert = async (file: File) => {
        if (file) {
            try {
                return await convertToBase64(file);
            } catch (error) {
                console.error("Failed to convert image to base64:", error);
            }
        }
    };

    useEffect(() => {
        (async () => {
            await axios
                .get(`/people/${id}`, { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    setData(response.data);
                    setGender(response.data.gender);
                    setValue("fullName", response.data.fullName || "");
                    setValue("biography", response.data.biography || "");
                    setValue("dateOfBirth", response.data.dateOfBirth || new Date());
                    setValue("nationality", response.data.nationality || "");
                })
                .catch((error) => console.error(error));
        })();
    }, [id, setValue]);

    const onSubmit: SubmitHandler<IActorData> = async (formData) => {
        hide();
        dispatch(startLoading());
        const fullName = formData.fullName;
        const biography = formData.biography;
        const nationality = formData.nationality;
        const dateOfBirth = convertReleaseDate(formData.dateOfBirth);

        (async () => {
            try {
                const base64ProfilePicture = await convert(selectedFile!);
                await axios.patch(
                    `/people/${id}`,
                    {
                        ...(data?.fullName !== fullName && { fullName }),
                        ...(data?.nationality !== nationality && { nationality }),
                        ...(data?.biography !== biography && { biography }),
                        ...(data?.dateOfBirth !== dateOfBirth && { dateOfBirth }),
                        ...(data?.gender !== gender && { gender }),
                        ...(data?.base64ProfilePicture !== base64ProfilePicture && { base64ProfilePicture })
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
                                    <div className="text-white font-semibold text-xl">Create a new actor</div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex gap-2 flex-col">
                                            <label htmlFor="fullName" className="flex gap-1 mb-1 items-center">
                                                Full name
                                                <IsRequired />
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                placeholder="Full name . . ."
                                                {...register("fullName")}
                                                className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                            />
                                            {<span className="text-deepRed">{errors.fullName?.message}</span>}
                                        </div>
                                        <div className="flex gap-2 flex-col">
                                            <label htmlFor="nationality" className="flex gap-1 mb-1 items-center">
                                                Nationality
                                                <IsRequired />
                                            </label>
                                            <input
                                                type="text"
                                                id="nationality"
                                                placeholder="Nationality . . ."
                                                {...register("nationality")}
                                                className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                            />
                                            {<span className="text-deepRed">{errors.nationality?.message}</span>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex gap-2 flex-col">
                                            <label htmlFor="dateOfBirth" className="flex gap-1 mb-1 items-center">
                                                Birthday
                                                <IsRequired />
                                            </label>
                                            <input
                                                type="date"
                                                pattern="\d{4}-\d{2}-\d{2}"
                                                id="dateOfBirth"
                                                {...register("dateOfBirth")}
                                                className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                            />
                                            {<span className="text-deepRed">{errors.dateOfBirth?.message}</span>}
                                        </div>
                                        <div className="flex gap-2 flex-col">
                                            <label htmlFor="active" className="flex gap-1 mb-1 items-center">
                                                Gender
                                            </label>
                                            <Tippy
                                                interactive
                                                onClickOutside={() => setGenderVisible(!genderVisible)}
                                                visible={genderVisible}
                                                offset={[0, -149]}
                                                render={(attrs) => (
                                                    <div
                                                        {...attrs}
                                                        className={`flex w-[290px] text-white p-2 rounded-bl-lg rounded-br-lg flex-col bg-background outline-1 outline-border outline justify-center ${
                                                            genderVisible ? "outline-primary" : ""
                                                        }`}
                                                    >
                                                        <div
                                                            onClick={() => {
                                                                setGender("male");
                                                                setGenderVisible(false);
                                                            }}
                                                            className={`cursor-pointer py-3 px-4 hover:bg-primary text-left rounded-lg ${
                                                                gender === "male" ? "text-blue pointer-events-none" : ""
                                                            }`}
                                                        >
                                                            Male
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                setGender("female");
                                                                setGenderVisible(false);
                                                            }}
                                                            className={`cursor-pointer py-3 px-4 hover:bg-primary text-left rounded-lg ${
                                                                gender === "female"
                                                                    ? "text-blue pointer-events-none"
                                                                    : ""
                                                            }`}
                                                        >
                                                            Female
                                                        </div>
                                                    </div>
                                                )}
                                            >
                                                <div
                                                    tabIndex={-1}
                                                    onClick={() => setGenderVisible(!genderVisible)}
                                                    className={`hover:outline-primary py-3 px-4 outline-blue outline-1 outline bg-[rgba(141,124,221,0.1)] cursor-pointer ${
                                                        genderVisible
                                                            ? "rounded-tl-lg rounded-tr-lg outline-primary"
                                                            : "rounded-lg"
                                                    }   flex justify-between items-center`}
                                                >
                                                    {gender === "male" ? "Male" : "Female"}
                                                    <i className={`${genderVisible ? "rotate-180" : ""}`}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 16 16"
                                                            id="chevron-down"
                                                        >
                                                            <path
                                                                fill="#fff"
                                                                d="M4.14645,5.64645 C4.34171,5.45118 4.65829,5.45118 4.85355,5.64645 L7.9999975,8.79289 L11.1464,5.64645 C11.3417,5.45118 11.6583,5.45118 11.8536,5.64645 C12.0488,5.84171 12.0488,6.15829 11.8536,6.35355 L8.35355,9.85355 C8.15829,10.0488 7.84171,10.0488 7.64645,9.85355 L4.14645,6.35355 C3.95118,6.15829 3.95118,5.84171 4.14645,5.64645 Z"
                                                            ></path>
                                                        </svg>
                                                    </i>
                                                </div>
                                            </Tippy>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex gap-2 flex-col">
                                            <label htmlFor="biography" className="flex gap-1 mb-1 items-center">
                                                Biography
                                                <IsRequired />
                                            </label>
                                            <input
                                                type="text"
                                                id="biography"
                                                placeholder="Biography . . ."
                                                {...register("biography")}
                                                className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                            />
                                            {<span className="text-deepRed">{errors.biography?.message}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="picture" className="flex gap-1 mb-1 items-center">
                                            Profile picture
                                            <IsRequired />
                                        </label>
                                        <input
                                            type="file"
                                            id="picture"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setSelectedFile(e.target.files[0]);
                                                }
                                            }}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:border-primary focus:border focus:border-1 border border-blue border-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                    </div>
                                    <button
                                        className="py-3 px-8 mt-3 text-base font-semibold rounded-lg border-blue border hover:border-primary hover:bg-primary"
                                        type="submit"
                                    >
                                        Create actor
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

export default Actor;
