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
    $scope.loginStatus = {};

    $scope.setLoginStatus = function( response )
    {
        $scope.$apply( function () {
            $scope.loginStatus = response;
        } );
    }
}

