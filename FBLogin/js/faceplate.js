/**
 * Created with JetBrains WebStorm.
 * User: bart
 * Date: 26/04/2013
 * Time: 22:33
 * To change this template use File | Settings | File Templates.
 */
function retrieveUserInformation() {
    var _scope = angular.element( $( "body" ) ).scope();
    if ( _scope.isLoggedIn )
    {
        FB.api('/me?fields=name,first_name,middle_name,last_name,picture', function(response) {
            _scope.setUserDetails( response );
            debugOutput( "User Details", response );
        });
    }
    else
    {
        _scope.setUserDetails( {} );
    }
}

function retrieveMoreFriends( response )
{
    var _scope = angular.element( $( "body" ) ).scope();
    _scope.addFriends( response );
    debugOutput( "Friends", response );
    if ( response.paging )
    {
        var nextPage = response.paging.next;
        if ( nextPage )
        {
            FB.api( nextPage, retrieveMoreFriends );
        }
    }
}

function retrieveFriends() {
    var _scope = angular.element( $( "body" ) ).scope();
    if ( _scope.isLoggedIn )
    {
        FB.api('/me/friends?limit=100', function(response) {
            _scope.clearFriends();
            retrieveMoreFriends( response );
        });
    }
    else
    {
        _scope.addFriends( [] );
    }
}

function login() {
    if ( FB )
    {
        FB.login(function(response) {
            window.fbAsyncInit();
        });
    }
}

function logout() {
    if ( FB )
    {
        FB.logout( function( response ) {
            window.fbAsyncInit();
        } );
    }
}

function debugOutput( description, someObject ) {
    if ( typeof someObject != "string" ) {
        someObject  = JSON.stringify( someObject, undefined, 4 );
    }
    $( ".debugJsonDescription" ).html( description );
    $( ".debugJson" ).html( someObject );
}

// Additional JS functions here
window.fbAsyncInit = function() {
    FB.init({
        appId      : '345473755574985', // App ID
        channelUrl : './channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });

    // Additional init code here
    FB.getLoginStatus( function( response ) {
        var _scope = angular.element( $( "body" ) ).scope();
        _scope.setLoginStatus( response );
        debugOutput( "Login Status", response );
        retrieveUserInformation();
        retrieveFriends();
    } );
};

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "http://connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));
