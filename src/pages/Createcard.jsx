import context from "../context/Context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Joi from "joi";
import cardService from "../services/cardService";
import FieldCol from "../components/common/FieldCol";
import Button from "../components/common/Button";
import AlertError from '../components/common/AlertError'

function Createcard() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { getFieldProps, touched, errors, handleSubmit, resetForm } = useFormik({
        initialValues: {
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            image: {
                url: "",
                alt: "",
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: "",
                zip: "",

            }

        }, validate(values) {
            const schema = Joi.object({
                address: Joi.object({
                    street: Joi.string().min(2).max(18).required().label("Street"),
                    city: Joi.string().min(3).max(12).required().label("City"),
                    state: Joi.string().min(4).max(14).label("State"),
                    houseNumber: Joi.string().min(1).max(4).required().label("House Number"),
                    country: Joi.string().min(3).max(14).required().label("Country"),
                    zip: Joi.string().min(3).max(14).required().label("Zip"),
                }).required().label("Adress"),
                email: Joi.string().min(5).max(45).required().label("Email"),
                phone: Joi.string().min(9).max(10).required().label("Phone"),
                title: Joi.string().min(2).max(40).required().label("Title"),
                description: Joi.string().min(2).max(60).required().label("description"),
                web: Joi.string().min(10).max(200).required().label("Web"),
                image: Joi.object({
                    url: Joi.string().min(10).max(200).required().label("Url"),
                    alt: Joi.string().min(2).max(20).required().label("image alt"),


                }),
                subtitle: Joi.string().min(2).max(20).required().label("Subtitle"),
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
                await cardService.createCard(values)

                navigate('/my-cards')
            } catch (err) {
                if (err.status == 400 && err.response.data.includes("error") && err.response.data.includes("email")) {
                    setError("Card's email already in use by a different card")
                }
            }
        }

    })


    const fieldDefinition = {
        title: { label: 'Title', placeholder: 'Enter your title' },
        subtitle: { label: 'Subtitle', placeholder: 'Enter your subtitle' },
        description: { label: 'Description', placeholder: 'Enter your description' },
        phone: { label: 'Phone', placeholder: 'Enter your phone' },
        email: { type: 'email', label: 'Email', placeholder: 'Enter your email' },
        web: { type: 'url', label: 'Website', placeholder: 'Enter your web site URL' },

        image: {
            url: { type: 'url', label: 'Image URL', placeholder: 'Enter your image URL' },
            alt: { label: 'Image description', placeholder: 'Enter your image description' },
        },
        address: {
            street: { label: 'Street', placeholder: 'Enter your street' },
            houseNumber: { label: 'House Number', placeholder: 'Enter your House number' },
            city: { label: 'City', placeholder: 'Enter your city' },
            state: { label: 'State', placeholder: 'Enter your state' },
            country: { label: 'Country', placeholder: 'Enter your country' },
            zip: { label: 'Zip', placeholder: 'Enter your ZIP code' },
        }
    }

    const getField = (fieldName) => {
        let field = fieldDefinition[fieldName];
        let touchedVal = touched[fieldName];
        let errorsVal = errors[fieldName];
        let fieldProps = getFieldProps(fieldName);
        if (fieldName.includes(".")) {
            const names = fieldName.split(".")
            field = fieldDefinition[names[0]][names[1]];

            if (touched[names[0]])
                touchedVal = touched[names[0]][names[1]];
            if (errors[names[0]])
                errorsVal = errors[names[0]][names[1]];
            fieldProps = getFieldProps(fieldName);
        }

        return (
            <FieldCol fieldName={fieldName}
                type={field.type || 'text'}
                label={field.label}
                placeholder={field.placeholder}
                error={touchedVal && errorsVal}
                {...fieldProps} />
        )
    }


    return (
        <div className="container">
            <form className="m-3 p-3 mt-1 pt-1" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="jumbotron">
                        <h4 className="text-center">Create new card</h4>
                    </div>
                </div>
                <AlertError error={error} />

                <div className="row">

                    {getField('title')}
                    {getField('subtitle')}
                </div>
                <div className="row">
                    {getField('description')}
                    {getField('phone')}

                </div>
                <div className="row">
                    {getField('email')}
                    {getField('web')}
                </div>
                <div className="row">
                    {getField('image.url')}
                    {getField('image.alt')}
                </div>
                <div className="row">
                    {getField('address.street')}
                    {getField('address.houseNumber')}
                </div>
                <div className="row">
                    {getField('address.city')}
                    {getField('address.state')}
                </div>
                <div className="row">
                    {getField('address.country')}
                    {getField('address.zip')}
                </div>
                <div className="row mb-2">
                    <div className="col-sm-6 text-center form-group mb-2">
                        <Button type="reset" onClick={resetForm} value="Reset" />
                    </div>
                    <div className="col-sm-6 text-center form-group">
                        <Button type="button" onClick={() => navigate('/')} value="Cancel" />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-sm-12 text-center">
                        <Button type="submit" disabled={Object.keys(errors) > 0} value="Save Card" />
                    </div>
                </div>
            </form>
        </div>
    )
}


export default Createcard