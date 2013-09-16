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
    $scope.hasFriends       = false;

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

    $scope.clearFriends = function ()
    {
        $scope.$apply( function ()
        {
            $scope.friends = [];
        });
    }

    $scope.addFriends = function( response )
    {
        $scope.$apply( function () {
            if ( response.data && response.data.length )
            {
                $scope.friends  = $scope.friends.concat( response.data );
                $scope.friendCount = $scope.friends ? $scope.friends.length : 0;
                $scope.hasFriends   = $scope.friendCount > 0;
            }
        } );
    }
}

