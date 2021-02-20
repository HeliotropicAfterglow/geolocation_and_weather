import './App.css';
import { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup} from 'react-bootstrap'
import Weather from './Weather';

function App() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setIsLoading(false);
      }, (error) => {
        alert(error);
      })
    }
    else {
      alert('Your browser does not support geolocation!')
    }

  }, [])

  if (isLoading) {
    return <p>Loading geolocation...</p>
  } else {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
            <Col md={4}>
            <ListGroup>
              <ListGroup.Item variant="info"><h3>Geolocation</h3></ListGroup.Item>
              <ListGroup.Item><p>Position: <span>{lat.toFixed(3)}</span>, <span>{lng.toFixed(3)}</span></p></ListGroup.Item>
            </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup.Item variant="info"><h3>Weather on your location </h3></ListGroup.Item>
              <ListGroup.Item><Weather lat={lat} lng={lng} /></ListGroup.Item>
            </Col>
        </Row>       
      </Container>      
    );
  }
}

export default App;
