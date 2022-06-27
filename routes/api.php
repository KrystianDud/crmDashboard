<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;

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
// TODO ensure the outh is provided on register and on logout
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::put('/update_user/{id}', [UserController::class, 'update']);
Route::get('/get_user/{id}', [UserController::class, 'index']);
Route::get('/users/{user_id}', [UserController::class, 'get_users']);

Route::group([
    'middleware' => ['auth:sanctum'],
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'
], function () {
    Route::post('/logout', 'AuthController@logout');
});

// COMPANY
Route::post('/create_company_data/{user_id}', [CompanyController::class, 'store']);
// Route::post('/create_company_data/', [CompanyController::class, 'store']);

Route::get('/get_company/{id}', [CompanyController::class, 'index']);

// PRODUCTS
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);

// ORDERS
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{id}', [OrderController::class, 'get_transaction_products']);

// Messages
Route::post('/chat',[MessageController::class, 'store']);
Route::get('/chats/{user_id}',[MessageController::class, 'index']);
Route::get('/chat/{chat_id}', [MessageController::class, 'chat']);
Route::post('/update_chat/{chat_id}', [MessageController::class, 'update_chat']);


// Garbage (for now...)

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/dashboard/transactions', function (){
//     return new transactionLog()
// }) 

// Route::get('/products/{$id}', [ProductController::class, 'show']);
// Route::get('/products', [ProductController::class, 'show']);
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
