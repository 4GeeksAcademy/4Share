import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ProfileShare = () => {
  return (
    <Container className="text-center mt-5">
      {/* Texto "Start Searching" */}
      <Row>
        <Col>
          <h1>Start Searching!</h1>
        </Col>
      </Row>

      {/* Barra de busca */}
      <Row className="justify-content-center mt-3">
        <Col md={8}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>
        </Col>
      </Row>

        {/* Barra de Categorias */}
      <Row className="justify-content-center mt-4">
        <Col md={10}>
          <div className="category-bar d-flex justify-content-around">
            <Button variant="outline-secondary" className="category-btn">
              <FontAwesomeIcon icon={faMusic} /> Music
            </Button>
            <Button variant="outline-secondary" className="category-btn">
              <FontAwesomeIcon icon={faDumbbell} /> Sports
            </Button>
            <Button variant="outline-secondary" className="category-btn">
              <FontAwesomeIcon icon={faTheaterMasks} /> Dance
            </Button>
            <Button variant="outline-secondary" className="category-btn">
              <FontAwesomeIcon icon={faUtensils} /> Cookink
            </Button>
            <Button variant="outline-secondary" className="category-btn">
              <FontAwesomeIcon icon={faLanguage} /> Language
            </Button>
            <Button variant="outline-secondary" className="category-btn">
              <FontAwesomeIcon icon={faBook} /> Studies
            </Button>
          </div>
        </Col>
      </Row>

      {/* Sugestões de perfis */}
      <Row className="justify-content-center mt-5">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>John Doe</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Main Skill: Guitar</Card.Subtitle>
              <Card.Text>
                John is an experienced musician with over 10 years of playing guitar professionally.
              </Card.Text>
              <Button variant="primary">View Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Samantha Smith</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Main Skill: Cooking</Card.Subtitle>
              <Card.Text>
                Samantha is a talented chef specializing in French cuisine, with a passion for teaching.
              </Card.Text>
              <Button variant="primary">View Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Michael Johnson</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Main Skill: Fitness</Card.Subtitle>
              <Card.Text>
                Michael is a personal trainer focused on helping people achieve their fitness goals.
              </Card.Text>
              <Button variant="primary">View Profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export ProfileShare