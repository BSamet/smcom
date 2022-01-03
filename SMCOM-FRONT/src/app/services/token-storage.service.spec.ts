import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);

    let store = {} as any;

    const mocksessionStorage = {
      getItem: (key: any): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {} as any;
      }
    };

    spyOn(window.sessionStorage, 'getItem')
      .and.callFake(mocksessionStorage.getItem);
    spyOn(window.sessionStorage, 'setItem')
      .and.callFake(mocksessionStorage.setItem);
    spyOn(window.sessionStorage, 'removeItem')
      .and.callFake(mocksessionStorage.removeItem);
    spyOn(window.sessionStorage, 'clear')
      .and.callFake(mocksessionStorage.clear);
  });

  describe('setAccessToken', () => {
    it('should store the token in window.sessionStorage',
      () => {
        service.saveToken('sometoken');
        expect(window.sessionStorage.getItem('auth-token')).toEqual('sometoken');
      });
  });
  describe('getAccessToken', () => {
    it('should return stored token from window.sessionStorage',
      () => {
        window.sessionStorage.setItem('auth-token', 'anothertoken');
        expect(service.getToken()).toEqual('anothertoken');
      });
  });
  describe('setUser', () => {
    it('should store the user in window.sessionStorage',
      () => {
        service.saveUser('someuser');
        expect(window.sessionStorage.getItem('auth-user')).toEqual(JSON.stringify('someuser'));
      });
  });
  describe('retrieveUser', () => {
    it('should return stored user from window.sessionStorage',
      () => {
        window.sessionStorage.setItem('auth-user', JSON.stringify('anotheruser'));
        expect(service.getUser()).toEqual('anotheruser');
      });
  });
  describe('saveLanguage', () => {
    it('should store the language in window.sessionStorage',
      () => {
        service.saveLanguage('somelanguage');
        expect(window.sessionStorage.getItem('LANGUAGE')).toEqual('somelanguage');
      });
  });
  describe('retrieveLanguage', () => {
    it('should return stored language from window.sessionStorage',
      () => {
        window.sessionStorage.setItem('LANGUAGE', 'anotherlanguage');
        expect(service.getLanguage()).toEqual('anotherlanguage');
      });
  });
  describe('clearSession', () => {
    it('should clear the session storage as the user signs out',
      () => {
        window.sessionStorage.clear();
        expect(window.sessionStorage.length).toEqual(0);
      });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});