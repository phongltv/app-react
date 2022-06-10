import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Main() {
  const { t } = useTranslation('common');
  return (
        <Container>
          <Row>
            <Col>{t('common.home')}</Col>
            <Col>This is main content.</Col>
          </Row>
        </Container>
   );
}

export default Main;