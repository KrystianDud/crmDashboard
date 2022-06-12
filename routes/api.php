<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
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

// Verified apis in use
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group([
    'middleware' => ['auth:sanctum'],
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'
], function () {
    Route::post('/logout', 'AuthController@logout');
});
Route::get('/get_company_data/{name_confirm}', [CompanyController::class, 'index']);
Route::post('/create_company_data/{user_id}', [CompanyController::class, 'store']);





// Garbage (for now...)

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/dashboard/transactions', function (){
//     return new transactionLog()
// })
// Route::post('/register', function () {
//     return view('home');
// });
// Route::get('/products', [ProductController::class, 'index']);

// Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{$id}', [ProductController::class, 'show']);
// Route::get('/products', [ProductController::class, 'show']);
// Route::put('/products/{$id}', [ProductController::class, 'update']);
// add search capabilities to the product

// Route::get('/customers', []);

// Route::resource('products', ProductController::class);
// Route::get('/products/search/{name}', [ProductController::class, 'search']);






















// Route::group([
    
//     'prefix' => 'v1',
//     'as' => 'api.',
//     'namespace' => 'api\V1\Admin',
//     'middleware' => ['auth:api']
// ], function () {

//     Route::group([
//         'middleware' => ['auth:api']
//     ], function () {

//         Route::post('register', 'UsersApiController"register');
    
//         // Permissions
//         Route::apiResource('permissions', 'PermissionsApiController');

//         // Roles
//         Route::apiResource('roles', 'RolesApiController');

//         // Users
//         Route::apiResource('users', 'UserApiController');

//     });
    
// });
