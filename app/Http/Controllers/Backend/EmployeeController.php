<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Employee::query();
        $per_page = 10;
        // Search filter
        if ($request->has('search')) {

            $query->where('name', 'like', "%{$request->search}%");
            //    ->orWhere('position', 'like', "%{$request->search}%");
        }

        // Sorting
        if ($request->has('sortField') && $request->has('sortOrder')) {
            $query->orderBy($request->sortField, $request->sortOrder);
        }

        // Paginate results
        $employees = $query->paginate($per_page)->appends($request->query());

        return Inertia::render('backend/employees/index', [
            'employees' => $employees,
            'filters' => $request->only(['search', 'sortField', 'sortOrder'])
        ]);
    }
    public function ajaxPage()
    {
        return Inertia::render('backend/employees/ajaxindex');
    }
    public function ajaxIndex(Request $request)
    {
        $query = Employee::query();

        // Search filter
        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        // Sorting (Only apply if sortField is valid)
        if ($request->has('sortField') && !empty($request->sortField)) {
            $sortOrder = $request->sortOrder === 'desc' ? 'desc' : 'asc';

            // Prevent SQL injection by ensuring sortField is a valid column
            $allowedColumns = ['id', 'name', 'email', 'position', 'salary'];
            if (in_array($request->sortField, $allowedColumns)) {
                $query->orderBy($request->sortField, $sortOrder);
            }
        } else {
            // Default sorting
            $query->orderBy('id', 'asc');
        }

        // Paginate results
        $employees = $query->paginate(10);

        return response()->json($employees);
    }
    public function table(Request $request)
    {

        $query = Employee::query();

        // Search filter
        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%");
            //    ->orWhere('position', 'like', "%{$request->search}%");
        }

        // Sorting
        if ($request->has('sortField') && $request->has('sortOrder')) {
            $query->orderBy($request->sortField, $request->sortOrder);
        }

        // Paginate results
        $employees = $query->paginate(10)->appends($request->query());

        return Inertia::render('table', [
            'employees' => $employees,
            'filters' => $request->only(['search', 'sortField', 'sortOrder'])
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
