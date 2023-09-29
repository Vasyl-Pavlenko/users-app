import { Alert, Button, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function generateMetaTags(title) {
  const pageTitle = `${title.charAt(0).toUpperCase()}${title.slice(1)}s list`;

  return {
    title: pageTitle,
    description: `Users ${title}s list Page`,
    ogTitle: pageTitle,
    ogDescription: `View on Users Posts and Albums Application Home Page.`,
    ogType: 'website',
    ogUrl: 'https://vasyl-pavlenko.github.io/users-app/',
    twitterCard: 'summary_large_image',
    twitterTitle: `${title}s list`,
    twitterDescription: `Users ${title}s list Page`,
    twitterUrl: 'https://vasyl-pavlenko.github.io/users-app/',
  };
}

function UniversalList() {
  const { pathname, search, state } = useLocation();
  const title = pathname.slice(1, -1);
  const isPosts = title === 'post';

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

  const metaTags = generateMetaTags(title);

  return (
    <Container className="mb-3">
      <HelmetProvider>
        <Helmet>
          <title>{metaTags.title}</title>
          <meta name="description" content={metaTags.description} />
          <meta property="og:title" content={metaTags.ogTitle} />
          <meta property="og:description" content={metaTags.ogDescription} />
          <meta property="og:type" content={metaTags.ogType} />
          <meta property="og:url" content={metaTags.ogUrl} />
          <meta name="twitter:card" content={metaTags.twitterCard} />
          <meta name="twitter:title" content={metaTags.twitterTitle} />
          <meta name="twitter:description" content={metaTags.twitterDescription} />
          <meta name="twitter:url" content={metaTags.twitterUrl} />
        </Helmet>

        <h1 className="mb-3 text-capitalize">
          {title}s list {state?.username || ' '}
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
            <ListGroup as="ul">
            {data.map(({ title, id, userId}) => (
              <ListGroup.Item
                as="li"
                key={id}
                className="mb-2 text-capitalize"
              >
                <Row>
                  <Col
                    sm={12}
                    md={8}
                    xl={10}
                    className="fw-bold mb-3"
                  >
                  {title}
                  </Col>

                  <Col
                    sm={12}
                    md={4}
                    xl={2}
                    className='m-auto'
                  >
                    {isPosts && (
                      <Link
                        to={`/posts/${userId}/${id}`} 
                        className="mx-2"
                      >
                        <Button variant="primary">
                          Details
                        </Button>
                      </Link>
                    )}

                    <Link
                      to="/"
                      className="
                        text-decoration-none
                        text-white
                        fw-bold
                      "
                    >
                      <Button
                        variant="primary"
                      >
                        Back
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </HelmetProvider>
    </Container>
  );
}

export default UniversalList;