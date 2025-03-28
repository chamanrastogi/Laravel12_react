<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Fetch paginated data
        $query = Student::query();

        // Apply search
        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Apply sorting
        if ($request->has('sort_by') && $request->has('sort_direction')) {
            $query->orderBy($request->sort_by, $request->sort_direction);
        } else {
            $query->orderBy('id', 'desc'); // Default sorting
        }

        // Paginate results
        $students = $query->paginate(10)->appends($request->query());


        return Inertia::render('backend/student/index', [
            'students' => $students,
            'filters' => ['search' => $request->search]
        ]);
    }
    public function students()
    {
        $students = Student::all(); // Keeps search/filter params in URL

        return Inertia::render('backend/student/students', [
            'students' => $students
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('backend/student/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'age'   => 'required|integer|min:1',
        ]);

        // Create new student
        $student = Student::create($validatedData);

        // Return a JSON response (for API) or redirect (for web)       
        return redirect()->route('student.create')->with('Student created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return Inertia::render('backend/student/edit', ['student' => $student]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $validatedData = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $student->id,
            'age'   => 'required|integer|min:1',
        ]);


        // Create new student
        $student->fill($validatedData);
        $student->update();
        $notification = [
            'status' => 'success', // Can be 'error' or 'success'
            'message' => 'Student successfully updated!',
        ];

        // Return a JSON response (for API) or redirect (for web)       
        return redirect()->route('student.edit', $student->id)->with('notification', $notification);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();
        $notification = [
            'status' => 'success', // Can be 'error' or 'success'
            'message' => 'Student successfully deleted!',
        ];
        return redirect()->route('student.index')->with('notification', $notification);
    }
}
