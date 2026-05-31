<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthApiController extends Controller
{
    // ✅ LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only(
            'email',
            'password'
        );

        if (!Auth::attempt($credentials)) {

            return response()->json([
                'status' => 'error',
                'message' =>
                'Email atau password salah'
            ], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $token = $user->createToken(
            'auth_token'
        )->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'user' => $user,
            'token' => $token
        ]);
    }

    // ✅ REGISTER
   public function register(Request $request)
{
    $request->validate([

        'name' =>
        'required|string|max:255',

        'username' =>
        'required|string|max:255|unique:users,username',

        'email' =>
        'required|email|unique:users,email',

        'phone' =>
        'required|string|max:20',

        'agree_terms' =>
        'required|accepted',

        'password' =>
        'required|min:6|confirmed',

    ]);

    $colors = [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#FFA07A',
        '#98D8C8',
        '#F7DC6F',
        '#BB8FCE'
    ];

    $randomColor =
        $colors[array_rand($colors)];

    $user = User::create([

        'name' =>
        $request->name,

        'username' =>
        $request->username,

        'email' =>
        $request->email,

        'phone' =>
        $request->phone,

        'agree_terms' =>
        $request->agree_terms,

        'password' =>
        Hash::make(
            $request->password
        ),

        'role' =>
        'user',

        'avatar_color' =>
        $randomColor,

    ]);

    return response()->json([
        'status' => 'success',
        'message' => 'Registrasi berhasil',
        'user' => $user
    ]);
}
    // ✅ LOGOUT
    public function logout(Request $request)
    {
        $request->user()
            ->currentAccessToken()
            ->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout berhasil'
        ]);
    }

    // ✅ GET USER LOGIN
    public function me()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user()
        ]);
    }
}
