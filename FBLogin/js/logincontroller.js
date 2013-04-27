'use strict';

/**
 * Created with JetBrains WebStorm.
 * User: bart
 * Date: 25/04/2013
 * Time: 15:16
 * To change this template use File | Settings | File Templates.
 */

function FacebookLoginController( $scope )
{
    $scope.isLoggedIn       = false;
    $scope.loginStatus      = {};
    $scope.userDetails      = {};
    $scope.fullName         = "";
    $scope.firstName        = "";
    $scope.profilePicUrl    = "";
    $scope.friendCount      = 0;
    $scope.friends          = [];

    $scope.setLoginStatus = function( response )
    {
        $scope.$apply( function () {
            $scope.loginStatus  = response;
            $scope.isLoggedIn   = response.status == 'connected';
        } );
    }

    $scope.setUserDetails = function( response )
    {
        $scope.$apply( function () {
            $scope.userDetails      = response;
            $scope.fullName         = response.name;
            $scope.firstName        = response.first_name;
            $scope.profilePicUrl    = response.picture.data.url;
        } );
    }

    $scope.setFriends = function( response )
    {
        $scope.$apply( function () {
            $scope.friends  = response.data;
            $scope.friendCount = $scope.friends ? $scope.friends.length : 0;
        } );
    }
}

