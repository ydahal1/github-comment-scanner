const request = require('supertest')
const app = require('../app')

describe('App', () => {
  // Util - converts string to base 64
  const AuthorizationHeader = () => {
    const data = `${process.env.GITHUB_USERNAME}:${process.env.GITHUB_PERSONAL_TOKEN}`
    const buff = Buffer.from(data)
    const base64String = buff.toString('base64')
    return `Basic ${base64String}`
  }

  // Helth check - 200
  it('GET /health', () => {
    return request(app).get('/health').expect(200)
  })

  // Invalid route - 404
  it('GET Invalid route ', () => {
    return request(app).get('/noexistant').set('Authorization', AuthorizationHeader()).expect(404)
  })

  // Get issue - 200
  it('GET issue ', () => {
    return request(app).get('/api/v1/github/ydahal1/nginxtest/issue/1 ')
      .set('Authorization', AuthorizationHeader())
      .expect(200)
  })

  // Get issue that does not exist - 404
  it('GET issue that does not exist', () => {
    return request(app)
      .get('/api/v1/github/ydahal1/nginxtest/issue/11 ')
      .set('Authorization', AuthorizationHeader())
      .expect(404)
  })

  // Post comment to existing issue - 200
  it('POST comment to existing issue', () => {
    return request(app)
      .post('/api/v1/github/ydahal1/nginxtest/issues/1/comment')
      .set('Authorization', AuthorizationHeader())
      .send({ body: 'Hello from comment scanner test' })
      .expect(200)
  })

  // Post comment with invalid body
  it('POST comment - Invalid body', () => {
    return request(app)
      .post('/api/v1/github/ydahal1/nginxtest/issues/1/comment')
      .set('Authorization', AuthorizationHeader())
      .expect(403)
  })

  // Identify image and comment -  200
  it('POST Identify - issue with image', () => {
    return request(app)
      .post('/api/v1/github/ydahal1/nginxtest/issues/3/identify')
      .set('Authorization', AuthorizationHeader())
      .send({ body: 'Hello from comment scanner Test, found image at {date} {time}' })
      .expect(200)
  })

  // Identify image and comment -  404
  it('POST Identify - issue with no image', () => {
    return request(app)
      .post('/api/v1/github/ydahal1/nginxtest/issues/1/identify')
      .set('Authorization', AuthorizationHeader())
      .send({ body: 'Hello from comment scanner Test, found image at {date} {time}' })
      .expect(404)
  })
})
