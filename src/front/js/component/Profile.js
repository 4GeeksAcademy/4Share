
import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '/workspaces/4Share/src/front/styles/Profile.css';  

const Profile = () => {
  const user = {
    name: "Samantha",
    profilePic: "https://via.placeholder.com/150", // Puedes cambiar esto por una URL válida
    rating: 4.5,
    activities: ['Guitar', 'Cook', 'Dance', 'Padel'],
    description: "Hey, everyone! I love a bunch of activities and would love to learn new languages. I'm always up for trying new things and meeting people from different cultures. Shall we do this exchange and learn from each other?",
    aboutMe: "I am passionate about learning new things and sharing my knowledge. I love to meet people from different backgrounds, and I'm always open to new experiences.",
    reviews: [
      { reviewer: "John", title: "Great Experience", body: "I learned a lot from Samantha!", rating: 5 },
      { reviewer: "Jane", title: "Very knowledgeable", body: "She is patient and understanding.", rating: 4 },
      { reviewer: "Mike", title: "Highly recommend", body: "She has a great way of explaining things.", rating: 5 }
    ]
  };

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} color="gold" />);
    }

    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" color="gold" />);
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaRegStar key={i} color="gold" />);
    }

    return stars;
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2>{user.description}</h2>
          <div className="my-3">
            {user.activities.map((activity, index) => (
              <Badge key={index} pill variant="primary" className="mr-2">
                {activity}
              </Badge>
            ))}
          </div>
        </Col>
        <Col md={4} className="text-center">
          <img src={user.profilePic} alt="Profile" className="rounded-circle mb-3" width="150" />
          <h4>{user.name}</h4>
          <div>{renderStars(user.rating)} <span>({user.rating})</span></div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>About Me</h3>
          <Card>
            <Card.Body>
              <Card.Text>{user.aboutMe}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Reviews</h3>
          {user.reviews.map((review, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{review.title}</Card.Title>
                <Card.Text>{review.body}</Card.Text>
                <div>{renderStars(review.rating)} - {review.reviewer}</div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
