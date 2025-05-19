import { useContext, useState } from "react"
import Input from "../components/common/Input"
import Button from "../components/common/Button"
import context from "../context/Context"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import Joi from "joi"
import userService from "../services/userService"
import Modal from '../components/common/Modal'

function Signin() {
    const { color, login } = useContext(context)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    const { getFieldProps, touched, handleSubmit, errors, resetForm } = useFormik({
        initialValues: {
            email: "",
            password: ""
        }, validate(values) {
            const schema = Joi.object({
                email: Joi.string().required().email({ tlds: false }).min(6).max(40).label("Email"),
                password: Joi.string().min(6).max(20).required().label("Password")
            })
            const { error } = schema.validate(values, { abortEarly: false })
            if (!error) {
                return null
            }
            const errors = {};
            for (const detail of error.details) {
                errors[detail.path[0]] = detail.message;
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const res = await userService.logIn(values);

                userService.setToken(res.data)
                const data = userService.getTokenData();
                const userRes = await userService.getUser(data._id)
                data.details = userRes.data
                login(data);

                navigate("/")
            } catch (err) {
                setShowModal(true)
            }
        }

    })


    return (
        <div className={`h-100 w-100 ${color === 'dark' && 'bg-dark'}`} data-bs-theme={color}>
            <h3 className="text-center mt-5">Sign in</h3>
            {showModal && <Modal message="email or password are incorrect" onClose={() => setShowModal(false)} />}
            <div className="d-flex justify-content-center">
                <form className="w-50" onSubmit={handleSubmit}>
                    <Input
                        error={touched.email && errors.email}
                        {...getFieldProps("email")}
                        label="Email"
                        fieldName="email"
                        type="email"
                        placeholder="enter your email"
                    />
                    <Input

                        error={touched.password && errors.password}
                        {...getFieldProps("password")}
                        label="Password"
                        fieldName="password"
                        type="password"
                        placeholder="enter your password"
                    />
                    <br />
                    <div className="row mb-5">
                        <div className="col-6 text-center form-group ">
                            <Button type="reset" onClick={resetForm} value="Reset" />
                        </div>
                        <div className="col-6 text-center form-group">
                            <Button type="button" onClick={() => navigate('/')} value="Cancel" />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-sm-12 text-center">
                            <Button type="submit" disabled={Object.keys(errors).length > 0} value="Login" />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Signin