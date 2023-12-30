import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
// import ProductForm, { ProductFormData } from "../../components/ProductForm/ProductForm";
import { Ship } from "../Ship_List_Page/Ship_List_Page";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSsid } from "../../hooks/useSsid";
import Form from 'react-bootstrap/Form';
import My_Navbar_Without_Cart from "../../components/Navbar/Navbar";
import { Button, Container, FloatingLabel,Row } from "react-bootstrap";
import './EditPAge.css'





export interface Ship {
    record_id: number,
    rec_name: string,
    units?: string,
    env_measur?: string,
    status_rec: string,
    description: string,
    photo_record: string
}


export interface ShipFormData {
    rec_name: string,
    units?: string,
    env_measur?: string,
    status_rec: string,
    description: string,
    photo_record: string
    }

const toFormData = (ship: Ship) => {
    return {
        rec_name: ship.rec_name,
        units: ship.units,
        env_measur: ship.env_measur,
        description: ship.description,
        photo_record: ship.photo_record,

    }
}

const emptyShip: Ship = {
    record_id:-1,
    rec_name: '',
    units: '',
    env_measur: '',
    status_rec: '',
    description: '',
    photo_record: '',
    status:''
}

const EditPage: FC = () => {
    let { identifier } = useParams()
    const id = parseInt(identifier)
    console.log(typeof(id))
    const navigate = useNavigate()
    const { session_id } = useSsid()
    const pageTitle = (id ? 'Изменение рекорда' : 'Добавление рекорда')
    const [ values, setValues ] = useState<ShipFormData> (toFormData(emptyShip))
    const [ image, setImage ] = useState<File | undefined> ()

    const getProduct = async () => {
        const response = await axios(`http://127.0.0.1:8000/records/${id}`, { method: "GET" })
        setValues(toFormData(response.data))
    }

    useEffect(() => {
        id && getProduct()
    }, [])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            const { name } = e.target;
            setValues((prevValues) => ({
                ...prevValues,
                [name]: reader.result,
            }))}
        };

    const sendData = async () => {
        id ?
        await axios(`http://127.0.0.1:8000/records/${id}/put/`, {
            method: 'PUT',
            data: values,
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': session_id
            }
        })
        :
        await axios(`http://127.0.0.1:8000/records/add/`, {
            method: 'POST',
            data: values,
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': session_id
            }
        })
    }

    const sendForm = async () => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                values.photo_record = btoa(reader.result as string)
                sendData()
            }
            reader.readAsBinaryString(image)
        } else {
            sendData()
        }
        setTimeout(() => { navigate('/records'); }, 1000);
        console.log(values)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendForm();
    };

    return (
        <Container>
        <Row>
            <My_Navbar_Without_Cart />
            <h1>{pageTitle}</h1>
            <Form onSubmit={handleSubmit} style={{width:"95%",marginInline:'auto'}}>
            <Form.Group controlId="rec_name">
                    <FloatingLabel label='Название рекорда' className="mb-3">
                    <Form.Control type="text" name = 'rec_name' placeholder="" value={values.rec_name} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="units">
                    <FloatingLabel label='Ед. измерения' className="mb-3">
                    <Form.Control type="text" name = 'units' placeholder="" value={values.units} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="env_measur">
                    <FloatingLabel label='Среда обитания' className="mb-3">
                    <Form.Control type="text" name = 'env_measur' placeholder="" value={values.env_measur} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="description">
                    <FloatingLabel label='Описание' className="mb-3">
                    <Form.Control as="textarea" name = 'description' placeholder="" value={values.description} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="photo_record">
                    <FloatingLabel label='Фото рекорда' className="mb-3">
                    <Form.Control type="file" name = 'photo_record' onChange={handleFileChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Button type="submit">Сохранить</Button>
            </Form>
        </Row>
        </Container>
            )
}

export default EditPage