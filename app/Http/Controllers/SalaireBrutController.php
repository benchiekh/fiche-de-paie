<?php
// app/Http/Controllers/SalaireBrutController.php

namespace App\Http\Controllers;

use App\Models\SalaireBrut;
use Illuminate\Http\Request;

class SalaireBrutController extends Controller
{
    public function index()
    {
        return SalaireBrut::all();
    }

    public function store(Request $request)
    {
        $request->validate([
        'fiche_de_paie_id' => 'required|exists:fiche_de_paies,id',
        'salaireHoraireBase' => 'required|numeric',
            'salaireMensuelBase' => 'required|numeric',
            'indemniteTransport' => 'required|numeric',
            'indemniteTransport93' => 'required|numeric',
            'indemniteLogement' => 'required|numeric',
            'primePresenceHoraire' => 'required|numeric',
            'primePresenceMensuelle' => 'required|numeric',
            'primeTransportHoraire' => 'required|numeric',
            'primeTransportMensuelle' => 'required|numeric',
            'primeLogement' => 'required|numeric',
            'primeExceptionnelle' => 'required|numeric',
            'primePenibilite' => 'required|numeric',
            'primeNuit' => 'required|numeric',
            'primePanier' => 'required|numeric',
            'primeProductivite' => 'required|numeric',
            'heuresNuit' => 'required|numeric',
        ]);

        $salaireBrut = SalaireBrut::create($request->all());

        return response()->json($salaireBrut, 201);
    }

    public function show($id)
    {
        return SalaireBrut::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'fiche_de_paie_id' => 'required|exists:fiche_de_paies,id',
            'salaireHoraireBase' => 'numeric',
            'salaireMensuelBase' => 'numeric',
            'indemniteTransport' => 'numeric',
            'indemniteTransport93' => 'numeric',
            'indemniteLogement' => 'numeric',
            'primePresenceHoraire' => 'numeric',
            'primePresenceMensuelle' => 'numeric',
            'primeTransportHoraire' => 'numeric',
            'primeTransportMensuelle' => 'numeric',
            'primeLogement' => 'numeric',
            'primeExceptionnelle' => 'numeric',
            'primePenibilite' => 'numeric',
            'primeNuit' => 'numeric',
            'primePanier' => 'numeric',
            'primeProductivite' => 'numeric',
            'heuresNuit' => 'numeric',
        ]);

        $salaireBrut = SalaireBrut::findOrFail($id);
        $salaireBrut->update($request->all());

        return response()->json($salaireBrut, 200);
    }

    public function destroy($id)
    {
        SalaireBrut::destroy($id);
        return response()->json(null, 204);
    }
}
