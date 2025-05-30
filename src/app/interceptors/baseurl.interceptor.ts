import { HttpInterceptorFn } from '@angular/common/http';
import { ApiAddresses } from '../shared/apiAddress';

export const baseurlInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('http')) {
    var modifiedUrl = req.clone({
      url: `${ApiAddresses.baseAddress}${req.url}`,
    });

    console.log(modifiedUrl);

    return next(modifiedUrl);
  } else {
    return next(req);
  }
};
