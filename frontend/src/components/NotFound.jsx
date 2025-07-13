import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="container h-100 align-content-center">
      <Card className="bg-body-secondary text-center mx-auto" style={{ width: '20.75rem' }}>
        <Card.Body>
          <h1>404</h1>
          <p>{t('notFoundTitle')}</p>
          <p>
            {t('notFoundBody')}
            {' '}
            <a href="/">{t('notFoundLink')}</a>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotFound;
