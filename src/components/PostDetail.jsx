import { Container, Card, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function PostDetail() {
  const { userId, id  } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    },
    options: {
      keepPreviousData: true,
    }
  });

  if (isLoading) {
    return (
      <Spinner animation="border" variant="primary" />
    );
  }

  if (isError) {
    return (
      <Alert variant="danger">
        Error: {isError.message}
      </Alert>
    );
  }

  const { title, body } = data;

  return (
    <Container className="mb-3">
      <h1>Post details</h1>

      <Card>
        <Card.Body>
          <Row>
            <Col
              sm={12}
              md={10}
              xl={11}
              className="mb-3"
            >
              <Card.Title className="text-capitalize">
                {title}
              </Card.Title>

              <Card.Text className="text-capitalize w-75">
                {body}
              </Card.Text>
            </Col>

            <Col
              sm={12}
              md={2}
              xl={1}
              className='m-auto'
            >
              <Link
                to={`/posts?userId=${userId}`}
                className="
                  text-decoration-none
                  text-white
                  fw-bold
                "
              >
                <Button variant="primary">
                  Back
                </Button>
              </Link>
            </Col>
          </Row> 
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostDetail;