export class API {
  public static create(path: string = ''): string {
    if (/^localhost/.test(window.location.host)) {
      return ['http://localhost:3333', 'api', path].join('/');
    }
    return [
      'https://fny779x0xd.execute-api.us-east-1.amazonaws.com/development',
      path,
    ].join('/');
  }
}
