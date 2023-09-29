import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShareButton({ tag }) {
  const handleCopyUrlClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    } catch (error) {
      console.error('Error copying URL to clipboard:', error);
    }
  };

  return (
    <Container className="mb-5">
      <Row>
        <Col
          sm={12}
          md={8}
          lg={9}
          xl={10}
          className="mb-2"
        >
          <EmailShareButton url={window.location.href}>
            <EmailIcon
              size={40}
              round={true}
            />
          </EmailShareButton>

          <FacebookShareButton
            url={window.location.href}
            quote="Share this page"
            hashtag={`#${tag}`}
          >
            <FacebookIcon
              size={40}
              round={true}
            />
          </FacebookShareButton>

          <LinkedinShareButton url={window.location.href}>
            <LinkedinIcon
              size={40}
              round={true}
            />
          </LinkedinShareButton>

          <TwitterShareButton url={window.location.href}>
            <TwitterIcon
              size={40}
              round={true}
            />
          </TwitterShareButton>
        </Col>

        <Col
          sm={12}
          md={4}
          lg={3}
          xl={2}
        >
          <Button
            variant="primary"
            onClick={handleCopyUrlClick}
            className='mx-auto'
          >
            Copy Url
          </Button>

          {' '}

          <Link
            to="#"
            onClick={() => window.history.back()}
          >
            <Button
            variant="primary"
            >
              Back
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default ShareButton;
