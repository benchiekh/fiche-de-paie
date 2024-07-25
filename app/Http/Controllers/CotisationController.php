<?php
// app/Http/Controllers/CotisationController.php

namespace App\Http\Controllers;

use App\Models\Cotisation;
use Illuminate\Http\Request;

class CotisationController extends Controller
{
    public function index()
    {
        return Cotisation::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'fiche_de_paie_id' => 'required|exists:fiche_de_paies,id',
            'cotisationCNSS' => 'required|numeric',
            'cotisationIRPP' => 'required|numeric',
            'assuranceGroupe' => 'required|numeric',
            'cotisationCAVIS' => 'required|numeric',
            'regularisationFinExercice' => 'required|numeric',
            'accidentTravail' => 'required|numeric',
        ]);

        $cotisation = Cotisation::create($request->all());

        return response()->json($cotisation, 201);
    }

    public function show($id)
    {
        return Cotisation::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'cotisationCNSS' => 'numeric',
            'cotisationIRPP' => 'numeric',
            'assuranceGroupe' => 'numeric',
            'cotisationCAVIS' => 'numeric',
            'regularisationFinExercice' => 'numeric',
            'accidentTravail' => 'numeric',
        ]);

        $cotisation = Cotisation::findOrFail($id);
        $cotisation->update($request->all());

        return response()->json($cotisation, 200);
    }

    public function destroy($id)
    {
        Cotisation::destroy($id);
        return response()->json(null, 204);
    }
}
