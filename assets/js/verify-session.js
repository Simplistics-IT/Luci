function verifySession() {
    if ( localStorage.getItem('token') === null ) {
        location.href = '../../login.html' ;
    }
}

verifySession();