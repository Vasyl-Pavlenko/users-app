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
          md={10}
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

        <Col md={2}>
          <Button
            variant="primary"
            onClick={handleCopyUrlClick}
          >
            Copy Url
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ShareButton;
