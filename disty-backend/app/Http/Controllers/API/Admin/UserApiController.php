<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserApiController extends Controller
{
    // ======================
    // GET ALL USERS
    // ======================
    public function index()
    {
        $users = User::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    // ======================
    // STORE USER
    // ======================
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|unique:users',
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,user',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
            'avatar_color' => '#F97316',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User berhasil ditambahkan',
            'data' => $user
        ]);
    }

    // ======================
    // UPDATE USER
    // ======================
    public function update(
        Request $request,
        int $id
    ) {

        $user = User::findOrFail($id);

        $validated = $request->validate([
            'username' => [
                'required',
                Rule::unique('users')
                    ->ignore($user->id)
            ],

            'name' => 'required',

            'email' => [
                'required',
                'email',
                Rule::unique('users')
                    ->ignore($user->id)
            ],

            'role' =>
                'required|in:admin,user',
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'User berhasil diupdate',
            'data' => $user
        ]);
    }

    // ======================
    // DELETE USER
    // ======================
    public function destroy(int $id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User berhasil dihapus',
        ]);
    }
}