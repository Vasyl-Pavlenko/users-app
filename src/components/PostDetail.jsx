import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id  } = useParams();

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
      <Spinner
        animation="border"
        variant="primary"
      />
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
          <Card.Title className="text-capitalize">
            {title}
          </Card.Title>

          <Card.Text className="text-capitalize w-75">
            {body}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostDetail;