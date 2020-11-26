export class SiteURL {
    public static create(path: string = ''): string {
        if (/^localhost/.test(window.location.host)) {
            return [
                'http://localhost:4200',
                'api',
                path
            ].join('/')
        }
        return [
            'https://main.d1j1xi457tj0us.amplifyapp.com/',
            path,
        ].join('/')
    }
}