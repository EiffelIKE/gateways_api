import { ObjectId } from 'mongodb';
import request from 'supertest';

import app from '../../app';
import { Gateways } from './gateways.store';
import { gateway, id, mockDevices } from '../../moks';

const { name, ipv4, serialNumber } = gateway;

let gatewayId: ObjectId | '';
const path = '/api/v1/gateways';

beforeAll(async () => {
  try {
    // Preventing empty collection
    await Gateways.drop();
  } catch (error) {
    // Swallow error for empty collection
  }
});

describe(`GET ${path}/gateways/list`, () => {
  it('Responds with an empty array', async () =>
    request(app)
      .get(`${path}/list`) 
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {        
        const { body } = res;
        expect(body).toHaveProperty('length');
        expect(body.length).toBe(0);
      }),
  );
});

describe(`POST ${path}`, () => {

  it('Responds with an error if Gateway ipv4 prop is invalid', async () =>
    request(app)
      .post(`${path}`)
      .set('Accept', 'application/json')
      .send(
        {
          ...gateway,
          ipv4: '380.380.380.2500',
        },
      )
      .expect('Content-Type', /json/)
      .expect(422)
      .then((res) => {
        const { body } = res;
        expect(body).toHaveProperty('message');
        expect(body.message[0].message).toBe('[validation]: Invalid IPv4 address');
      }),
  );

  it('Responds with an inserted Gateway', async () =>
    request(app)
      .post(`${path}`)
      .set('Accept', 'application/json')
      .send(gateway)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        const { body } = res;
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('ipv4', ipv4);
        expect(body).toHaveProperty('serialNumber', serialNumber);
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('devices');
        expect(body.devices).toHaveLength(5);
        gatewayId = body._id;
      }),
  );

  it('Responds with an error, Gateway with same serialNumber already exist', async () =>
    request(app)
      .post(`${path}`)
      .set('Accept', 'application/json')
      .send(
        {
          'name': 'Gateway with same serial Number',
          'ipv4': '192.168.2.1',
          serialNumber,
          'devices': mockDevices,
        },
      )
      .expect('Content-Type', /json/)
      .expect(500)
      .then((res) => {
        const { body } = res;
        expect(body).toHaveProperty('message');
        expect(body.message).toBe('A gateway with same serial number already exist');
      }),
  );
  it('Responds with an error, only 10 devices allowed', async () =>
    request(app)
      .post(`${path}`)
      .set('Accept', 'application/json')
      .send(
        {
          ...gateway,
          'devices': [...mockDevices, ...mockDevices, ...mockDevices],
        },
      )
      .expect('Content-Type', /json/)
      .expect(422)
      .then((res) => {
        const { body } = res;
        expect(body).toHaveProperty('message');
        expect(body.message[0].message).toBe('[validation]: Only 10 devices per gateway');
      }),
  );
  it('Responds with an error, device status validation error', async () =>
    request(app)
      .post(`${path}`)
      .set('Accept', 'application/json')
      .send(
        {
          ...gateway,
          'devices': [...mockDevices, { ...mockDevices[0], status: 'reoffline' }],
        },
      )
      .expect('Content-Type', /json/)
      .expect(422)
      .then((res) => {
        const { body } = res;
        expect(body).toHaveProperty('message');
        expect(body.message[0].message).toBe('[validation]: Invalid status value');
      }),
  );
});

describe(`GET ${path}/:id`, () => {
  it('Responds with a single Gateway', async () => {
    const response = await request(app)
      .get(`${path}/${gatewayId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    const { body } = response;
    expect(body).toHaveProperty('name', name);
    expect(body).toHaveProperty('ipv4', ipv4);
    expect(body).toHaveProperty('serialNumber', serialNumber);
    expect(body).toHaveProperty('_id', gatewayId.toString());
  });

  it('Responds with a invalid Object id error', async () =>
    request(app)
      .get(`${path}/asdfaasdfasdf`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then((res) => {
        const { body } = res;
        expect(body.message[0].message).toBe('[validation]: Invalid ObjectId');
      }),
  );

  it('Responds with a not found error', async () =>
    request(app)
      .get(`${path}/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        const { body } = res;
        expect(body.message).toBe(`Gateway with id:${id} not found`);
      }),
  );
});

describe(`PUT ${path}/:id`, () => {
  const newIpv4 = '192.168.1.111';
  const newName = 'Updated name';
  const newGateway = {
    name: newName,
    ipv4: newIpv4,
    serialNumber,
    devices: [],
  };
  it('Responds with a invalid Object id error', async () =>
    request(app)
      .put(`${path}/asdfaasdfasdf`)
      .set('Accept', 'application/json')
      .send(newGateway)
      .expect('Content-Type', /json/)
      .expect(422)
      .then((res) => {
        const { body } = res;
        expect(body.message[0].message).toBe('[validation]: Invalid ObjectId');
      }),
  );

  it('Responds with a not found error', async () =>
    request(app)
      .put(`${path}/${id}`)
      .set('Accept', 'application/json')
      .send(newGateway)
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        const { body } = res;
        expect(body.message).toBe(`Gateway with id:${id} not found`);
      }),
  );
  it('Respons with a single Gateway', async () => {  
    const response = await request(app)
      .put(`${path}/${gatewayId}`)
      .set('Accept', 'application/json')
      .send(newGateway)
      .expect('Content-Type', /json/)
      .expect(200);
    const { body } = response;
    expect(body).toHaveProperty('name', newName);
    expect(body).toHaveProperty('ipv4', newIpv4);
    expect(body).toHaveProperty('serialNumber', serialNumber);
    expect(body).toHaveProperty('_id', gatewayId.toString());
    expect(body).toHaveProperty('devices', []);
  });
});
 
describe('DELETE /api/v1/gateways/:id', () => {
  it('Responds with a invalid Object id error', async () =>
    request(app)
      .delete(`${path}/asdfaasdfasdf`)
      .set('Accept', 'application/json')
      .expect(422)
      .then((res) => {
        const { body } = res;
        expect(body.message[0].message).toBe('[validation]: Invalid ObjectId');
      }),
  );

  it('Responds with a not found error', async () =>
    request(app)
      .delete(`${path}/${id}`)
      .set('Accept', 'application/json')
      .expect(404)
      .then((res) => {
        const { body } = res;
        expect(body.message).toBe(`Gateway with id:${id} not found`);
      }),
  );

  it('Responds with succes message', (done) => {  
    request(app)
      .delete(`${path}/${gatewayId}`)
      .set('Accept', 'application/json')
      .expect(204, done);
  });

  it('Responds with a not found error after deleting the gateway', async () =>
    request(app)
      .get(`${path}/${id}`)
      .set('Accept', 'application/json')
      .expect(404)
      .then((res) => {
        const { body } = res;
        expect(body.message).toBe(`Gateway with id:${id} not found`);
      }),
  );
});
 