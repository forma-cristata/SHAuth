import {getCookie, setCookie} from './get-cookie.component';

describe('client', function () {
  describe('src', function () {
    describe('app', function () {
      describe('get-cookie.component.ts', function () {
        it('setCookie(name, value) should set a cookie to a random value successfully', function(){
          let testCookie = '';
          let length = Math.random() * 100;
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
          let counter = 0;
          while (counter < length) {
            testCookie += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
          }

          setCookie('test', testCookie);
          expect(getCookie('test')).toBe(testCookie);


        });

      });
    });
  });
});
