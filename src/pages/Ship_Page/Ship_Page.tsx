import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Ship_Info, {Param} from '../../components/Ship_Info/Ship_Info'
import "./Ship_Page.css"
import { Container, Row } from 'react-bootstrap';
import axios from 'axios'
import My_Navbar_Without_Cart from '../../components/Navbar/Navbar';

export interface Ship {
    record_id: number,
    rec_name: string,
    units?: string,
    env_measur?: string,
    status_rec: string,
    description: string,
    photo_record: string
}

const Ship_Page: FC = () => {
    const { id } = useParams();

    const [ship, setShip] = useState<Ship>();
    const [parameters, setParameters] = useState<Param[]>([]);

    const getParams = (source: Ship) => {
        let params: Param[] = []
        source.units && params.push({key: "Еденицы измерения", value: source.units})
        source.env_measur &&  params.push({key: "Среда обитания", value: source.env_measur})
        return params
    }

    const get_Ship = async () => {
        const {data} = await axios(`http://127.0.0.1:8000/records/${id}`, {
            method: "Get",
        })
        setShip(data);
        setParameters(getParams(data));
    }
    useEffect(() => {
        get_Ship()
    }, [id]);

    return (
        <Container>
            <My_Navbar_Without_Cart/>
            <Row>
                {ship && parameters && id && <Ship_Info record_id={parseInt(id)} description={ship.description} rec_name={ship.rec_name} parameters={parameters} photo_record={ship.photo_record} />}
            </Row>
        </Container>
    )
}

export default Ship_Page;