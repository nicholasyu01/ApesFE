import React from 'react';
import { getCookie } from './CSRFToken'

var csrftoken = getCookie('csrftoken');

const CSRF = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRF;