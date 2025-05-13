import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import userService from "../services/userService"
import { useContext, useState } from "react"
import Joi from "joi"
import context from "../context/Context"
import FieldCol from "../components/common/FieldCol"
import Button from "../components/common/Button"
import AlertError from "../components/common/AlertError"


function Signup() {
    const cnx = useContext(context)
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const { handleSubmit, errors, getFieldProps, touched, resetForm } = useFormik({
        initialValues: {
            name: {
                first: "",
                middle: "",
                last: "",
            },
            phone: "",
            address: {
                street: "",
                city: "",
                state: "",
                houseNumber: "",
                country: "",
                zip: "",
            },

            image: {
                url: "",
                alt: "",
            },
            email: "",
            password: "",
            isBusiness: false,

        }, validate: (values) => {
            const schema = Joi.object({
                name: Joi.object({
                    first: Joi.string().min(2).max(10).required().label("Name"),
                    middle: Joi.string().min(2).max(10).label("Middle Name"),
                    last: Joi.string().min(2).max(14).required().label("Last Name"),
                }),

                phone: Joi.string().min(9).max(10).required().label("Phone"),
                address: Joi.object({
                    street: Joi.string().min(2).max(18).required().label("Street"),
                    city: Joi.string().min(3).max(12).required().label("City"),
                    state: Joi.string().min(4).max(14).label("State"),
                    houseNumber: Joi.string().min(1).max(4).required().label("House Number"),
                    country: Joi.string().min(3).max(14).required().label("Country"),
                    zip: Joi.string().min(5).max(7).label("Zip"),
                }),
                image: Joi.object({
                    url: Joi.string().min(7).max(250).required().label("Img Url"),
                    alt: Joi.string().min(2).max(20).label("Img Alt"),
                }),
                email: Joi.string().min(5).max(45).required().label("Email"),
                password: Joi.string().min(6).max(30).required().label("Password"),
                isBusiness: Joi.bool().label("Business")
            })
            const { error } = schema.validate(values, {
                abortEarly: false
            })
            if (!error) {
                return null
            }
            const errors = {}
            for (const detail of error.details) {
                errors[detail.path[0]] = detail.message;
            }
            return errors;
        }, onSubmit: async (values) => {
            try {
                await userService.signUp(values)
                navigate("/")
            } catch (err) {
                setError(err.toString())
            }
        }

    })


    return (
        <div className="container">
            <form className="m-3 p-3 mt-1 pt-1" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="jumbotron">
                        <h4 className="text-center">Register</h4>
                    </div>
                </div>
                <AlertError error={error} />
                <div className='row'>

                    <FieldCol fieldName="first" type="text" label="First Name" placeholder="Enter your First Name" error={touched.first && errors.name.first}{...getFieldProps("name.first")} />
                    <FieldCol fieldName="middle" type="text" label="Middle Name" placeholder="Enter your Middle Name" error={touched.middle && errors.name.middle}{...getFieldProps("name.middle")} />
                </div>
                <div className='row'>
                    <FieldCol fieldName="last" type="text" label="Last Name" placeholder="Enter your last name" error={touched.last && errors.name.last}{...getFieldProps("name.last")} />
                    <FieldCol fieldName="phone" type="text" label="Phone" placeholder="Enter your phone number" error={touched.phone && errors.phone}{...getFieldProps("phone")} />
                </div>
                <div className="row">
                    <FieldCol fieldName="street" type="text" label="Street" placeholder="Enter your street name" error={touched.street && errors.street}{...getFieldProps("address.street")} />
                    <FieldCol fieldName="city" type="text" label="City" placeholder="Enter your city name" error={touched.city && errors.city}{...getFieldProps("address.city")} />
                </div>
                <div className="row">
                    <FieldCol fieldName="state" type="text" label="State" placeholder="Enter your state name" error={touched.state && errors.state}{...getFieldProps("address.state")} />
                    <FieldCol fieldName="houseNumber" type="text" label="House Number" placeholder="Enter your House address number" error={touched.houseNumber && errors.houseNumber}{...getFieldProps("address.houseNumber")} />
                </div>
                <div className="row">
                    <FieldCol fieldName="country" type="text" label="Country" placeholder="Enter your country name" error={touched.country && errors.country}{...getFieldProps("address.country")} />
                    <FieldCol fieldName="zip" type="text" label="Zip" placeholder="Enter your zip code number" error={touched.phone && errors.zip}{...getFieldProps("address.zip")} />
                </div>
                <div className="row">
                    <FieldCol fieldName="imgUrl" type="text" label="Img Url" placeholder="Enter your img url" error={touched.imgUrl && errors.url}{...getFieldProps("image.url")} />
                    <FieldCol fieldName="imgAlt" type="text" label="Img Alt" placeholder="Enter your img alt" error={touched.imgAlt && errors.alt}{...getFieldProps("image.alt")} />
                </div>
                <div className="row">
                    <FieldCol fieldName="email" type="email" label="Email" placeholder="Enter your email" error={touched.email && errors.email}{...getFieldProps("email")} />

                    <FieldCol fieldName="password" type="password" label="Password" placeholder="Enter your password" error={touched.password && errors.password}{...getFieldProps("password")} />

                </div>
                <div className="row">
                    <FieldCol fieldName="biz" type="checkbox" label=" Sign up as Biz user" error={touched.biz && errors.isBusiness}{...getFieldProps("isBusiness")} />
                </div>

                <div className="row mb-2">
                    <div className="col-sm-6 text-center form-group">
                        <Button type="reset" onClick={resetForm} value="Reset" />
                    </div>
                    <div className="col-sm-6 text-center form-group">
                        <Button type="button" onClick={() => navigate('/')} value="Cancel" />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-sm-12 text-center">
                        <Button type="submit" disabled={Object.keys(errors).length > 0} value="Sign Up" />
                    </div>
                </div>

            </form>
        </div>
    )

}






export default Signup