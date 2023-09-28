import { Container, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mb-4"
    >
      <Container>
        <Navbar.Brand>
          <Link
            to="/"
            className="
              text-decoration-none
              text-white
              fw-bold
            "
          >
            Home Page
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
