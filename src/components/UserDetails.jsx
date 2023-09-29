import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function UserDetail() {
  const { pathname, search } = useLocation();

  const { isLoading, isError, data } = useQuery({
    queryKey: [pathname],
    queryFn: async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com${pathname}${search}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    },
    options: {
      keepPreviousData: true,
    }
  });  

  if (!data) {
    return (
      <Container className="mb-3">
        <h1>
          User Details
        </h1>

        <Alert variant='danger'>
          No data available.
        </Alert>

        <Button variant="primary">
          <Link
            to="/"
            className="
              text-decoration-none
              text-white
              fw-bold
            "
          >
            Back
          </Link>
        </Button>
      </Container>
    );
  }

  const user = data[0];

  const sendEmail = () => {
    window.location.href = `mailto:${user.email}`;
  };

  const phoneClick = () => {
    window.location.href = `tel:${user.phone}`;
  };

  const openWebsite = () => {
    window.open(`https://${user.website}`, '_blank');
  };

  const openMap = () => {
    const mapUrl = 'https://www.google.com.ua/maps/preview';

    window.open(mapUrl, '_blank');
  };

  const openGoogleSearch = (query) => {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    window.open(googleSearchUrl, '_blank');
  };

  return (
    <Container className="mb-3">
      <h1>
        User Details
      </h1>

      {isError ? (
        <Alert variant="danger">
          Error: {isError.message}
        </Alert>
      ) : isLoading ? (
        <Spinner
          animation="border"
          variant="primary"
        />
      ) : data && data.length === 0 ? (
        <Alert variant="warning">
          No results found.
        </Alert>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>
              {user.name}
            </Card.Title>

            <Card.Text>
              <strong>Username:</strong> {user.username}
              <br />

              <strong>Email: </strong>
              <Link
                onClick={sendEmail}
                className="text-decoration-none text-black">
                {user.email}
              </Link>
              <br />

              <strong>Phone: </strong>
              <Link
                onClick={phoneClick}
                className="text-decoration-none text-black"
              >
                {user.phone}
              </Link>
              <br />

              <strong>Website: </strong>
              <Link
                onClick={openWebsite}
                className="text-decoration-none text-black"
              >
                {user.website}
              </Link>
              <br />

              <strong>Address: </strong>
              <Link
                onClick={openMap}
                className="text-decoration-none text-black"
              >
                {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
              </Link>
              <br />

              <strong>Company: </strong>
              <Link
                onClick={() => openGoogleSearch(`${user.company.name}`)}
                className="text-decoration-none text-black"
              >
                {user.company.name}
              </Link> 
              <br />

              <strong>Catchphrase:</strong> {user.company.catchPhrase}
              <br />

              <strong>Business Segment:</strong> {" "}
              {user.company.bs
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              <br />
            </Card.Text>

            <Button variant="primary">
              <Link
                to="/"
                className="
                text-decoration-none
                text-white
                fw-bold
              "
              >
                Back
              </Link>
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default UserDetail;