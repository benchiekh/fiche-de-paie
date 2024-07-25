<?php
// app/Http/Controllers/NetController.php

namespace App\Http\Controllers;

use App\Models\Net;
use Illuminate\Http\Request;

class NetController extends Controller
{
    public function index()
    {
        return Net::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'fiche_de_paie_id' => 'required|exists:fiche_de_paies,id',
            'acomptePerçu' => 'required|numeric',
            'pretSociete' => 'required|numeric',
        ]);

        $net = Net::create($request->all());

        return response()->json($net, 201);
    }

    public function show($id)
    {
        return Net::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'acomptePerçu' => 'numeric',
            'pretSociete' => 'numeric',
        ]);

        $net = Net::findOrFail($id);
        $net->update($request->all());

        return response()->json($net, 200);
    }

    public function destroy($id)
    {
        Net::destroy($id);
        return response()->json(null, 204);
    }
}
