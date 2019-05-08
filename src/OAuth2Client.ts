import Request from './dto/Request'

class OAuth2Client {
    private requestPool: Array<Request> = []
    private pause: boolean = false
    private _id:any

    constructor() {
        this.initPool()
    }

    initPool() {
        this._id = setInterval(() => {
            if (!this.pause) {
                this.emit()
            }
        }, 200);
    }

    refreshToken() {
        this.pause = true
        // Refresh token here
        console.log('refresing')
        setTimeout(()=>this.pause = false, 5000)
    }

    ondata(req: Request) {
        // perform req here
        console.log(req)
        if (req.refresh) {
            this.refreshToken()
        }
    }
    onerror(error: any, req: Request) {
        console.log(error)
        // Push failed request into Pool again
        this.requestPool.push(req)
    }
    oncomplete() {
        console.log('done')
    }
    
    request(req: Request) {
        this.requestPool.push(req)
        if (!this._id) {
            this.initPool()
        }
    }
    emit() {
        this.ondata(this.requestPool[0]);
        this.requestPool.shift()
        if (this.requestPool.length === 0) {
            this.oncomplete();
            this.destroy();
        }
    }
      
    destroy() {
        clearInterval(this._id);
    }
}

export default OAuth2Client