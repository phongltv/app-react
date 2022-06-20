import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { queries } from '../../graphql/queries';
import { Book } from '../../Models/Book';
import { MyModal } from '../Modal/Modal';
function Main(){
  let Books: Book[] = [];
  const { t } = useTranslation('web_app');
  const [books, setBooks] = useState(Books);
  const getBooks: any = async () => {
    let response: any = await API.graphql({ query: queries.getListBooks });
    Books = response.data.listBooks.items;
    setBooks(Books);
  }
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Container>
      <Row>
        <Col>{t('web-app.main')}
        </Col>
      </Row>
      <Row>
{books?.map((book: Book) => (
          <div className="col-sm-12 col-md-4 col-lg-3 col-xl-2" key={book.id}>
            <Nav.Link href={`/detail/${book.id}`}>{book.title}</Nav.Link>
          </div>
        ))}
    </Row>
    </Container>
  );
}

export default Main;