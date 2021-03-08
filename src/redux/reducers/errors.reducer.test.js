import { loginMessage } from './errors.reducer';

test('Test that login reducer can clear correctly', () => {
    expect(loginMessage(undefined, {type: ''})).toBe('');
    expect(loginMessage('', {type: 'CLEAR_LOGIN_ERROR'})).toBe('');

});