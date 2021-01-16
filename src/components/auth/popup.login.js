import { toParams, toQuery } from '../../utils/utils';

export default class PopupLogin {
    constructor(id, options = {}) {
        this.id = id;
        //this.url = `${process.env.NEXT_PUBLIC_AUTH_URL}&returnUri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT}`
        this.url = `https://auth.thinkdev.app/login?device=web&returnUri=https://localhost:3000/callback`
        this.options = options;
    }

    open() {
        const { id, url, options } = this;
        this.window = window.open(url, id, toQuery(options, ','), 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no');
    }

    close() {
        this.cancel();
        this.window.close();
    }

    poll() {
        this.promise = new Promise((resolve, reject) => {
            this._iid = window.setInterval(() => {
                try {
                    const popup = this.window;

                    if (!popup || popup.closed !== false) {
                        this.close();

                        reject(new Error('The popup was closed'));

                        return;
                    }

                    if (popup.location.href === this.url || popup.location.pathname === 'blank') {
                        return;
                    }

                    const params = toParams(popup.location.search.replace(/^\?/, ''));

                    resolve(params);

                    this.close();
                } catch (error) {
                    
                }
            }, 500);
        });
    }

    cancel() {
        if (this._iid) {
            window.clearInterval(this._iid);
            this._iid = null;
        }
    }

    then(...args) {
        return this.promise.then(...args);
    }

    catch(...args) {
        return this.promise.then(...args);
    }

    static open(...args) {
        const popup = new this(...args);

        popup.open();
        popup.poll();

        return popup;
    }
}