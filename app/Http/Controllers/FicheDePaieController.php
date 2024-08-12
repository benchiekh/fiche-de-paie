<?php
// app/Http/Controllers/FicheDePaieController.php

namespace App\Http\Controllers;

use App\Models\FicheDePaie;
use Illuminate\Http\Request;

class FicheDePaieController extends Controller
{
    public function index()
    {
        return FicheDePaie::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'mois' => 'required|string|max:20',
            'annee' => 'required|integer',
            'salaireBrut' => 'required|numeric',
            'cotisations' => 'required|numeric',
            'netAPayer' => 'required|numeric',
            'employe_id' => 'required|exists:employes,id',
        ]);

        $ficheDePaie = FicheDePaie::create($request->all());

        return response()->json($ficheDePaie, 201);
    }

    public function show($id)
    {
        return FicheDePaie::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'mois' => 'string|max:20',
            'annee' => 'integer',
            'salaireBrut' => 'numeric',
            'cotisations' => 'numeric',
            'netAPayer' => 'numeric',
        ]);

        $ficheDePaie = FicheDePaie::findOrFail($id);
        $ficheDePaie->update($request->all());

        return response()->json($ficheDePaie, 200);
    }

    public function destroy($id)
    {
        FicheDePaie::destroy($id);
        return response()->json(null, 204);
    }
}