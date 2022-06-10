import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Main() {
  const { t } = useTranslation('web_app');
  return (
        <Container>
          <Row>
            <Col>{t('web-app.main')}</Col>
          </Row>
        </Container>
   );
}

export default Main;