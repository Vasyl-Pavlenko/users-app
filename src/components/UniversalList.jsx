import { Alert, Container, ListGroup, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
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

  const { isLoading, isError, data } = useQuery({
    queryKey: [pathname],
    queryFn: async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com${pathname}${search}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    }
  });

  const metaTags = generateMetaTags(title);

  return (
    <Container>
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
          <div>
            No results found.
          </div>
        ) : (
            <ListGroup
              as="ul"
              className="mb-3"
            >
            {data.map((item) => (
              <ListGroup.Item
                as="li"
                key={item.id}
                className="mb-2 text-capitalize"
              >
                {item.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </HelmetProvider>
    </Container>
  );
}

export default UniversalList;