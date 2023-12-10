import axios from "~/utils/axios";

const register = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    gender: string,
    phoneNumber: string,
    address: string,
    dateOfBirth: string
) => {
    return axios.post("/auth/sign-up", {
        email,
        password,
        firstName,
        lastName,
        gender,
        phoneNumber,
        address,
        dateOfBirth
    });
};

const login = (email: string, password: string) => {
    return axios
        .post("/auth/login", {
            email,
            password
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout
};
