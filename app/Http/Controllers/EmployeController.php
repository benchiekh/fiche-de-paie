<?php


namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;

class EmployeController extends Controller
{
    public function index()
    {
        return Employe::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'CIN' => 'required|string|max:20',
            'CNS' => 'required|string|max:20',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'emploi' => 'required|string|max:255',
            'categorie' => 'required|integer',
            'echelon' => 'required|integer',
            'situationFamiliale' => 'required|string|max:50',
            'salaireDeBase' => 'required|numeric',
            'tauxHoraire' => 'required|numeric',
            'enfantsACharge' => 'required|integer',
            'affiliationCNSS' => 'required|string|max:20',
        ]);

        $employe = Employe::create($request->all());

        return response()->json($employe, 201);
    }

    public function show($id)
    {
        return Employe::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'CIN' => 'string|max:20',
            'CNS' => 'string|max:20',
            'nom' => 'string|max:255',
            'prenom' => 'string|max:255',
            'adresse' => 'string|max:255',
            'emploi' => 'string|max:255',
            'categorie' => 'integer',
            'echelon' => 'integer',
            'situationFamiliale' => 'string|max:50',
            'salaireDeBase' => 'numeric',
            'tauxHoraire' => 'numeric',
            'enfantsACharge' => 'integer',
            'affiliationCNSS' => 'string|max:20',
        ]);

        $employe = Employe::findOrFail($id);
        $employe->update($request->all());

        return response()->json($employe, 200);
    }

    public function destroy($id)
    {
        Employe::destroy($id);
        return response()->json(null, 204);
    }
}
