import { Shipment } from '../types'

const mockData = {
  portCalls: [
    {
      portCallId: 2,
      arrivingAt: new Date('2021-01-07 11:00'),
      leavingAt: new Date('2021-01-08 11:00'),
      portName: 'Tallin',
    },
    {
      portCallId: 1,
      arrivingAt: new Date('2021-01-01 11:00'),
      leavingAt: new Date('2021-01-02 11:00'),
      portName: 'Riga',
    },
    {
      portCallId: 3,
      arrivingAt: new Date('2021-01-14 11:00'),
      leavingAt: new Date('2021-01-15 07:00'),
      portName: 'Porvoo',
    },
    {
      portCallId: 4,
      arrivingAt: new Date('2021-01-21 11:00'),
      leavingAt: new Date('2021-01-22 11:00'),
      portName: 'Helsinki',
    },
    {
      portCallId: 5,
      arrivingAt: new Date('2021-01-28 11:00'),
      leavingAt: new Date('2021-01-29 11:00'),
      portName: 'Turku',
    },
  ],
  orders: [
    {
      loading: {
        portCallId: 1,
        duration: 3 * 60 * 60 * 1000,
      },
      discharging: {
        portCallId: 2,
        duration: 6 * 60 * 60 * 1000,
      },
      orderId: '101/Bananas',
    },
    {
      loading: {
        portCallId: 1,
        duration: 3 * 60 * 60 * 1000,
      },
      discharging: {
        portCallId: 2,
        duration: 6 * 60 * 60 * 1000,
      },
      orderId: '102/Apples',
    },
    {
      loading: {
        portCallId: 1,
        duration: 3 * 60 * 60 * 1000,
      },
      discharging: {
        portCallId: 3,
        duration: 6 * 60 * 60 * 1000,
      },
      orderId: '103/Bananas',
    },
    {
      loading: {
        portCallId: 1,
        duration: 3 * 60 * 60 * 1000,
      },
      discharging: {
        portCallId: 3,
        duration: 6 * 60 * 60 * 1000,
      },
      orderId: '104/Apples',
    },
    {
      loading: {
        portCallId: 1,
        duration: 3 * 60 * 60 * 1000,
      },
      discharging: {
        portCallId: 3,
        duration: 6 * 60 * 60 * 1000,
      },
      orderId: '105/Pears',
    },
    {
      loading: {
        portCallId: 2,
        duration: 2 * 60 * 60 * 1000,
      },
      discharging: {
        portCallId: 3,
        duration: 2 * 60 * 60 * 1000,
      },
      orderId: '106/Hotdogs',
    },

    {
      loading: {
        portCallId: 4,
        duration: 12 * 60 * 60 * 1000,
      },
      discharging: {
        portCallId: 5,
        duration: 12 * 60 * 60 * 1000,
      },
      orderId: '107/Beer',
    },
  ],
}

const pretendToFetchData = async (): Promise<Shipment> => mockData

export default pretendToFetchData
