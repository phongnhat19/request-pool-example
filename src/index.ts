import OAuth2Client from './OAuth2Client'
import Request from './dto/Request'

let requestList = [
    {
        method: 'GET',
        url: '1'
    },
    {
        method: 'GET',
        url: '2'
    },
    {
        method: 'GET',
        url: '3',
        refresh: true
    },
    {
        method: 'GET',
        url: '4'
    },
    {
        method: 'GET',
        url: '5'
    }
]

let client = new OAuth2Client()

requestList.forEach((requestObj: Request)=>{
    client.request(requestObj)
})