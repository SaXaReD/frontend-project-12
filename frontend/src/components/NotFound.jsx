import React from 'react'
import { Card } from 'react-bootstrap'

const NotFound = () => {
  return (
    <div className='container h-100 align-content-center'>
      <Card className="bg-body-secondary text-center mx-auto" style={{ width: '20.75rem' }}>
        <Card.Body>
          <h1>404 Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <p>Please check the URL or return to the homepage.</p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default NotFound;