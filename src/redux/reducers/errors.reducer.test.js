import { loginMessage } from './errors.reducer';

import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

test('Test that login reducer can clear correctly', () => {
    expect(loginMessage(undefined, {type: ''})).toBe('');
    expect(loginMessage('', {type: 'CLEAR_LOGIN_ERROR'})).toBe('');

});

test('test that a user can login', async () => {
    const response = await axios.post('http://localhost:5000/api/user/login', {username: 'example', password: 'example'})
    expect(response.status).toBe(200);
})