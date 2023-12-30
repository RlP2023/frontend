import { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../Ship_Card/Ship_Card.css'

interface Props {
    ship_id: Number,
    name: string,
    description: string,
    photo_data: string,
    delete_from_cart:Function,
	status:string


}

// "data:image/jpeg;base64,"+
const Ship_Card_Cart: FC<Props> = ({ ship_id, name, description, photo_data,delete_from_cart,status}) => (
    <Card style={{ width: '20rem',height: '27rem',  marginRight: '2rem'}}>
	    <Card.Body>
	    	<Card.Title>{name}</Card.Title>
	    	<Card.Img variant="top" src={`data:image/jpeg;base64,${photo_data}`} height={150} width={200} />
		    <Card.Text>
		          {description}
		    </Card.Text>
			{(status == "Forming") && <div>
			<Button style={{margin:"5px"}} onClick={() => {delete_from_cart(ship_id)}} variant="primary">Удалить из корзины</Button></div>}

	    </Card.Body>
    </Card>
)

export default Ship_Card_Cart