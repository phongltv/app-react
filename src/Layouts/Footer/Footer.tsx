import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation('web_app');
  return (
    <Container>
      <Row>
        <Col>{t('web-app.footer')}</Col>
      </Row>
    </Container>
   );
}

export default Footer;