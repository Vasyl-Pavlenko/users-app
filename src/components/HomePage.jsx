import { useState } from 'react';
import {
  Container,
  Alert,
  Button,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner
} from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function HomePage() {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (!value) {
      newSearchParams.delete('query');
    } else {
      newSearchParams.set('query', value);
    }
    setSearchParams(newSearchParams);
    setSearch(value);
  };

  const onChangeSearch = (event) => {
    updateSearchParams(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }; 

  const { isLoading, isError, data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        return response;
      } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    }
  });  

  const users = data ? data.data : [];

  const filteredUsers = users.filter(({ username }) =>
    username.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = a.username.toLowerCase();
    const nameB = b.username.toLowerCase();
    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Home Page.</title>
          <meta name="description" content={`View Users Home Page.`} />

          <meta property="og:title" content={`View Users Home Page`} />
          <meta property="og:description" content={`View on Users Posts and Albums Application Home Page.`} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={'https://vasyl-pavlenko.github.io/users-app/'} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`View Users Home Page`} />
          <meta name="twitter:description" content={`Users Posts and Albums Application Home Page.`} />
          <meta name="twitter:url" content={'https://vasyl-pavlenko.github.io/users-app/'} />
        </Helmet>

        <Row className="mb-4">
          <Col>
            <h1>
              User Search
            </h1>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col
            sm={12}
            md={10}
            className="mb-3"
          >
            <Form.Control
              type="search"
              placeholder="Search by Username"
              value={search}
              onChange={onChangeSearch}
            />
          </Col>

          <Col
            sm={12}
            md={2}
          >
            <Button
              variant="primary"
              onClick={toggleSortOrder}
            >
              Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          </Col>
        </Row>

        {isError ? (
          <Alert variant="danger">
            Error: {isError.message}
          </Alert>
        ) : isLoading ? (
            <Spinner
              animation="border"
              variant="primary"
            />
        ) : sortedUsers.length === 0 ? (
            <Alert variant="warning">
              No results found.
            </Alert>
        ) : (
            <ListGroup
              as="ul"
              className="mb-4"
            >
              {sortedUsers.map(({ id, username }) => (
                <ListGroupItem
                  key={id}
                  as="li"
                  className="mb-3"
                >
                  <Container>
                    <Row>
                      <Col
                        sm={6}
                        md={8}
                        xl={10}
                        className="fw-bold mb-3"
                      >
                        {username}
                      </Col>

                      <Col
                        sm={6}
                        md={4}
                        xl={2}
                      >
                        <Link
                          to={`/albums?userId=${id}`}
                          state={{ username }}
                        >
                          <Button
                            variant="primary"
                            className="ml-2"
                          >
                            Albums
                          </Button>
                        </Link>
                        
                        {' '}

                        <Link
                          to={`/posts?userId=${id}`}
                          state={{ username }}
                        >
                          <Button
                            variant="primary"
                            className="ml-2"
                          >
                            Posts
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </HelmetProvider>
    </Container>
  );
}

export default HomePage;