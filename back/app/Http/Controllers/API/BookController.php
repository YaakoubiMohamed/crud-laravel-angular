<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BookController extends Controller
{
    public function index()
    {
        return response()->json([
            'error' => false,
            'books'  => Book::all(),
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),[ 
            'name' => 'required',
            'author' => 'required',
            'price' => 'required',
            'about' => 'required',
        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $book = new Book;
            $book->name = $request->input('name');
            $book->author = $request->input('author');
            $book->price = $request->input('price');
            $book->about = $request->input('about');
            $book->save();

            return response()->json([
                'error' => false,
                'book'  => $book,
            ], 200);
        }
    }

    public function show($id)
    {
        $book = Book::find($id);

        if(is_null($book)){
            return response()->json([
                'error' => true,
                'message'  => "Record with id # $id not found",
            ], 404);
        }

        return response()->json([
            'error' => false,
            'book'  => $book,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(),[ 
            'name' => 'required',
            'author' => 'required',
            'price' => 'required',
            'about' => 'required',
        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $book = Book::find($id);
            $book->name = $request->input('name');
            $book->author = $request->input('author');
            $book->price = $request->input('price');
            $book->about = $request->input('about');
            $book->save();

            return response()->json([
                'error' => false,
                'book'  => $book,
            ], 200);
        }
    }

    public function destroy($id)
    {
        $book = Book::find($id);

        if(is_null($book)){
            return response()->json([
                'error' => true,
                'message'  => "Record with id # $id not found",
            ], 404);
        }

        $book->delete();

        return response()->json([
            'error' => false,
            'message'  => "Book record successfully deleted id # $id",
        ], 200);
    }
}
