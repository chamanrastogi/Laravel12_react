<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use App\Models\Seller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Fetch paginated data
        $query = Seller::query();

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
        $sellers = $query->paginate(10)->appends($request->query());


        return Inertia::render('backend/sellers/index', [
            'sellers' => $sellers,
            'filters' => ['search' => $request->search]
        ]);
    }

    public function ajaxPage()
    {
        return Inertia::render('backend/sellers/ajaxindex');
    }
    public function ajaxIndex(Request $request)
    {
        $query = Seller::query();

        // Search filter
        if ($request->has('seller') && !empty($request->seller)) {
            $query->where('seller', 'like', '%' . $request->seller . '%');
        }
        if ($request->has('city') && !empty($request->city)) {
            $query->where('seller_city', 'like', '%' . $request->city . '%');
        }
        if ($request->has('crawler') && !empty($request->crawler)) {
            $query->where('crawler', '=',  $request->crawler );
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
        $sellers = $query->paginate(10);

        return response()->json($sellers);
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
    public function show(Seller $seller)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Seller $seller)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Seller $seller)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seller $seller)
    {
        //
    }
}
