<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api', 'prefix' => 'v1'], function () {
    Route::post('redirectGoogleOAuth2', 'Auth\GoogleOAuth2Controller@handleGoogleOAuth2Callback');
    Route::post('login', 'Auth\AuthController@login')->middleware("throttLogin");
    Route::post('reset-password', 'ResetPasswordController@sendMail');
    Route::put('reset-password', 'ResetPasswordController@reset');
    Route::group(['as' => 'api.v1.', 'middleware' => ['auth:api', 'checkrole:Admin|User|Manager']], function () {
        Route::get('users/list-admin', 'UserController@listAdmin');
        Route::get('users/list-author', 'UserController@listAuthors');
        Route::put('users/changePassword', 'UserController@changePassword');
        Route::get('users/getInfoUser', 'UserController@getInfoUser');
        Route::group(['prefix' => 'users', 'middleware' => 'checkrole:Admin'], function () {
            Route::get('/', 'UserController@index');
            Route::get('search', 'UserController@search');
            Route::post('/', 'UserController@store');
            Route::get('/{id}', 'UserController@show');
            Route::put('/{id}', 'UserController@update');
            Route::delete('/{id}', 'UserController@destroy');
        });

        Route::get('categories/list-category', 'CategoryController@listCategory');
        Route::group(['prefix' => 'categories', 'middleware' => 'checkrole:Admin'], function () {
            Route::get('/search', 'CategoryController@search');
            Route::get('/', 'CategoryController@index');
            Route::post('/', 'CategoryController@store');
            Route::get('/{id}', 'CategoryController@show');
            Route::put('/{id}', 'CategoryController@update');
            Route::delete('/{id}', 'CategoryController@destroy');
        });
        Route::group(['prefix' => 'requests'], function () {
            Route::get('/dueDate', 'RequestController@handle');
            Route::get('/filter', 'RequestController@filter');
            Route::get('/', 'RequestController@index');
            Route::post('/', 'RequestController@store');
            Route::get('/{id}', 'RequestController@show');
            Route::put('/{id}', 'RequestController@update');
            Route::delete('/{id}', 'RequestController@destroy');
        });
        Route::group(['prefix' => 'history-requests'], function () {
            Route::get('/{id}', 'RequestChangeHistoryController@listComments');
        });
        Route::group(['prefix' => 'comments'], function () {
            Route::get('/{id}', 'CommentController@index');
            Route::post('/{id}', 'CommentController@store');
        });
        Route::group(['prefix' => 'roles'], function () {
            Route::get('/', 'RoleController@index');
        });

        Route::get('deparments/list-deparment', 'DeparmentController@listDeparment');
        Route::group(['prefix' => 'deparments', 'middleware' => 'checkrole:Admin'], function () {
            Route::get('/', 'DeparmentController@index');
            Route::post('/', 'DeparmentController@store');
            Route::get('/{id}', 'DeparmentController@show');
            Route::put('/{id}', 'DeparmentController@update');
        });
        Route::group(['prefix' => 'request_change'], function () {
            Route::get('/', 'RequestChangeHistoryController@index');
        });
        Route::get('logout', 'Auth\AuthController@logout');
    });
});
