import React from 'react'
import { Card } from 'react-bootstrap'

const NotFound = () => {
  return (
    <div className='container h-100 align-content-center'>
      <Card className="bg-body-secondary text-center mx-auto" style={{ width: '20.75rem' }}>
        <Card.Body>
          <h1>404</h1>
          <p>Страница не найдена</p>
          <p>Но вы можете перейти <a href='/'>на главную страницу</a></p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default NotFound;