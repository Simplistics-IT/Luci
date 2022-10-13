function verifySession() {
    if ( localStorage.getItem('token') === null ) {
        location.href = '../../modulos/login.html' ;
    }
}

verifySession();